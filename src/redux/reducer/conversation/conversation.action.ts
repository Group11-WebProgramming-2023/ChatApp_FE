import { AppDispatch } from "@/redux/store";
import { ConversationActionType } from "./conversation.type";

const SelectConversation =
  (room_id: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: ConversationActionType.SELECT_CONVERSATION,
      payload: room_id,
    });
  };

export const ConversationAction = { SelectConversation };
