import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
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
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import PrivateRoute from "./components/Utilities/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import PublicRoute from "./components/Utilities/PublicRoute";

const privateRoutes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/lessons", element: <LessonsPage /> },
  { path: "/lessons/:id", element: <LessonPage /> },
  { path: "/exercises", element: <ExercisesPage /> },
  { path: "/listening-exercise/:id", element: <ListeningExercise /> },
  { path: "/gender-duel", element: <GenderDuelPage /> },
];

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

const router = createBrowserRouter([
    ...privateRoutes.map(route => ({ ...route, element: <PrivateRoute>{route.element}</PrivateRoute> })),
    ...publicRoutes.map(route => ({ ...route, element: <PublicRoute>{route.element}</PublicRoute> })),
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
