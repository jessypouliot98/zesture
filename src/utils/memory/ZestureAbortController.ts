/**
 * AbortController that can be aborted by another AbortController
 */
export class ZestureAbortController extends AbortController {

  private externalSignal?: AbortSignal;

  constructor(signal?: AbortSignal) {
    super();
    this.externalSignal = signal;
    if (this.externalSignal) {
      this.externalSignal.addEventListener(
        "abort",
        (event) => this.abort(event),
        { once: true, signal: this.signal }
      );
    }
  }

}