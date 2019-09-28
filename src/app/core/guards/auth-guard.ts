import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, first, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.afAuth.authState.pipe(
      mergeMap(user => {
        if (!user) {
          this.router.navigate(['/auth/login']);
          return of(false);
        }
        return of(true);
      })
    );
  }
}
