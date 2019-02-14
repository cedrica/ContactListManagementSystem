import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpProviders } from '../service/http-providers.service';

@Component({
  selector: 'app-logout-bar',
  templateUrl: './logout-bar.component.html',
  styleUrls: ['./logout-bar.component.css']
})
export class LogoutBarComponent implements OnInit {

  public loggedRole: string;
  loggedUser: any;
  public showNavBar: boolean;

  constructor(location: Location, router: Router, private httpProviders:HttpProviders) {
    router.events.subscribe((val) => {
      this.loggedRole = this.httpProviders.findLoggedRole();
      if(location.path() == '/login' || location.path() == '/register' || location.path() == ''){
        this.showNavBar = true;
      } else {
        this.showNavBar = false;
      }
    });
  }
  ngOnInit() {
  }

}
