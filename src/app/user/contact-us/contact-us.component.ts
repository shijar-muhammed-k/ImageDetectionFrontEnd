import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/service/api.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit{

  user;
  @ViewChild('message') message;

  constructor(private api: ApiService, private toast: ToastrService, private loader: NgxUiLoaderService, private userService: UserService, private router: Router) {
    userService.getUser().subscribe(user => {
      this.user = JSON.parse(user)
    })
  }

  ngOnInit(): void {
    this.user.role === 1? this.router.navigate(['/user-list']): '';
  }

  sendMessage() {
    let message = this.message.nativeElement.value
    event.preventDefault();
    if(message.trim() === '') {
      this.toast.info('Please add a message');
      return;
    }
    this.loader.start()
    let data = {
      user: this.user.id,
      message: message
    }

    this.api.sendMessage(data).subscribe((data) => {
      this.loader.stop();
      this.toast.success('Message sent successfully');
      this.message.nativeElement.value = '';
    })
  }

}
