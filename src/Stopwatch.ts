/**
 * Copyright (c) 2021 Noel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { performance } from 'perf_hooks';

/**
 * Utility stopwatch for calculating duration on asynchronous execution
 */
export default class Stopwatch {
  #startTime?: number;
  #endTime?: number;

  /**
   * Returns the symbol duration
   * @param type The calculation
   */
  symbolOf(type: number) {
    if (type > 1000) return `${type.toFixed(1)}s`;
    if (type > 1) return `${type.toFixed(1)}ms`;
    return `${type.toFixed(1)}µs`;
  }

  /**
   * Restarts this [[Stopwatch]]
   */
  restart() {
    this.#startTime = performance.now();
    this.#endTime = undefined;
  }

  /**
   * Starts this [[Stopwatch]], calling this function
   * twice will result in a `SyntaxError`.
   */
  start() {
    if (this.#startTime !== undefined) throw new SyntaxError('Stopwatch has already started');

    this.#startTime = performance.now();
  }

  /**
   * Ends this [[Stopwatch]] and returns the duration
   * as a string. Calling this function without calling
   * `Stopwatch#start` will error with a `TypeError`.
   */
  end() {
    if (!this.#startTime) throw new TypeError('Stopwatch has not started');

    this.#endTime = performance.now();
    return this.symbolOf(this.#endTime - this.#startTime);
  }
}
