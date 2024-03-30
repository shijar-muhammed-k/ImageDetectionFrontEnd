import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ImageDetectionFrontEnd';
  showfooter: boolean;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        console.log(event)
        this.showfooter = event.url.includes('home')? false: true; 
      }
    });
  }

}
