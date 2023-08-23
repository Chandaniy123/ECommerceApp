import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TheamService {

  private currentTheme: string = 'light-theme';

  private currentThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('light-theme');
  currentTheme$ = this.currentThemeSubject.asObservable();

  setTheme(theme: string): void {
    this.currentThemeSubject.next(theme);
  }

 
  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
