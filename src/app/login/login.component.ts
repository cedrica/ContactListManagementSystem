import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpProviders } from '../service/http-providers.service';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    page = 'login';
    userNotFound: boolean = true;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router, private httpProviders: HttpProviders) {
            localStorage.setItem('loggedUser', '');
        }

    ngOnInit() {
        console.log('emitted page '+this.page);
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9\-\.]+)@([a-zA-Z0-9\-\.]+)\.([a-zA-Z]{2,5})$')]],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get controls() { return this.loginForm.controls; }
  
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
          console.log('form invalid');
          return;
        }
        this.httpProviders.httpReq("/login","POST",this.loginForm.value,null).subscribe(response => {
            if(response.status == "Success"){
                localStorage.setItem('loggedUser',JSON.stringify(response.user));
                const loggedRole = this.httpProviders.findLoggedRole();
                if(loggedRole == 'admin'){
                    this.router.navigate(['/users']);
                }else if (loggedRole == 'user'){
                    this.router.navigate(['/contacts']);
                }

            } else if(response.status == "Failure") {
                this.userNotFound = false;
                this.router.navigate(['/login']);
                localStorage.setItem('loggedUser','');
            }
        });
    }
}