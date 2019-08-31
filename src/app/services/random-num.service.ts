import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumService {
  constructor() {}

  generate(size): number[] {
    // https://stackoverflow.com/a/43044960
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
  }
}
