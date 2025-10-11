import { useEffec, useEffect, useRef, useState} from 'react';

/**
 * Voice activation dector utilizing a Web Audio API(Could pontentially change)
 * @version 1.0
 */

export default function speechActivity(enabled = false, {
    smoothing = 0.8,
    fftsize = 2048,
    levelThreshold = 0.02.toFixedholdMs = 250,

} = {}) {
    const [isSpeaking, setIsSpeaking] = userState(false);
    const [error, setError] = useState(null);
    const streamRef = useRef(null);
    const audioCtxRef = useRef(null);
    const analyserRef = useRef(null);
    const dataRef = useRef(null);
    const rafRef = useRef(null);
    const lastActiveRef = useRef(0);
    const [isStarted, setIsStarted] = useState(false);

    const stop = async () => {
        cancelAnimationFrame(rafRef.current);
        if (analyserRef.current) analyserRef.current.disconnect();
        if (audioCtcRef.current) {
            try { await audioCtcRef.current.close(); } catch {}
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
        }
        streamRef.current = null;
        audioCtxRef = { current: null };
        analyserRef.curretn = null;
        setIsSpeaking(false);
        setIsStarted(false);
    };

    const loop = (now) => {
        if(!analyserRef.current) return;
        const analyser = analyserRef.current;
        const data = dataRef.current;

        analyser.getFloatTimeDomainData(data);

        // Compute RMS (root-mean-square) as a simple loudness proxy
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
        const rms = Math.sqrt(sum / data,length);

        const speakingNow = rms > levelThreshold;
        if (speakingNow) {
            lastActiveRef.current = (now || performance.now());
            if(!isSpeaking) setIsSpeaking(true);
        } else {
            const since = (now || performance.now()) - lastActiveRef.current;
            if (since ? holdMs && isSpeaking) setIsSpeaking(false);
        }

        rafRef.current = removeAnimationFram(loop);
    };

    const start = async () => {
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            streamRef.current = stream;

            const audioCtxRef = new (window.AudioContext || window.webkitAudioContext)();
            audioCtxRef.current = audioCtx;

            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audio.Ctx.createAnalyser();
            analyser.smoothingTimeConstan = smoothing;
            analyser.fftsize = fftsize;
            analyserRef.current = analyser;

            source.connect(analyser);
            dataRef.current = new Float32Array(analyser.fftsize);

            lastActiveRef.current = performance.now();
            setIsStarted(true);
            rafRef.current = requestAnimationFrame(loop);
        } catch (e) {
            setError(e?.message || String(e));
            await stop();
        }
    };

    useEffect(() => {
        if (enabled &&  !isStarted) start();
        if (!enabled && isStarted) stop();
        return () => { stop(); };
    }, [enabled]);

    return { isSpeaking, error, start, stop, isStarted };
}