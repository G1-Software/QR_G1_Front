import { useChatbaseTracker } from "../hooks/useChatbaseTracker";

export function RootWrapper({ children }) {
  useChatbaseTracker();
  return children;
}
