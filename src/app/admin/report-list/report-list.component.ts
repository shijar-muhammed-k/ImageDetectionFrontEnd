import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/core/service/api.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  
  reportedList;
  currentPage: number = 1;
  pageCount: number;
  constructor (private api: ApiService, private loader: NgxUiLoaderService, private router: Router, private userService: UserService) {
    this.user = JSON.parse(userService.userLoginCheck.value)
  }
  user: any;

  ngOnInit(): void {
    this.user.role === 2? this.router.navigate(['/detect']): '';
    this.getList();
  }

  getList(search = '', page = 1) {
    this.loader.start();
    this.api.getReportList(search, page).subscribe(res => {
     this.reportedList = res['results'];
     this.reportedList.forEach(element => {
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
     this.loader.stop();
    }) 
  }

  searchUser(event) {
    this.currentPage = 1;
    this.getList(event.target.value);
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
    this.getList('', this.currentPage)
  }

}
