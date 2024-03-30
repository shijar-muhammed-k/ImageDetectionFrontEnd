import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-reply-message',
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.scss']
})
export class ReplyMessageComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader: NgxUiLoaderService,
    private api: ApiService,
    private toast: ToastrService
  ) { }


  sendReply(message) {
    event.preventDefault()
    if(message.trim().length == 0){
      this.toast.error('Please Fill the fields')
      return
    }
    this.loader.start();
    let data = {
      message : message,
      id: this.data.data.id
    }
    this.api.replyUserMessage(data).subscribe(data => {
      this.toast.success('Message Sent Successfully');
      this.loader.stop();
      this.data.close();
    })
  }

}
