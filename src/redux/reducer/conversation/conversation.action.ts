import { AppDispatch } from "@/redux/store";
import { IConversation } from "@/types/models/IConversation";
import { ConversationActionType } from "./conversation.type";

const SelectConversation =
  (payload: IConversation) => async (dispatch: AppDispatch) => {
    dispatch({
      type: ConversationActionType.SELECT_CONVERSATION,
      payload: payload,
    });
  };

export const ConversationAction = { SelectConversation };
