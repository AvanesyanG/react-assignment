import { useState, useEffect, useRef } from 'react';

export const useGameTimer = (isRunning) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0
            ? `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`
            : `${secs} second${secs !== 1 ? 's' : ''}`;
    };

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime * 1000;
            intervalRef.current = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const resetTimer = () => {
        setElapsedTime(0);
    };

    return {
        duration: formatTime(elapsedTime),
        resetTimer
    };
};