import { Component, OnInit } from '@angular/core';
import { HttpProviders } from '../service/http-providers.service';
import { IUser } from './IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any[];
  public loggedRole: string;
  public loggedUser: any;

  constructor(private http:HttpProviders, private router:Router) { 
    this.findAllUser();
    this.loggedRole = this.http.findLoggedRole();
    if(this.loggedRole == 'user'){
      this.router.navigate(['/login']);
    }
    this.loggedUser = localStorage.getItem('loggedUser');
  }

  ngOnInit() {

  }

  findAllUser(){
      this.http.httpReq('/users','GET',null,null).subscribe(response => {
        if(response.status == "Success"){
          this.users = response.users;
        }else{
          alert("Error Message : \n"+response.message);
        }
      });
  }

  deleteUser(user){
    if(confirm("Are you sure to delete the user: "+user.lastName+ " "+user.firstName)) {
      this.http.httpReq('/user','DELETE',user,null).subscribe(response => {
        if(response.status == "Success"){
          console.log('user deleted');
          
          this.findAllUser();
        }else{
          alert("Error Message : \n"+response.message);
        }
      });
    }
    
  }
}
