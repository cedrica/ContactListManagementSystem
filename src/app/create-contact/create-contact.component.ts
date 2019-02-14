import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpProviders } from '../service/http-providers.service';
@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
      contactForm: FormGroup;
      user: any;
      createdBy:string;
      isCreateContact:boolean;
      isEditMode:boolean;
      mode:string;
      loggedUser:any;
      toEditContact:any;
      constructor(
          private formBuilder: FormBuilder,
          private httpProviders: HttpProviders,
          private route:Router,
          private activatedRoute: ActivatedRoute) 
      {
          this.isCreateContact = (this.route.url == "/create-contact")? true:false;
          const id = this.activatedRoute.snapshot.paramMap.get('id');
          this.isEditMode = (id != null && id.length > 0)? true:false;
          this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
          this.createdBy = this.loggedUser.email;
          if(this.isCreateContact){
              this.mode = 'Create contact';
          } 
          
          if(this.isEditMode){
              this.mode = 'Edit contact';
              this.httpProviders.findContactById(id).subscribe(
                  response => {
                      this.toEditContact = response.user;
                      console.log('to edited user: '+JSON.stringify(response.user));
                      if(this.toEditContact != null){
                          this.contactForm.patchValue({
                              firstName: this.toEditContact[0].firstName,
                              lastName: this.toEditContact[0].lastName,
                              email: this.toEditContact[0].email,
                              createdBy: this.toEditContact[0].createdBy
                          });
                      }
                  }
              );
             
          }
      }
  
        
      ngOnInit() {
        this.contactForm = this.formBuilder.group({
              firstName: ['', Validators.required],
              lastName: ['', Validators.required],
              email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9\-\.]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})$')]],
              createdBy: ['', []]
          });
      }
  
      // convenience getter for easy access to form fields
      get f() { return this.contactForm.controls; }
      navigateToLogin(){
          this.route.navigate(['/login']);
      }
  
      onSubmit() {
          if (this.contactForm.invalid) {
              return;
          }
          console.log('form valid: '+JSON.stringify(this.contactForm.value));
          if(this.isEditMode){
              this.contactForm.get('createdBy').setValue(this.createdBy);
              // Use this lamda operator and not function (response: any) {...
              // otherwise all variable call inside functionsbracket will not be reconnized
              this.httpProviders.httpReq("/updateContact","PUT",this.contactForm.value,null).subscribe(response =>{
                  if(response.status == "Success"){
                      alert("You have successfully Signed up!");
                      this.route.navigate(['/contacts']);
                  }
                  else{
                      alert("Error Message : \n"+response.message);
                  }
              });
          } else if(this.isCreateContact){
              this.contactForm.get('createdBy').setValue(this.createdBy);
              // Use this lamda operator and not function (response: any) {...
              // otherwise all variable call inside functionsbracket will not be reconnized
              this.httpProviders.httpReq("/createContact","POST",this.contactForm.value,null).subscribe(response =>{
                  if(response.status == "Success"){
                      alert("You have successfully Signed up!");
                      this.route.navigate(['/contacts']);
                  }
                  else{
                      alert("Error Message : \n"+response.message);
                  }
              });
          }
  
      }
  }