import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
                      {path:'', component:LoginComponent, canActivate: [AuthGuardService]},
                      {path:'login', component:LoginComponent},
                      {path:'edit-user/:id', component:CreateUserComponent},
                      {path:'user', component:UserComponent},
                      {path:'add-user', component:CreateUserComponent},
                      {path: 'contacts', component: ContactsComponent},
                      {path: 'edit-contact/:id', component: CreateContactComponent},
                      {path:'create-contact', component:CreateContactComponent},
                      {path:'register', component:RegisterComponent},
                      {path: 'users', component: UsersComponent},
                      {path:'**', component:LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
