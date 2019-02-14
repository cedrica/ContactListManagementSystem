import { Component } from '@angular/core';
import { HttpProviders } from './service/http-providers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContactListManagementSystem';
  constructor(private httpProviders:HttpProviders){
    console.log('app.component');
   // this.isLogin = navParams.get('isLogin');
  }


  isLoginChange(event) {
    console.log(event);
  }
}
