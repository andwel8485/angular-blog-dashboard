import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  /**
   *
   */

  userEmail!: string;
  loginStatus$!: Observable<boolean>;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.loginStatus$ = this.authService.isLoggedIn();
    let user = localStorage.getItem('user');
    if (user) {
      this.userEmail = JSON.parse(user).email;
    }
  }

  logout() {
    this.authService.logout();
  }
}
