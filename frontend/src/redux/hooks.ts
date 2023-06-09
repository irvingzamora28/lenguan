import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useIsAuthenticated() {
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	return Boolean(isAuthenticated);
}

export function useIsGuest() {
	const isGuest = useAppSelector((state) => state.auth.isGuest);
	return Boolean(isGuest);
}
