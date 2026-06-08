import { FormsModule } from '@angular/forms';

import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { About } from './about/about';

@NgModule({
  declarations: [App, Home, About],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule
],
providers: [
  provideBrowserGlobalErrorListeners(),
  provideClientHydration(withEventReplay())
],
  bootstrap: [App],
})
export class AppModule {}
