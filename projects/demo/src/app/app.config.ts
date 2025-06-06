import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {providePrimeNG} from 'primeng/config';
import {definePNgThemePreset} from './theme';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: definePNgThemePreset(),
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
          darkModeSelector: '.png-dark-mode',
        },
      },
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
  ]
};
