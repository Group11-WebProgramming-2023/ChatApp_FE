import { Reducer, combineReducers } from "redux";
import conversationReducer from "./conversation/conversation.reducer";
import userReducer from "./user/user.reducer";
import audioCallReducer from "./audioCall/audioCall.reducer";
import videoCallReducer from "./videoCall/videoCall.reducer";

const rootReducer = combineReducers({
  conversation: conversationReducer,
  user: userReducer,
  audioCall: audioCallReducer,
  videoCall: videoCallReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
