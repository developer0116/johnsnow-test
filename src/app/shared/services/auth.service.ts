import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {}

  signUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password);
  }

  updateCurrentUser(user) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.fullName
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
