import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./app.store";
import { ConversationState } from "./conversation.reducer";
import { CoreState } from "./core.reducer";
import { FeedState } from "./feed.reducer";
import { RegisterState } from "./register.reducer";
import { SignInState } from "./signin.reducer";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useCoreSelector: TypedUseSelectorHook<CoreState> = (selector) =>
  useAppSelector((state) => selector(state.core));

export const useSignInSelector: TypedUseSelectorHook<SignInState> = (
  selector
) => useAppSelector((state) => selector(state.signIn));

export const useRegisterSelector: TypedUseSelectorHook<RegisterState> = (
  selector
) => useAppSelector((state) => selector(state.register));

export const useFeedSelector: TypedUseSelectorHook<FeedState> = (selector) =>
  useAppSelector((state) => selector(state.feed));

export const useConversationSelector: TypedUseSelectorHook<ConversationState> =
  (selector) => useAppSelector((state) => selector(state.conversation));
