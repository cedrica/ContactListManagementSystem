import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';
import { HttpProviders } from '../service/http-providers.service';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {


    createUserForm: FormGroup;
    user: any;
    mode:string;
    isEditMode:boolean = false;
    toEditUser:any;
    public hasRoleError:boolean;
    public roles = ['admin','user']
    constructor(
        private formBuilder: FormBuilder,
        private httpProviders: HttpProviders,
        private route:Router,
        private http: HttpClient,
        private activatedRoute: ActivatedRoute) 
    {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.isEditMode = id != null && id.length > 0 ? true:false;
        if(id != null && id.length > 0){
            this.mode = 'Edit user';
            this.httpProviders.findUserById(id).subscribe(
                response => {
                    this.toEditUser = response.user;
                    console.log('to edited user: '+JSON.stringify(response.user));
                    if(this.toEditUser != null){
                        this.createUserForm.patchValue({
                            firstName: this.toEditUser[0].firstName,
                            lastName: this.toEditUser[0].lastName,
                            email: this.toEditUser[0].email,
                            password: this.toEditUser[0].password,
                            confirmPassword: this.toEditUser[0].password,
                            role: this.toEditUser[0].role,
                            image: this.toEditUser[0].image
                        });
                    }
                }
            );
           
        }
    }

    validateRole(event): void {
      console.log(event.target.value);
      if (event.target.value == 'default') {
        this.hasRoleError = true;
      } else {
        this.hasRoleError = false;
      }
    }
    passwordMatcher(c: AbstractControl) {
        let password = c.get('password').value;
        let confirmPassword = c.get('confirmPassword').value;
         if(password != confirmPassword) {
             c.get('confirmPassword').setErrors( {ConfirmPassword: true} );
         } else {
             return null
         }
  
    }

    roleValidator(c: AbstractControl) {
        // RFC 2822 compliant regex
        if (c.get('role') != null && c.get('role').value  == 'default') {
            c.get('role').setErrors( {role: true} );
        } else {
            return null;
        }
    }

      
    ngOnInit() {
      this.createUserForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9\-\.]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})$')]],
            password: ['', [Validators.required]],
            confirmPassword: ['', Validators.required],
            role: ['',  [Validators.required, this.roleValidator]],
            image:['', []]
        }, {validator: this.passwordMatcher});
    }

    // convenience getter for easy access to form fields
    get f() { return this.createUserForm.controls; }
    navigateToLogin(){
        this.route.navigate(['/login']);
    }
    selectedFile:File;
    onSelectFile(event){
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }
    uploadImage(){
        var fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);
        const progress = new Subject<number>();
        this.http.post("http://127.0.0.1:3000/fileUpload",fd).subscribe(response => {
           console.log('file uploaded ==== '+response);
        });
    }

    onSubmit() {
        if (this.createUserForm.invalid) {
            return;
        }
        let image = (this.createUserForm.value.image)? this.createUserForm.value.image.split("\\")[2]:"";
        
        console.log("image == "+image);
        this.createUserForm.value.image = image;
        if(this.isEditMode){
            // Use this lamda operator and not function (response: any) {...
            // otherwise all variable call inside functionsbracket will not be reconnized
            this.httpProviders.httpReq("/updateUser","PUT",this.createUserForm.value,null).subscribe(response =>{
                if(response.status == "Success"){
                    alert("You have successfully Signed up!");
                    this.route.navigate(['/users']);
                }
                else{
                    alert("Error Message : \n"+response.message);
                }
            });
        } else {
            // Use this lamda operator and not function (response: any) {...
            // otherwise all variable call inside functionsbracket will not be reconnized
            this.httpProviders.httpReq("/user","POST",this.createUserForm.value,null).subscribe(response =>{
                if(response.status == "Success"){
                    alert("You have successfully Signed up!");
                    this.navigateToLogin();
                }
                else{
                    alert("Error Message : \n"+response.message);
                }
            });
        }
        
    }
}