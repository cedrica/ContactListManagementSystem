import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';
import { HttpProviders } from '../service/http-providers.service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    roles: string[];
    user: any;
    isAddUser:boolean;
    isEditMode:boolean;
    isRegisterMode:boolean = false;
    mode:string;
    toEditUser:any;
    constructor(
        private formBuilder: FormBuilder,
        private httpProviders: HttpProviders,
        private route:Router,
        private activatedRoute: ActivatedRoute) 
    {
        this.isAddUser = (this.route.url == "/add-user")? true:false;
        this.isRegisterMode = (this.route.url == "/register")? true:false;
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.isEditMode = (id != null && id.length > 0)? true:false;
        if(this.isAddUser){
            this.mode = 'Add user';
        } else if(this.isRegisterMode){
            this.mode = 'Register user';
        }
        console.log('test');
        
        if(this.isEditMode){
            this.mode = 'Edit user';
            this.httpProviders.findUserById(id).subscribe(
                response => {
                    this.toEditUser = response.user;
                    console.log('to edited user: '+JSON.stringify(response.user));
                    if(this.toEditUser != null){
                        this.registerForm.patchValue({
                            firstName: this.toEditUser[0].firstName,
                            lastName: this.toEditUser[0].lastName,
                            email: this.toEditUser[0].email,
                            password: this.toEditUser[0].password,
                            confirmPassword: this.toEditUser[0].password,
                            image: this.toEditUser[0].image
                        });
                        console.log('firstName = '+this.toEditUser[0].firstName);
                    }
                }
            );
           
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
      
    ngOnInit() {
      this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9\-\.]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})$')]],
            password: ['', [Validators.required]],
            confirmPassword: ['', Validators.required],
            role: ['', []],
            image:['', []]
        }, {validator: this.passwordMatcher});
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    navigateToLogin(){
        this.route.navigate(['/login']);
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            return;
        }
        console.log('form valid: '+JSON.stringify(this.registerForm.value));
        if(this.isEditMode){
            const role = this.toEditUser[0].role;
            this.registerForm.get('role').setValue(role);
            // Use this lamda operator and not function (response: any) {...
            // otherwise all variable call inside functionsbracket will not be reconnized
            this.httpProviders.httpReq("/updateUser","PUT",this.registerForm.value,null).subscribe(response =>{
                if(response.status == "Success"){
                    alert("You have successfully Signed up!");
                    this.route.navigate(['/users']);
                }
                else{
                    alert("Error Message : \n"+response.message);
                }
            });
        } else if(this.isAddUser || this.isRegisterMode){
            this.registerForm.get('role').setValue('user');
            // Use this lamda operator and not function (response: any) {...
            // otherwise all variable call inside functionsbracket will not be reconnized
            this.httpProviders.httpReq("/register","POST",this.registerForm.value,null).subscribe(response =>{
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
    hasRoleError: boolean;
    validateRole(event): void {
        if (this.registerForm.controls['role'].value.role == 'default') {
          this.hasRoleError = true;
        } else {
          this.hasRoleError = false;
        }
      }
}