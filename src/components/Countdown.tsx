import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    // CRIANDO FUNCIONAMENTO DO CRONOMETRO
    const [time, setTime] = useState(25 * 60);
    // VERIFICA SE O COUNTDOWN ESTA ATIVO OU PARADO
    const [active, setActive] = useState(false);

    // CÁLCULO DOS MINUTOS
    const minutes = Math.floor(time / 60);
    // CALCULO DOS SEGUNDOS
    const seconds = time % 60;

    // padStart verifica se a string tem dois caracteres
    // caso não tenha, completa com 0 para esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setActive(true);
    }

    // FAZENDO A CONTAGEM DOS SEGUNDOS
    // REMOVENDO 1 SEGUNDO
    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }
        // EXECUTAR QUANDO O TIME MUDA (SENDO MUDADO ACIMA)
        // TIME - 1, EXECUTA .. . . . .
    }, [active, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}
                >
                    Iniciar um ciclo
            </button>
        </div>
    );
}