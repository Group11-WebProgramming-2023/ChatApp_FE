import { Dispatch } from "redux";
import {
  ConversationActionType,
  ConversationThunkAction,
} from "./conversation.type";
import { SocketEvents, socket } from "@/utils/socket";
import { IConversation } from "@/types/models/IConversation";

const getDirectConversation =
  (): ConversationThunkAction => async (dispatch: Dispatch) => {
    dispatch({
      type: ConversationActionType.CONVERSATION_ACTION_PENDING,
    });

    const userId = localStorage.getItem("userId");

    if (socket && userId) {
      socket.emit(
        SocketEvents.GET_DIRECT_CONVERSATIONS,
        { user_id: userId },
        (data: IConversation[]) => {
          dispatch({
            type: ConversationActionType.GET_DIRECT_CONVERSATION,
            payload: data,
          });
        }
      );
    }
  };

export const ConversationActions = {
  getDirectConversation,
};
