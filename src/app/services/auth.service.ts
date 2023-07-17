import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn: boolean = false;
  constructor(
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((loginRef) => {
        this.toastr.success('Login Success!');
        this.router.navigate(['/dashboard']);
        this.loadUser();
        this.loginStatus.next(true);
        this.loggedIn = true;
      })
      .catch((error) => {
        this.toastr.warning('Email or Password Incorrect!');
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.warning('Logout!');
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
      this.loginStatus.next(false);
      this.loggedIn = false;
    });
  }

  loadUser() {
    this.afAuth.authState.subscribe((userData) => {
      console.log(userData);
      console.log(JSON.parse(JSON.stringify(userData)));

      localStorage.setItem('user', JSON.stringify(userData));
    });
  }

  isLoggedIn() {
    return this.loginStatus.asObservable();
  }
}
