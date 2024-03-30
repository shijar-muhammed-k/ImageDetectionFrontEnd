import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'
import { UserService } from '../service/user.service';
import { Router } from '@angular/router'

export const loginGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UserService);
  const router = inject(Router);


  let loggeduser;

  userService.getUser().subscribe((user) => {
    loggeduser = user
  })

  if(loggeduser) {
    router.navigate(['detect']);
    return false;
  } else {
    return true;
  }
};