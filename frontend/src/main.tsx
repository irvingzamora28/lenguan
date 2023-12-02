import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Pages/AuthPage/LoginPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import RegisterPage from "./components/Pages/AuthPage/RegisterPage";
import "./i18n";
import "./index.css";
import DashboardPage from "./components/Pages/DashboardPage/DashboardPage";
import GenderDuelPage from "./components/Pages/GenderDuelPage/GenderDuelPage";
import LessonsPage from "./components/Pages/LessonsPage/LessonsPage";
import LessonPage from "./components/Pages/LessonsPage/LessonPage";
import ExercisesPage from "./components/Pages/LessonsPage/ExercisesPage";
import ListeningExercise from "./components/Pages/LessonsPage/ListeningExercise";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import PrivateRoute from "./components/Utilities/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import PublicRoute from "./components/Utilities/PublicRoute";
import SelectLanguagePage from "./components/Pages/SelectLanguagePage";
import SelectCoursePage from "./components/Pages/SelectCoursePage";
import TimedFlashcards from "./components/Pages/TimedFlashCardsPage/TimedFlashCardsPage";
import MemoryGame from "./components/Pages/MemoryGamePage/MemoryGamePage";
import ScrambledWordsExercise from "./components/Pages/LessonsPage/ScrambledWordsExercise";
import VerbConjugationSlotMachineExercise from "./components/Pages/LessonsPage/VerbConjugationSlotMachineExercise";
import CreateStoryWritingExercise from "./components/Pages/LessonsPage/CreateStoryWritingExercise";
import ProfilePage from "./components/Pages/ProfilePage/ProfilePage";
import EditProfilePage from "./components/Pages/ProfilePage/EditProfilePage";
import VocabularyPage from "./components/Pages/LessonsPage/VocabularyPage";
import QuizzesPage from "./components/Pages/LessonsPage/QuizzesPage";
import MultipleChoiceQuiz from "./components/Pages/LessonsPage/MultipleChoiceQuiz";
import SentenceFormationQuiz from "./components/Pages/LessonsPage/SentenceFormationQuiz";

interface RouteType {
	path: string;
	element: React.ReactNode;
	children?: RouteType[];
}

const privateRoutes = [
	{ path: "/select-language", element: <SelectLanguagePage /> },
	{ path: "/select-course", element: <SelectCoursePage /> },
	{ path: "/", element: <DashboardPage /> },
	{ path: "/profile", element: <ProfilePage /> },
	{ path: "/edit-profile", element: <EditProfilePage /> },
	{ path: "/lessons", element: <LessonsPage /> },
	{ path: "/lessons/:lesson_number", element: <LessonPage /> },
	{ path: "/lessons/:lesson_number/exercises", element: <ExercisesPage /> },
	{ path: "/lessons/:lesson_number/vocabulary", element: <VocabularyPage /> },
	{ path: "/lessons/:lesson_number/quizzes", element: <QuizzesPage /> },
	{ path: "/lessons/:lesson_number/quizzes/multiple-choice", element: <MultipleChoiceQuiz /> },
	{ path: "/lessons/:lesson_number/quizzes/sentence-formation", element: <SentenceFormationQuiz /> },
	{ path: "/listening-exercise/:lesson_number", element: <ListeningExercise /> },
	{ path: "/vocabulary-exercise/:lesson_number", element: <ScrambledWordsExercise /> },
	{ path: "/grammar-exercise/:lesson_number", element: <VerbConjugationSlotMachineExercise /> },
	{ path: "/writing-exercise/:lesson_number", element: <CreateStoryWritingExercise /> },
	{ path: "/timed-flashcards/:lesson_number", element: <TimedFlashcards /> },
	{ path: "/gender-duel", element: <GenderDuelPage /> },
	{ path: "/memory-game", element: <MemoryGame /> },
];

const publicRoutes = [
	{ path: "/login", element: <LoginPage /> },
	{ path: "/register", element: <RegisterPage /> },
];

const router = createBrowserRouter([
	...privateRoutes.map((route: RouteType) => ({
		...route,
		element: <PrivateRoute>{route.element}</PrivateRoute>,
	})),
	...publicRoutes.map((route) => ({
		...route,
		element: <PublicRoute>{route.element}</PublicRoute>,
	})),
	{ path: "*", element: <NotFoundPage /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
