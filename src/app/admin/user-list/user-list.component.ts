import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/service/api.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  users: any;
  currentPage: number;

  constructor (private api: ApiService, private loader: NgxUiLoaderService, private router: Router, private userService: UserService) {
    this.user = JSON.parse(userService.userLoginCheck.value)
  }
  user: any;

  ngOnInit(): void {
    this.user.role === 2? this.router.navigate(['/detect']): '';
    this.getUserList();
  }

  getUserList(search = '') {
    this.loader.start();
    this.api.getUserList(search).subscribe(res => {
      this.loader.stop();
      this.users = res;
    }) 
  }

  searchUser(event) {
    this.currentPage = 1;
    this.getUserList(event.target.value);
  }

}
