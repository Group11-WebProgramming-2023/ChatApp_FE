import { AppDispatch } from "@/redux/store";
import {
  ConversationActionType,
  SelectConversationPayload,
} from "./conversation.type";

const SelectConversation =
  (payload: SelectConversationPayload) => async (dispatch: AppDispatch) => {
    dispatch({
      type: ConversationActionType.SELECT_CONVERSATION,
      payload: payload,
    });
  };

export const ConversationAction = { SelectConversation };
