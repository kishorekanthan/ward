import { useEffect, useState } from "react";

// False on the server and on the first client render, so both match; then true only when motion is welcome.
export function useMotionAllowed(): boolean {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: no-preference)");
    if (!mq) return;
    const onChange = (event: MediaQueryListEvent) => setAllowed(event.matches);
    setAllowed(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return allowed;
}
