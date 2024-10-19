import { PositionTracker } from "./PositionTracker.ts";

export class MouseTracker extends PositionTracker {

  public onStart(event: MouseEvent) {
    this.reset({ x: event.clientX, y: event.clientY });
  }

  public onMove(event: MouseEvent) {
    this.current = { x: event.clientX, y: event.clientY };
  }

  public onEnd(event: MouseEvent) {
    this.current = { x: event.clientX, y: event.clientY };
  }

}