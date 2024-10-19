export function toZestureElement(element: HTMLElement): asserts element is toZestureElement.ZestureElement {
  if ("__zesture__" in element && element.__zesture__ === "element") {
    return;
  }

  const zestureEl: toZestureElement.ZestureElement = Object.assign(element, {
    __zesture__: "element" as const,
    get x() {
      return parseFloat(element.style.getPropertyValue("--x"));
    },
    set x(value) {
      element.style.setProperty("--x", `${value}px`);
    },
    get y() {
      return parseFloat(element.style.getPropertyValue("--y"));
    },
    set y(value) {
      element.style.setProperty("--y", `${value}px`);
    },
    get pos() {
      return { x: this.x, y: this.y };
    },
    set pos(value) {
      this.x = value.x;
      this.y = value.y;
    }
  });

  if (Number.isNaN(zestureEl.x)) {
    zestureEl.x = 0;
  }
  if (Number.isNaN(zestureEl.y)) {
    zestureEl.y = 0;
  }
}

export namespace toZestureElement {

  export type Pos = { x: number; y: number };

  export type ZestureElement = HTMLElement & {
    __zesture__: "element";
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get pos(): Pos;
    set pos(value: Pos);
  }


}