import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginService } from "../services/LoginService";
import { loginFailure, loginRequest, loginSuccess } from "../redux/authSlice";

interface LoginData {
    email: string;
    password: string;
}

const useUserLogin = () => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const { email, password } = loginData;

        if (email.trim() !== "" && password.trim() !== "") {
            dispatch(loginRequest());
            try {
                const response = await LoginService.login(loginData);
                const accessToken = response?.data?.token;
                dispatch(loginSuccess({ token: accessToken, user: response.data.user }));
            } catch (error: any) {
                let errorMessage = "An error occurred. Please try again.";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                dispatch(loginFailure(errorMessage));
                throw new Error(errorMessage);
            }
        } else {
            throw new Error("Invalid input");
        }
    };

    return { loginData, handleChange, handleLogin };
};

export default useUserLogin;
