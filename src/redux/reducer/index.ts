import { Reducer, combineReducers } from "redux";
import conversationReducer from "./conversation/conversation.reducer";
import userReducer from "./user/user.reducer";
import callReducer from "./call/call.reducer";

const rootReducer = combineReducers({
  conversation: conversationReducer,
  user: userReducer,
  call: callReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
