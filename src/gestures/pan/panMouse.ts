import type { PanOptions, PanParams } from "./utils.ts";
import { ZestureAbortController } from "../../utils/memory/ZestureAbortController.ts";
import { MouseTracker } from "../../utils/position/MouseTracker.ts";
import { toZestureElement } from "../../utils/dom/toZestureElement.ts";
import { PositionTracker } from "../../utils/position/PositionTracker.ts";

export function panMouse(element: HTMLElement, params: panMouse.Params, options?: panMouse.Options) {
  const abortController = new ZestureAbortController(options?.signal);
  element.addEventListener("mousedown", panMouse.onMouseDown(element, params, { signal: abortController.signal }));
  return abortController;
}

export namespace panMouse {

  export type Params = PanParams<MouseEvent>;
  export type Options = PanOptions;

  export function onMouseDown(element: HTMLElement, params: Params, options: onMouseDown.Options): onMouseDown.Return {
    toZestureElement(element);
    const mouseTracker = new MouseTracker();
    const elementTracker = new PositionTracker(element.pos);
    let abortController: ZestureAbortController | undefined;

    return (downEvent) => {
      mouseTracker.onStart(downEvent);
      elementTracker.reset(element.pos);
      params.onGrabStart(
        {
          pointer: mouseTracker.getSnapshot(),
          element: elementTracker.getSnapshot(),
        },
        downEvent,
      );
      if (downEvent.defaultPrevented) return;
      abortController = new ZestureAbortController(options?.signal);

      window.addEventListener(
        "mousemove",
        (moveEvent) => {
          mouseTracker.onMove(moveEvent);
          elementTracker.currentX = elementTracker.initialX + mouseTracker.deltaX;
          elementTracker.currentY = elementTracker.initialY + mouseTracker.deltaY;
          params.onGrabMove(
            {
              pointer: mouseTracker.getSnapshot(),
              element: elementTracker.getSnapshot(),
            },
            moveEvent,
          );
        },
        { signal: abortController.signal },
      );

      window.addEventListener(
        "mouseup",
        (upEvent) => {
          mouseTracker.onEnd(upEvent);
          elementTracker.currentX = elementTracker.initialX + mouseTracker.deltaX;
          elementTracker.currentY = elementTracker.initialY + mouseTracker.deltaY;
          params.onGrabMove(
            {
              pointer: mouseTracker.getSnapshot(),
              element: elementTracker.getSnapshot(),
            },
            upEvent,
          );
          if (upEvent.defaultPrevented) return;
          abortController!.abort();
        },
        {
          signal: abortController.signal
        }
      );
    }
  }

  export namespace onMouseDown {

    export type Return = (event: MouseEvent) => void;

    export type Options = {
      signal: AbortSignal;
    }

  }

}