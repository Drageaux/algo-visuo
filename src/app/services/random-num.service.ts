import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumService {
  constructor() {}

  /**
   * Generate an array of numbers, where the max value is also the sample size
   * @param size
   */
  generate(size): number[] {
    // https://stackoverflow.com/a/43044960
    return Array.from({ length: size }, () => this.getRndInteger(1, size));
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
