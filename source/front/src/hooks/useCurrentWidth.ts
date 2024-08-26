import { useEffect, useState } from "react";

export function useCurrentWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    const resizeListener = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => setWidth(window.innerWidth), 150);
      setTimeoutId(id as unknown as number);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [timeoutId]);

  return width;
}
