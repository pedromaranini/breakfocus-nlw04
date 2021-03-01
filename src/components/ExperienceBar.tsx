import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        // IMPORTANDO O CSS NA CLASSE, PARA DEIXAR DE MANEIRA SEPARADA
        // EVITANDO ALTERAÇÃO E INVASÃO DE CSS EM OUTRAS CLASSES E ELEMENTOS
        <header className={styles.experienceBar}> 
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span 
                    className={styles.currentExperience}
                    style={{ left : `${percentToNextLevel}%` }}
                >
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}