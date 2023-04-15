import React, { useEffect, useState } from "react";
import registerImage from "../assets/images/register-image.jpg";
import "../assets/scss/components/RegisterPage.scss";

import axios from "axios";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const RegisterPage: React.FC = () => {
    axios.defaults.baseURL = "http://localhost:8000/";

    const [registerData, setRegisterData] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errorMessage, setErrorMessage] = useState<string[]>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage([]);

        try {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("/api/register", registerData);
            // Handle successful registration
            console.log("response", response.data);
            // your axios request here
        } catch (error: any) {
            console.error("Error in handleSubmit:", error); // Add this line to log the error object
            if (error.response) {
                const { data } = error.response;
                const errorFields = Object.keys(data.errors);
                let errorMessageLines:string[] = [];
                errorFields.forEach((field) => {
                    console.error(`${field}: ${data.errors[field][0]}`);
                    errorMessageLines.push(`${data.errors[field][0]}`);
                });
                setErrorMessage(errorMessageLines);
            } else {
                console.error(error);
                setErrorMessage(["An error occurred. Please try again."]);
            }
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            // Now you can make API requests
            console.log("useEffect");
            console.log(response);
        });

        return () => {};
    }, []);

    return (
        <div className="register__section min-h-screen flex items-center justify-center bg-blue-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-28 w-auto md:h-80"
                        src={registerImage}
                        alt="Register"
                    />
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-center font-semibold">
                            {errorMessage.map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </div>
                    )}
                </div>
                <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm space-y-3 ">
                    <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                onChange={handleChange}
                                value={registerData.email}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                onChange={handleChange}
                                value={registerData.name}
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                onChange={handleChange}
                                value={registerData.password}
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="sr-only"
                            >
                                Confirm password
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                                onChange={handleChange}
                                value={registerData.password_confirmation}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
