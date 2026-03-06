/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch(err => console.error(err));
