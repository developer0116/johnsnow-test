import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: firebase.User;
  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.authService.getRole(user.uid);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
