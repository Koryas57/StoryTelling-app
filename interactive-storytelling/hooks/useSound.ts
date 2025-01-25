import { Audio } from 'expo-av';
import { useCallback, useRef } from 'react';

const useSound = (filePath: any) => {
    const soundRef = useRef<Audio.Sound | null>(null);

    const play = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(filePath);
        soundRef.current = sound;
        await sound.playAsync();
    }, [filePath]);

    const stop = useCallback(async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
            await soundRef.current.unloadAsync();
            soundRef.current = null;
        }
    }, []);

    return Object.assign(play, { stop });
};

export default useSound;
