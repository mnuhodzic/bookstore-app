import { Injectable } from '@angular/core';
import humanizeDuration from 'humanize-duration';
import { Observable, interval, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private readonly midnight = new Date().setHours(24, 0, 0, 0);
  private diff = this.midnight - Date.now();
  private readonly shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: { shortEn: { h: () => 'h', m: () => 'm', s: () => 's' } },
    largest: 3,
    round: true,
  });
  timeRemaining$: Observable<string>;

  constructor() {
    this.timeRemaining$ = interval(1000).pipe(
      map(() => {
        this.diff -= 1000;
        return this.shortEnglishHumanizer(this.diff).replace(/,/g, ' ');
      })
    );
  }
}
