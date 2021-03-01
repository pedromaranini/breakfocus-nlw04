import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

// PARA EVITAR QUE O COUNTDOWN REDUZ 1SEG MESMO APÓS RESET
let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
     // USO DA CONTEXT API
    // INICIANDO UM NOVO CHALLENGE
    const { startNewChallenge } = useContext(ChallengesContext);

    // CRIANDO FUNCIONAMENTO DO CRONOMETRO
    const [time, setTime] = useState(25 * 60);
    // VERIFICA SE O COUNTDOWN ESTA ATIVO OU PARADO
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    // CÁLCULO DOS MINUTOS
    const minutes = Math.floor(time / 60);
    // CALCULO DOS SEGUNDOS
    const seconds = time % 60;


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(25 * 60);
    }

    // FAZENDO A CONTAGEM DOS SEGUNDOS
    // REMOVENDO 1 SEGUNDO
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            // STARTANDO A FUNÇÃO
            // QUANDO O TIMER CHEGAR A 0, SERÁ DISPARADO UM NOVO DESAFIO
            startNewChallenge();
        }
        // EXECUTAR QUANDO O TIME MUDA (SENDO MUDADO ACIMA)
        // TIME - 1, EXECUTA .. . . . .
    }, [isActive, time])
    
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    );
}