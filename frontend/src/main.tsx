import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import LoginPage from "./components/Pages/AuthPage/LoginPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import RegisterPage from "./components/Pages/AuthPage/RegisterPage";
import './i18n';
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

const privateRoutes = [
	{ path: "/select-language", element: <SelectLanguagePage /> },
	{ path: "/select-course", element: <SelectCoursePage /> },
	{ path: "/", element: <DashboardPage /> },
	{ path: "/lessons", element: <LessonsPage /> },
	{ path: "/lessons/:lesson_number", element: <LessonPage /> },
	{
        path: "/lessons/:lesson_number",
        element: <ExercisesPage />,
        children: [
          { path: "exercises", element: <ExercisesPage /> },
        ]
      },
	{ path: "/listening-exercise/:lesson_number", element: <ListeningExercise /> },
	{ path: "/vocabulary-exercise/:lesson_number", element: <ScrambledWordsExercise /> },
	{ path: "/grammar-exercise/:lesson_number", element: <VerbConjugationSlotMachineExercise /> },
	{ path: "/timed-flashcards/:lesson_number", element: <TimedFlashcards /> },
	{ path: "/gender-duel", element: <GenderDuelPage /> },
	{ path: "/memory-game", element: <MemoryGame /> },
];

const publicRoutes = [
	{ path: "/login", element: <LoginPage /> },
	{ path: "/register", element: <RegisterPage /> },
];

const router = createBrowserRouter([
	...privateRoutes.map((route) => {
        const { path, element, children } = route;
        return {
          path,
          element: <PrivateRoute>{element}</PrivateRoute>,
          children: children?.map((child) => ({
            path: child.path,
            element: <PrivateRoute>{child.element}</PrivateRoute>
          })),
        };
      }),
	...publicRoutes.map((route) => ({ ...route, element: <PublicRoute>{route.element}</PublicRoute> })),
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
