import type { RefObject } from "../types";

export function getBoundingClientRectRef(element: HTMLElement, options: getBoundingClientRectRef.Options): RefObject<DOMRect> {
  const ref: RefObject<DOMRect> = { current: element.getBoundingClientRect() };
  const observer = new ResizeObserver(() => {
    ref.current = element.getBoundingClientRect();
  });
  options.signal.addEventListener("abort", () => observer.disconnect(), { once: true });
  return ref;
}

export namespace getBoundingClientRectRef {

  export type Options = {
    signal: AbortSignal;
  }

}