export class PositionTracker {

  private position: PositionTracker.State = {
    initial: { x: 0, y: 0 },
    current: { x: 0, y: 0 },
  }

  public constructor(initial: PositionTracker.Pos = { x: 0, y: 0 }) {
    this.reset(initial);
  }

  public set initial(pos: PositionTracker.Pos) {
    this.position.initial.x = pos.x;
    this.position.initial.y = pos.y;
  }

  public get initial(): PositionTracker.Pos {
    return { ...this.position.initial };
  }

  public set initialX(x: PositionTracker.Pos["x"]) {
    this.position.initial.x = x;
  }

  public get initialX(): PositionTracker.Pos["x"] {
    return this.position.initial.x;
  }

  public set initialY(y: PositionTracker.Pos["y"]) {
    this.position.initial.y = y;
  }

  public get initialY(): PositionTracker.Pos["y"] {
    return this.position.initial.y;
  }

  public set current(pos: PositionTracker.Pos) {
    this.position.current.x = pos.x;
    this.position.current.y = pos.y;
  }

  public get current(): PositionTracker.Pos {
    return { ...this.position.current };
  }

  public set currentX(x: PositionTracker.Pos["x"]) {
    this.position.current.x = x;
  }

  public get currentX(): PositionTracker.Pos["x"] {
    return this.position.current.x;
  }

  public set currentY(y: PositionTracker.Pos["y"]) {
    this.position.current.y = y;
  }

  public get currentY(): PositionTracker.Pos["y"] {
    return this.position.current.y;
  }

  public get delta(): PositionTracker.Pos {
    return {
      x: this.deltaX,
      y: this.deltaY,
    }
  }

  public get deltaX(): PositionTracker.Pos["x"] {
    return this.position.current.x - this.position.initial.x;
  }

  public get deltaY(): PositionTracker.Pos["x"] {
    return this.position.current.y - this.position.initial.y;
  }

  public reset(pos: PositionTracker.Pos) {
    this.initial = pos;
    this.current = pos;
  }

  public getSnapshot(): PositionTracker.Snapshot {
    return {
      initial: this.initial,
      current: this.current,
      delta: this.delta,
    }
  }

}

export namespace PositionTracker {

  export type Pos = { x: number; y: number };

  export type State = {
    initial: Pos;
    current: Pos;
  }

  export type Snapshot = State & {
    delta: Pos;
  }

}