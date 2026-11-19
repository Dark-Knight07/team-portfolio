import { useCallback, type KeyboardEvent } from "react";

/** Arrow / Home / End navigation for a WAI-ARIA tablist. */
export function useTabKeys(count: number, current: number, set: (i: number) => void, orientation: "horizontal" | "vertical" | "both" = "both") {
  return useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const next = orientation !== "vertical" ? ["ArrowRight"] : [];
      const prev = orientation !== "vertical" ? ["ArrowLeft"] : [];
      if (orientation !== "horizontal") {
        next.push("ArrowDown");
        prev.push("ArrowUp");
      }
      let i = current;
      if (next.includes(e.key)) i = (current + 1) % count;
      else if (prev.includes(e.key)) i = (current - 1 + count) % count;
      else if (e.key === "Home") i = 0;
      else if (e.key === "End") i = count - 1;
      else return;
      e.preventDefault();
      set(i);
      const tabs = e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]');
      tabs[i]?.focus();
    },
    [count, current, set, orientation],
  );
}
