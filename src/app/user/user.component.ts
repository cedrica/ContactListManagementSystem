import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpProviders } from '../service/http-providers.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  public user:any;
  role:string;
  loggedUser:any;
  constructor(private router:Router, private activatedDroute:ActivatedRoute, private http:HttpProviders) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'))[0];
    this.activatedDroute.queryParams.subscribe(
      param => {
        this.role = param.role;
      }
    );
   }

  ngOnInit() {
  }
  reloadImage(){
    this.http.findUserById(this.loggedUser._id).subscribe(
      response => {
        console.log('relaoded user = '+ JSON.stringify(response.user));
        this.loggedUser = response.user[0];
        localStorage.setItem('loggedUser',JSON.stringify(response.user));
      }
    );
  }
  goback(){
    let to = (this.role === 'admin')? '/users':'/contacts';
    this.router.navigate([to]);
  }

  setUser(user:any){
    this.user = user;
  }
}
