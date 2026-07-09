import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 5000,
  apps: 7000,
  crypto: 7000,
  code: 7000,
  formation: 6000,
  cta: 5000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  apps: Scene2,
  crypto: Scene3,
  code: Scene4,
  formation: Scene5,
  cta: Scene6,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let ms = 0;
  for (const [key, dur] of Object.entries(SCENE_DURATIONS)) {
    out[key] = ms / 1000;
    ms += dur;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <>
      <div
        className="w-full h-screen overflow-hidden relative"
        style={{ backgroundColor: '#0A1628' }}
      >
        <AnimatePresence mode="popLayout">
          {SceneComponent && (
            <SceneComponent key={currentSceneKey} />
          )}
        </AnimatePresence>

        {/* Scene indicator dots */}
        <motion.div
          className="absolute top-0 right-0 flex gap-[0.5vw] p-[1.5vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {Object.keys(SCENE_DURATIONS).map((key, i) => (
            <div
              key={key}
              style={{
                width: 'clamp(4px, 0.5vw, 8px)',
                height: 'clamp(4px, 0.5vw, 8px)',
                borderRadius: '50%',
                background: i === sceneIndex ? '#FF6B00' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.4s',
              }}
            />
          ))}
        </motion.div>
      </div>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </>
  );
}
