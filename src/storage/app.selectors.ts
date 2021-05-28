import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "./app.store";
import { RegisterState } from "./register.reducer";
import { SignInState } from "./signin.reducer";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useSignInSelector: TypedUseSelectorHook<SignInState> = (
  selector
) => useAppSelector((state) => selector(state.signIn));

export const useRegisterSelector: TypedUseSelectorHook<RegisterState> = (
  selector
) => useAppSelector((state) => selector(state.register));
