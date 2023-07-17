/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { CONFIG } from "@/configs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { VideoCallActionType } from "@/redux/reducer/videoCall/videoCall.type";
import { SocketEvents, socket } from "@/utils/socket";
import { Avatar, Button, Center, Group, Stack } from "@mantine/core";
import { IconPhoneOff } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

interface Props {
  close: () => void;
}

export const VideoCallModal = ({ close }: Props) => {
  const audioStreamRef = useRef<HTMLInputElement>(null);
  const videoStreamRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  //* Use params from call_details if available => like in case of receiver's end

  const [call_details] = useAppSelector(
    (state: RootState) => state.videoCall.call_queue
  );
  const { incoming } = useAppSelector((state: RootState) => state.videoCall);

  const token: string = localStorage.getItem("token") || "";

  const appID = 546310831;
  const server = "wss://webliveroom546310831-api.coolzcloud.com/ws";

  // roomID => ID of conversation => current_conversation.id
  // token => generate on backend & get on App
  // userID => ID of this user
  // userName => slug formed by user's name

  const roomID = call_details?.roomID;
  const userID = call_details?.userID;
  const userName = call_details?.userName;

  // Step 1

  // Initialize the ZegoExpressEngine instance
  const zg = new ZegoExpressEngine(appID, server);

  const streamID = call_details?.streamID;
  const audioStreamID = `audio_${call_details?.streamID}`;
  const videoStreamID = `video_${call_details?.streamID}`;

  const handleDisconnect = () => {
    dispatch({
      type: VideoCallActionType.RESET_VIDEO_QUEUE,
    });

    // clean up event listners
    socket?.off(SocketEvents.VIDEO_CALL_ACCEPTED);
    socket?.off(SocketEvents.VIDEO_CALL_DENIED);
    socket?.off(SocketEvents.VIDEO_CALL_MISSED);

    // stop publishing local audio & video stream to remote users, call the stopPublishingStream method with the corresponding stream ID passed to the streamID parameter.

    zg.stopPublishingStream(audioStreamID);
    zg.stopPublishingStream(videoStreamID);
    // stop playing a remote audio
    zg.stopPlayingStream(`audio_${userID}`);
    zg.stopPlayingStream(`video_${userID}`);
    zg.destroyStream(audioStreamRef.current);
    zg.destroyStream(videoStreamRef.current);
    // log out of the room
    zg.logoutRoom(roomID);

    // handle Call Disconnection => this will be handled as cleanup when this dialog unmounts

    // at the end call handleClose Dialog
    close();
  };

  useEffect(() => {
    // Decline call automatically after 30 sec if not picked
    // const timer = setTimeout(() => {
    //   socket.emit(
    //     SocketEvents.VIDEO_CALL_NOT_PICKED,
    //     { to: streamID, from: userID },
    //     () => {
    //       console.log("");
    //     }
    //   );
    // }, 30 * 1000);

    socket.on(SocketEvents.VIDEO_CALL_MISSED, () => {
      // Abort call
      handleDisconnect();
    });

    socket.on(SocketEvents.VIDEO_CALL_ACCEPTED, () => {
      // clear timeout for VIDEO_CALL_NOT_PICKED
      // clearTimeout(timer);
    });

    if (!incoming) {
      socket.emit(SocketEvents.START_VIDEO_CALL, {
        to: streamID,
        from: userID,
        roomID,
      });
    }

    socket.on(SocketEvents.VIDEO_CALL_DENIED, () => {
      // TODO => You can play an audio indicating call is denined
      // ABORT CALL
      handleDisconnect();
    });

    // make a POST API call to server & fetch token
    let zego_token: string;

    async function fetchToken() {
      const response = await axios.post(
        `${CONFIG.APP_URL}/user/generate-zego-token`,
        {
          userId: userID,
          room_id: roomID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      zego_token = response.data.token;

      // Step 2 => Check browser compatibility
      zg.checkSystemRequirements()
        .then((result) => {
          // The [result] indicates whether it is compatible. It indicates WebRTC is supported when the [webRTC] is [true]. For more results, see the API documents.

          // {
          //   webRTC: true,
          //   customCapture: true,
          //   camera: true,
          //   microphone: true,
          //   videoCodec: { H264: true, H265: false, VP8: true, VP9: true },
          //   screenSharing: true,
          //   errInfo: {}
          // }
          console.log(result);

          const { webRTC, microphone, camera } = result;

          if (webRTC && microphone && camera) {
            zg.loginRoom(
              roomID,
              zego_token,
              { userID, userName },
              { userUpdate: true }
            )
              .then(async (result) => {
                console.log(result);

                // After calling the CreateStream method, you need to wait for the ZEGOCLOUD server to return the local stream object before any further operation.
                const localAudioStream = await zg.createStream({
                  camera: { audio: true, video: false },
                });
                const localVideoStream = await zg.createStream({
                  camera: { audio: false, video: true },
                });

                audioStreamRef.current = localAudioStream;
                videoStreamRef.current = localVideoStream;

                // Get the audio tag.
                const localAudio = document.getElementById("local-audio");
                const localVideo = document.getElementById("local-video");
                // The local stream is a MediaStream object. You can render audio by assigning the local stream to the srcObject property of video or audio.
                localAudio.srcObject = localAudioStream;
                localVideo.srcObject = localVideoStream;

                localVideo.play();

                // localStream is the MediaStream object created by calling creatStream in the previous step.
                zg.startPublishingStream(audioStreamID, localAudioStream);
                zg.startPublishingStream(videoStreamID, localVideoStream);

                zg.on("publisherStateUpdate", (result) => {
                  // Callback for updates on stream publishing status.
                  // ...
                  console.log(result);
                  // * we can use this info to show connection status
                });

                zg.on("publishQualityUpdate", (streamID, stats) => {
                  // Callback for reporting stream publishing quality.
                  // ...
                  // console.log(streamID, stats);
                  // * we can use this info to show local audio stream quality
                });
              })
              .catch((error) => {
                console.log(error);
              });

            // Callback for updates on the current user's room connection status.
            zg.on(
              "roomStateUpdate",
              (roomID, state, errorCode, extendedData) => {
                if (state === "DISCONNECTED") {
                  // Disconnected from the room
                  // * Can be used to show disconnected status for a user (especially useful in a group call)
                }

                if (state === "CONNECTING") {
                  // Connecting to the room
                  // * Can be used to show connecting status for a user (especially useful in a group call)
                }

                if (state === "CONNECTED") {
                  // Connected to the room
                  // * Can be used to show connected status for a user (especially useful in a group call)
                }
              }
            );

            // Callback for updates on the status of ther users in the room.
            zg.on("roomUserUpdate", async (roomID, updateType, userList) => {});

            // Callback for updates on the status of the streams in the room.
            zg.on(
              "roomStreamUpdate",
              async (roomID, updateType, streamList, extendedData) => {
                if (updateType !== "ADD") {
                  handleDisconnect();
                } else {
                  // const current_users = JSON.stringify(userList);
                  // * We can use current_users_list to build dynamic UI in a group call
                  const remoteAudioStream = await zg.startPlayingStream(
                    `audio_${userID}`
                  );
                  const remoteVideoStream = await zg.startPlayingStream(
                    `video_${userID}`
                  );

                  // Get the audio tag.
                  const remoteAudio = document.getElementById("remote-audio");
                  const remoteVideo = document.getElementById("remote-video");
                  // The local stream is a MediaStream object. You can render audio by assigning the local stream to the srcObject property of video or audio.

                  remoteAudio.srcObject = remoteAudioStream;
                  remoteVideo.srcObject = remoteVideoStream;
                  remoteAudio.play();
                  remoteVideo.play();
                }
                // if (updateType === "ADD") {
                //   // New stream added, start playing the stream.
                //   console.log(
                //     "ADD",
                //     roomID,
                //     updateType,
                //     streamList,
                //     extendedData
                //   );

                //   // * It would be quite useful to create and play multiple audio streams in a group call
                // } else if (updateType === "DELETE") {
                //   // Stream deleted, stop playing the stream.
                //   console.log(
                //     "DELETE",
                //     roomID,
                //     updateType,
                //     streamList,
                //     extendedData
                //   );

                //   // * Can be used to drop audio streams (more useful in a group call)
                // }
              }
            );

            zg.on("playerStateUpdate", (result) => {
              // Callback for updates on stream playing status.
              // ...
              // * Can be used to display realtime status of a remote audio stream (Connecting, connected & Disconnected)
            });

            zg.on("playQualityUpdate", (streamID, stats) => {
              // Callback for reporting stream playing quality.
              // * Can be used to display realtime quality of a remote audio stream
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchToken();
    return () => {
      zg.destroyEngine();
    };
  }, []);

  return (
    <Stack align="center" justify="center">
      <Group align="center" position="center">
        <Stack align="center" justify="center">
          <Center>
            <video
              style={{ height: 240, width: 320 }}
              id="local-video"
              controls={false}
            />
            <audio id="local-audio" controls={false} />
          </Center>
        </Stack>
        <Stack align="center" justify="center">
          <Center>
            <video
              style={{ height: 240, width: 320 }}
              id="remote-video"
              controls={false}
            />
            <audio id="remote-audio" controls={false} />
          </Center>
        </Stack>
      </Group>
      <Button
        color="red.5"
        leftIcon={<IconPhoneOff />}
        onClick={() => {
          handleDisconnect();
        }}
      >
        Disconnnect
      </Button>
    </Stack>
  );
};
