import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

// CONTEXT RECEBE O FORMATO DA INTERFACE CRIADA ACIMA
export const ChallengesContext = createContext({} as ChallengesContextData);

// REST = TODAS PROPS QUE NÃO SÃO A CHILDREN (LEVEL, CURRENTEXPERIENCE, CHALLENGESCOMPLETED)
export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps) {

// ALTERANDO AS INFORMAÇÕES DO LEVEL, USANDO CONTEXT API DO REACT
const [level, setLevel] = useState(rest.level ?? 1);
const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

const [activeChallenge, setActiveChallenge] = useState(null);
const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

// CALCULANDO A EXPERIENCIA DO USUARIO
const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

// PEDINDO PERMISSÃO AO USUARIO PARA ENVIAR NOTIFICAÇÃO
useEffect(() => {
    Notification.requestPermission();
}, []);

// SALVANDO NOS COOKIES / USANDO A LIB JS-COOKIE
useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
}, [level, currentExperience, challengesCompleted]);

function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
}

function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
}

function startNewChallenge() {
    // RETORNANDO UM DESAFIO ALEATORIO
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
        new Notification('Novo desafio 🎉', {
            body: `Valendo ${challenge.amount} xp`
        })
    }
}

// FUNÇÃO CHAMADA QUANDO O USUÁRIO FALHAR NO DESAFIO
function resetChallenge() {
    setActiveChallenge(null);
}

// DESAFIO COMPLETO
function completedChallenge() {
    // VALIDAÇÃO, A CUNFÃO NÃO PODE SER INVOCADA EM CASO DE CHALLENGE ATIVO
    if (!activeChallenge) {
        return;
    }

    const { amount } = activeChallenge;

    // EXPERIENCA ATUAL + EXPERIENCIA DO CHALLENGE
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
        // PEGANDO EXPERIENCIA FINAL MENOS A EXPERIENCIA NECESSARIA PARA SUBIR DE NIVEL
        finalExperience = finalExperience - experienceToNextLevel;
        // SUBINDO USUÁRIOD E NIVEL
        levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
}
    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                experienceToNextLevel,
                challengesCompleted, 
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completedChallenge,
                closeLevelUpModal,
            }}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    );
}