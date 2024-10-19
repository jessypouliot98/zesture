import type { PositionTracker } from "../../utils/position/PositionTracker.ts";

export type GrabInfo = {
  pointer: PositionTracker.Snapshot;
  element: PositionTracker.Snapshot;
}

export type PanParams<TEvent extends Event = Event> = {
  /**
   * Calling `event.preventDefault()` will also prevent initialization of the gesture
   */
  onGrabStart: (info: GrabInfo, event: TEvent) => void;
  onGrabMove: (info: GrabInfo, event: TEvent) => void;
  onGrabEnd: (info: GrabInfo, event: TEvent) => void;
}

export type PanOptions = Partial<{
  signal: AbortSignal;
}>