
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { PlatformService } from '../core/services/platform-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private platform: PlatformService
  ) {
        if (this.platform.isBrowser) {
      this.user$ = this.afAuth.authState;
    } else {
      this.user$ = of(null);
    }
  }

  loginWithGoogle() {
     if (!this.platform.isBrowser) return;

    return this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    if (!this.platform.isBrowser) return;

    return this.afAuth.signOut();
  }
}