import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/service/api.service';
import { UserService } from 'src/app/core/service/user.service';
import { ReplyMessageComponent } from 'src/app/shared/reply-message/reply-message.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  dialogREf;
  messages;
  user: any;
  constructor(
    private loader: NgxUiLoaderService,
    private api: ApiService,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router) {
    this.user = JSON.parse(userService.userLoginCheck.value)
  }

  ngOnInit(): void {
    this.user.role === 2? this.router.navigate(['/detect']): '';
    this.getList();
  }

  getList(search = '') {
    this.loader.start();
    this.api.getUserMessages(search).subscribe((messages) => {
      this.loader.stop();
      this.messages = messages
      this.messages.forEach(element => {
        let timestamp = new Date(element.date);
  
        let year = timestamp.getUTCFullYear();
        let month = timestamp.getUTCMonth() + 1;
        let day = timestamp.getUTCDate();
  
        element.date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      });
    });
  }

  searchUser(event) {
    this.getList(event.target.value);
  }


  replyMessage(item) {
    if(item.replied) {
      return
    }

    this.dialogREf = this.dialog.open(ReplyMessageComponent, {
      width: '500px',
      height: '450px',
      data: {
        data: item,
        close: () => {
          this.dialogREf.close();
          this.ngOnInit();
        } 
      }
    })
  }

}
