import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { HttpProviders } from './service/http-providers.service';
import { LogoutBarComponent } from './logout-bar/logout-bar.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutBarComponent,
    CreateContactComponent,
    ContactsComponent,
    ContactComponent,
    CreateUserComponent,
    UsersComponent,
    UserComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, HttpProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
