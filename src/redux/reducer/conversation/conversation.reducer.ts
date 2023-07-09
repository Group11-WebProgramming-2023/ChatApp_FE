import { Reducer } from "redux";
import {
  ConversationAction,
  ConversationActionType,
  ConversationState,
} from "./conversation.type";
import { stat } from "fs";

const initialState: ConversationState = {
  isFetching: false,
  conversations: [],
};

const conversationReducer: Reducer<ConversationState, ConversationAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ConversationActionType.CONVERSATION_ACTION_PENDING:
      return { ...state, isFetching: true };
    case ConversationActionType.CONVERSATION_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case ConversationActionType.GET_DIRECT_CONVERSATION:
      return { ...state, isFetching: false, conversations: action.payload };
    case ConversationActionType.NEW_MESSAGE: {
      const newConversations = state.conversations.map((conversation) => {
        if (conversation._id === action.payload.conversation_id) {
          conversation.messages.push(action.payload);
        }
      });
      return state;
    }
    default:
      return state;
  }
};

export default conversationReducer;
