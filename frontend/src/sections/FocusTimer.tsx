import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Maximize2, Pause, Play, RotateCcw, SkipBack } from "lucide-react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { SegmentedControl } from "@/components/SegmentedControl";
import { socket } from "@/services/socket";
import { useUIStore } from "@/store/uiStore";
import { formatDuration } from "@/utils";

const RopeTimer = lazy(() => import("@/three/RopeTimer").then((module) => ({ default: module.RopeTimer })));

type Status = "idle" | "running" | "paused" | "complete";

const modeOptions = [
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "Custom", value: 90 }
];

export function FocusTimer() {
  const [status, setStatus] = useState<Status>("idle");
  const [customMinutes, setCustomMinutes] = useState(90);
  const timerMode = useUIStore((state) => state.timerMode);
  const setTimerMode = useUIStore((state) => state.setTimerMode);
  const fullscreen = useUIStore((state) => state.fullscreenFocus);
  const setFullscreen = useUIStore((state) => state.setFullscreenFocus);
  const totalSeconds = useMemo(() => (timerMode === 90 ? customMinutes : timerMode) * 60, [customMinutes, timerMode]);
  const [remaining, setRemaining] = useState(totalSeconds);
  const progress = Math.max(0, remaining / totalSeconds);

  useEffect(() => setRemaining(totalSeconds), [totalSeconds]);

  useEffect(() => {
    if (status !== "running") return undefined;
    const interval = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          clearInterval(interval);
          setStatus("complete");
          socket.emit("focus:completed", { modeMinutes: totalSeconds / 60, completedAt: new Date().toISOString() });
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, totalSeconds]);

  useEffect(() => {
    gsap.to(".focus-stage", { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
  }, [fullscreen]);

  function start() {
    setStatus("running");
    setFullscreen(true);
    socket.emit("focus:started", { modeMinutes: totalSeconds / 60, startedAt: new Date().toISOString() });
  }

  function reset() {
    setStatus("idle");
    setRemaining(totalSeconds);
    setFullscreen(false);
  }

  const content = (
    <div className="focus-stage grid gap-5 lg:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative aspect-square min-h-[280px] overflow-hidden rounded-lg border border-line bg-black/22">
        <Suspense fallback={<div className="grid h-full place-items-center text-sm text-white/50">Loading fire simulation...</div>}>
          <RopeTimer progress={progress} active={status === "running"} />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.22em] text-white/42">{status}</p>
            <strong className="mt-2 block text-5xl font-semibold">{formatDuration(remaining)}</strong>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm text-white/52">Focus Timer</p>
        <h2 className="mt-1 text-2xl font-semibold">Burning rope deep work session</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/58">
          The remaining rope is the time left. As the session runs, flame, embers, smoke, and lighting move around the circular path.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <SegmentedControl ariaLabel="Timer mode" value={timerMode} options={modeOptions} onChange={setTimerMode} />
          {timerMode === 90 && (
            <label className="flex items-center gap-2 rounded-lg border border-line bg-white/5 px-3 py-2 text-sm text-white/62">
              <span>Minutes</span>
              <input
                type="number"
                min={5}
                max={180}
                value={customMinutes}
                onChange={(event) => setCustomMinutes(Number(event.target.value))}
                className="w-16 bg-transparent text-white outline-none"
              />
            </label>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {status === "idle" || status === "complete" ? (
            <button type="button" onClick={start} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white">
              <Play size={18} /> Start
            </button>
          ) : status === "running" ? (
            <button type="button" onClick={() => setStatus("paused")} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/10 px-4 text-sm font-semibold text-white">
              <Pause size={18} /> Pause
            </button>
          ) : (
            <button type="button" onClick={() => setStatus("running")} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-success px-4 text-sm font-semibold text-white">
              <Play size={18} /> Resume
            </button>
          )}
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/5 px-4 text-sm font-semibold text-white/72">
            <RotateCcw size={18} /> Reset
          </button>
          <button type="button" onClick={() => setFullscreen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/5 px-4 text-sm font-semibold text-white/72">
            <Maximize2 size={18} /> Fullscreen
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <GlassCard id="focus" interactive={false}>{content}</GlassCard>
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-ink/96 p-4 backdrop-blur-glass"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen focus mode"
          >
            <button type="button" onClick={() => setFullscreen(false)} className="fixed right-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/8 px-4 text-sm font-semibold">
              <SkipBack size={18} /> Exit
            </button>
            <div className="mx-auto grid min-h-screen max-w-6xl place-items-center py-16">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
