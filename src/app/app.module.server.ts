import { NgModule } from '@angular/core';
// import { ServerModule } from '@angular/platform-server';
import { App } from './app';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
import { AppModule } from './app-module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environment/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [
    AppModule,
    // ServerModule
  ],
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
     provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [App],
})
export class AppServerModule {}