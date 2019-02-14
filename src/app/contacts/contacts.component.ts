import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviders } from '../service/http-providers.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  
    contacts:any;
    public loggedRole: string;
    public loggedUser: any;
  
    constructor(private http:HttpProviders, private router:Router) { 
      this.findAllContact();
      this.loggedRole = this.http.findLoggedRole();
      this.loggedUser = localStorage.getItem('loggedUser');
    }
  
    ngOnInit() {
    }
  
    findAllContact(){
        this.http.httpReq('/contacts','GET',this.loggedUser,null).subscribe(response => {
          if(response.status == "Success"){
            this.contacts = response.users;
          }else{
            alert("Error Message : \n"+response.message);
          }
        });
      
    }
  
    deleteContact(contact){
      if(confirm("Are you sure to delete the contact: "+contact.lastName+ " "+contact.firstName)) {
        this.http.httpReq('/contact','DELETE',contact,null).subscribe(response => {
          if(response.status == "Success"){
            console.log('contact deleted');
            this.findAllContact();
          }else{
            alert("Error Message : \n"+response.message);
          }
        });
      }
    
    }
  }
  