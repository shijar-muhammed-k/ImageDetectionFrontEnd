import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/service/api.service';
import { UserService } from 'src/app/core/service/user.service';
import { PreviewImageComponent } from '../../shared/preview-image/preview-image.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
})
export class CheckComponent implements OnInit {
  
  constructor(
    private userService: UserService, 
    private loader: NgxUiLoaderService, 
    private api: ApiService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private router: Router
    ) {
    userService.getUser().subscribe(user => {
      this.user = JSON.parse(user);
    })
  }

  user;
  checkList;
  imageFile: File;
  dropZone;
  input;
  btn;
  dialogRef;
  pageCount = 0;
  currentPage = 1;

  ngOnInit(): void {
    this.user.role === 1? this.router.navigate(['/user-list']): '';
    this.getUserCheckList();    
  }

  ngAfterViewInit(): void {

    this.dropZone = document.querySelector('.drop-zone') as HTMLElement;
    this.input = document.querySelector('.drop-zone__input') as HTMLInputElement;
    this.btn = document.querySelector('.drop-zone__btn') as HTMLButtonElement;

    this.dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropZone.classList.add('drop-zone--over');
    });

    ['dragleave', 'dragend'].forEach((type) => {
      this.dropZone.addEventListener(type, () => {
        this.dropZone.classList.remove('drop-zone--over');
      });
    });

    this.dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.handleFiles(files);
    });

    this.input.addEventListener('change', (e) => {
      console.log(e)
      this.imageFile = this.input.files;
      this.handleFiles(e.target.files[0]);
    });

    this.btn.addEventListener('click', () => {
      this.input.click();
    });
  }

  handleFiles(files) {
    const prompt = document.querySelector('.drop-zone__prompt') as HTMLElement;
    const image = document.createElement('img') as HTMLImageElement;
    if (files.length === 0) {
      prompt.textContent = 'No files selected';
      return;
    }

    const file = files;
    const reader = new FileReader();

    reader.onload = () => {
      this.dropZone.innerHTML = ''; // clear drop zone contents
      image.src = reader.result as string; // set img src to file URL
      this.dropZone.appendChild(image); // add img element to drop zone
    };

    reader.readAsDataURL(file);

    prompt.textContent = `${files.length} file(s) selected`;
  }

  getUserCheckList(page = 1) {
    this.loader.start();
    this.api.getReportList('', page).subscribe(res => {
      this.loader.stop();
      this.checkList = res['results'];
      this.pageCount = this.calculatePageCount(res['count'])
      this.checkList.forEach(element => {
        let timestamp = new Date(element.date);

        let year = timestamp.getUTCFullYear();
        let month = timestamp.getUTCMonth() + 1;
        let day = timestamp.getUTCDate();

        element.date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
        timestamp = new Date(element.reported_date);

        year = timestamp.getUTCFullYear();
        month = timestamp.getUTCMonth() + 1;
        day = timestamp.getUTCDate();

        element.reported_date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      })
   }) 
  }

  onSubmit() {
    this.loader.start();
    let data = new FormData();
    let file = this.imageFile[0];
    data.append('user', this.user.id);
    data.append('image', file)

    this.api.predictImage(data).subscribe(data => {
      this.dialogRef = this.dialog.open(PreviewImageComponent, {
        width: '500px',
        height: 'auto',
        hasBackdrop: true,
        data: {
          data:data,
          report: () => {
            this.reportImage(data);
          }
        }
      })
      this.loader.stop();

      this.dialogRef.afterClosed().subscribe(() => {
        location.reload();
      });
    })
  }

  reportImage(item) {
    if (item.reported) {
      return
    }
    this.loader.start();
    this.api.reportImage({id: item.id}).subscribe(() => {
      this.loader.stop();
      item.reported = true;
      this.toast.success('Image was successfully reported')
    })
    this.dialogRef?this.dialogRef.close(): '';
  }

  calculatePageCount(count) {
    return Math.ceil(count / 10);
  }

  getPages(): number[] {
    return Array(this.pageCount).fill(0).map((x, i) => i + 1);
  }

  changePage(page) {
    console.log(page)
    event.preventDefault();
    if(page === 'previous') {
      if(this.currentPage == 1) {
        return
      }
      this.currentPage = this.currentPage - 1;
    } else if(page === 'next') {
      if (this.currentPage === this.pageCount) {
        return
      }
      this.currentPage = this.currentPage + 1;
    } else {
      this.currentPage = page;
    }
    this.getUserCheckList(this.currentPage)
  }

}
