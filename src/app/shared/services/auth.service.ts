import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/modals/role.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ROLES } from 'src/app/core/modals/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private $setRole = new BehaviorSubject(null);
  isAdmin: Observable<any> = this.$setRole.asObservable();
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: FirestoreService) {}

  signUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password);
  }

  getRole(uid) {
    this.db.doc(`roles/${uid}`).valueChanges()
    .subscribe((type: Role) => {
      if (type.role === ROLES.ADMIN) {
        this.$setRole.next(true);
      } else {
        this.$setRole.next(false);
      }
    });
  }

  updateCurrentUser(user) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.fullName
    });
    const roleData = {
      role: user.role,
      uid: user.uid,
    };
    return this.db.set(`roles/${user.uid}`, roleData);
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
