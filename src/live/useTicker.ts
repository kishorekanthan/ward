import { useEffect, useState } from "react";
import { ms } from "../tokens";

export function useTicker(startedAt: string, running: boolean): number {
  const start = new Date(startedAt).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!running) return;
    const sync = () => {
      if (document.visibilityState !== "hidden" && !document.hidden) setNow(Date.now());
    };
    sync();
    const id = window.setInterval(sync, ms.tick);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [running, start]);

  return Math.max(0, now - start);
}
