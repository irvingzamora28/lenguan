import { useState, useEffect, useRef } from "react";
import socket from "../../socket-server/socket";
import correctSound from "../assets/audio/correct-choice.mp3";
import incorrectSound from "../assets/audio/incorrect-choice.mp3";
import { Word, Players, User } from "../types";
import { Language } from "../types/language";

const useGenderDuelSocket = (user: User | null | undefined, selectedLanguage: Language | null, gameRoomId: string | null, maxPlayers: number) => {
    const [connectionError, setConnectionError] = useState(false);
    const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
    const [playerNumber, setPlayerNumber] = useState<number | null>(null);
    const [gameStatus, setGameStatus] = useState("waiting");
    const [word, setWord] = useState<Word | null>(null);
    const [players, setPlayers] = useState<Players>({});
    const [correctGender, setCorrectGender] = useState<string | null>(null);
    const [incorrectGender, setIncorrectGender] = useState<string | null>(null);
    const [appearing, setAppearing] = useState(false);
    const [soundEffect, setSoundEffect] = useState<string | null>(null);
    const [connectedPlayers, setConnectedPlayers] = useState<number>(0);

    useEffect(() => {
        if (user && gameRoomId) {
            socket.emit("join-game-room", { user, gameRoomId, maxPlayers });
        }
    }, [user, gameRoomId, maxPlayers]);

    useEffect(() => {
        socket.on("connect_error", (err) => {
            console.log("Connection Failed", err);
            setConnectionError(true);
        });

        socket.on("connect_timeout", () => {
            console.log("Connection Timeout");
            setConnectionError(true);
        });

        socket.on("connect", () => {
            console.log("Connected");
            setConnectionError(false);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

        socket.on("reconnect", () => {
            console.log("Reconnected");
        });

        socket.on("player-assignment", (assignedData: { playerNumber: number; connectedPlayers: number; maxPlayers: number }) => {
            const { playerNumber, connectedPlayers, maxPlayers } = assignedData;
            setPlayerNumber(playerNumber);
            setConnectedPlayers(connectedPlayers);
            console.log("Player assignment", playerNumber, connectedPlayers, maxPlayers);
            if (playerNumber === 0) {
                setGameStatus("waiting");
            } else if (connectedPlayers < maxPlayers) {
                setGameStatus("waiting-for-opponent");
            } else {
                setGameStatus("ready");
            }
        });

        socket.on("new-word", (newWord: Word) => {
            setWord(newWord);
        });

        socket.on("update-score", (players: Players) => {
            setPlayers(players);
        });

        socket.on("start-game", () => {
            setGameStatus("playing");
        });

        socket.on("game-over", (message: string) => {
            setGameStatus("game-over");
            alert(message);
        });

        socket.on("game-ready", () => {
            setGameStatus("ready");
        });

        return () => {
            socket.off("disconnect");
            socket.off("reconnect");
            socket.off("connect_error");
            socket.off("connect_timeout");
            socket.off("connect");
            socket.off("player-assignment");
            socket.off("new-word");
            socket.off("update-score");
            socket.off("start-game");
            socket.off("game-over");
            socket.off("game-ready");
        };
    }, [socket]);

    useEffect(() => {
        if (soundEffect) {
            const audio = new Audio(soundEffect);
            audio.play();
        }
        setSoundEffect(null);
    }, [soundEffect]);

    const handleGenderClick = (gender: string) => {
        if (word && word.gender === gender) {
            socket.emit("correct-gender-clicked", gender);
            setCorrectGender(gender);
            setSoundEffect(correctSound);

            if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(`${gender} ${word.word}`);
                speechSynthesisRef.current = utterance;
                utterance.lang = "de-DE";
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            }
        } else {
            setIncorrectGender(gender);
            setSoundEffect(incorrectSound);
        }
    };

    const resetAnimation = () => {
        setCorrectGender(null);
        setIncorrectGender(null);
        setAppearing(false);
    };

    const handleStartGame = () => {
        socket.emit("start-game", { selectedLanguage });
    };

    return { connectionError, playerNumber, gameStatus, word, players, appearing, correctGender, incorrectGender, handleGenderClick, resetAnimation, handleStartGame };
};

export default useGenderDuelSocket;
