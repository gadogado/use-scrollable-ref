import { useState, useRef, useEffect, useMemo } from "react";
const BOTTOM_THRESHOLD_DEFAULT = 75;

interface UseScrollableProps {
  bottomThreshold?: number;
}

export default function useScrollableRef({
  bottomThreshold = BOTTOM_THRESHOLD_DEFAULT,
}: UseScrollableProps = {}) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [scrollOffsetHeight, setScrollOffsetHeight] = useState<number>(0);

  useEffect(() => {
    const elem = scrollableRef.current;
    if (!elem) return;

    const scroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setScrollHeight(target.scrollHeight);
      setScrollPosition(target.scrollTop);
      setScrollOffsetHeight(target.offsetHeight);
    };

    elem.addEventListener("scroll", scroll);
    return () => {
      elem.removeEventListener("scroll", scroll);
    };
  }, []);

  const scrollableBottomReached = useMemo(() => {
    const targetPosition =
      (scrollPosition / (scrollHeight - scrollOffsetHeight)) * 100;
    return targetPosition >= bottomThreshold;
  }, [scrollPosition]);

  return {
    scrollableRef,
    scrollHeight,
    scrollPosition,
    scrollOffsetHeight,
    scrollableBottomReached,
  };
}
