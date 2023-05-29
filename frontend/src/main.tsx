import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Pages/AuthPage/LoginPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import RegisterPage from "./components/Pages/AuthPage/RegisterPage";
import "./index.css";
import DashboardPage from "./components/Pages/DashboardPage/DashboardPage";
import GenderDuelPage from "./components/Pages/GenderDuelPage/GenderDuelPage";
import LessonsPage from "./components/Pages/LessonsPage/LessonsPage";
import LessonPage from "./components/Pages/LessonsPage/LessonPage";
import ExercisesPage from "./components/Pages/LessonsPage/ExercisesPage";
import ListeningExercise from "./components/Pages/LessonsPage/ListeningExercise";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardPage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/lessons",
		element: <LessonsPage />,
	},
	{
		path: "/lessons/:id",
		element: <LessonPage />,
	},
    {
        path: "/exercises",
        element: <ExercisesPage />,
    },
    {
        path: "/listening-exercise/:id",
        element: <ListeningExercise />,
    },
	{
		path: "/gender-duel",
		element: <GenderDuelPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
