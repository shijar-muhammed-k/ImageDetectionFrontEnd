import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor (
    private router: Router
  ) {}

  public userLoginCheck = new BehaviorSubject(localStorage.getItem('ImageDetectionUser') || '')
  userProfileUpdate = new Subject();

  setLoggedUser(user) {
    localStorage.setItem('ImageDetectionUser', JSON.stringify(user));
    this.userLoginCheck.next(JSON.stringify(user));
    user.role === '2'? this.router.navigate(['/detect']): this.router.navigate(['/user-list']);
  }

  getUser() {
    return this.userLoginCheck.asObservable();
  }

  user_logout() {
    localStorage.removeItem('ImageDetectionUser');
    this.userLoginCheck.next('');
    this.router.navigate(['/login']);
  }
}
