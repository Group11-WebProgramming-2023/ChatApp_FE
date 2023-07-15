import { Reducer } from "redux";
import {
  ConversationAction,
  ConversationActionType,
  ConversationState,
} from "./conversation.type";

const initialState: ConversationState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
  selected_conversation_id: "",
};

const conversationReducer: Reducer<ConversationState, ConversationAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ConversationActionType.FETCH_DIRECT_CONVERSATIONS: {
      const updatedDirectChat = {
        ...state.direct_chat,
        conversations: action.payload,
      };
      return { ...state, direct_chat: updatedDirectChat };
    }

    case ConversationActionType.GET_MESSAGES: {
      const updatedDirectChat = {
        ...state.direct_chat,
        current_messages: action.payload,
      };

      return {
        ...state,
        direct_chat: updatedDirectChat,
      };
    }

    case ConversationActionType.NEW_MESSAGE: {
      const updatedCurrentMessage = [
        ...state.direct_chat.current_messages,
        action.payload.message,
      ];
      const updatedDirectChat = {
        ...state.direct_chat,
        current_messages: updatedCurrentMessage,
      };

      return { ...state, direct_chat: updatedDirectChat };
    }
    case ConversationActionType.SELECT_CONVERSATION:
      return { ...state, selected_conversation_id: action.payload };
    default:
      return state;
  }
};

export default conversationReducer;
