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

export function useAuthToken() {
	const token = useAppSelector((state) => state.auth.token);
	return token;
}

export function useUser() {
	const user = useAppSelector((state) => state.auth.user);
	return user;
}

export function useSelectedLanguage() {
	const selectedLanguage = useAppSelector((state) => state.language.selectedLanguage);
	return selectedLanguage;
}

export function useLanguages() {
    console.log('useLanguages');

	const languages = useAppSelector((state) => state.language.languages);
    console.log(`useLanguages`, languages);
	return languages;
}

export function useSelectedCourse() {
	const selectedCourse = useAppSelector((state) => state.course.selectedCourse);
	return selectedCourse;
}

export function useCourses() {
    console.log('useCourses');

	const courses = useAppSelector((state) => state.course.courses);
    console.log(`useCourses`, courses);
	return courses;
}
