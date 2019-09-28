import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginActive = true;
  constructor(private router: Router) {
    if (this.router.url === '/auth/register') {
      this.isLoginActive = false;
    }
  }

  ngOnInit() {
  }

  navigateToRegister() {
    this.isLoginActive = false;
    this.router.navigate(['/auth/register']);
  }

  navigateToLogin() {
    this.isLoginActive = true;
    this.router.navigate(['/auth/login']);
  }

}
