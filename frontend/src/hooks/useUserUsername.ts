import { useState, useEffect } from "react";
import { useUser } from "../redux/hooks";

const useUserUsername = () => {
    const user = useUser();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is logged in
        if (user !== null) {
            setUsername(user.username ?? "guest");
        }
    }, []);

    const handleEnterAsGuest = () => {
        setUsername(`Guest_${Math.floor(Math.random() * 1000)}`);
    };

    return {
        user,
        username,
        handleEnterAsGuest
    }
};

export default useUserUsername;
