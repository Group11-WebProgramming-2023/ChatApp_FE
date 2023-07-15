import { AppDispatch } from "@/redux/store";
import {
  ConversationActionType,
  SelectConversationPayload,
} from "./conversation.type";
import { IConversation } from "@/types/models/IConversation";

const SelectConversation =
  (payload: IConversation) => async (dispatch: AppDispatch) => {
    dispatch({
      type: ConversationActionType.SELECT_CONVERSATION,
      payload: payload,
    });
  };

export const ConversationAction = { SelectConversation };
