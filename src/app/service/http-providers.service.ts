import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs-compat/operator/map';
import { IUser } from '../users/IUser';

@Injectable()
export class HttpProviders {
    baseurl:string="http://127.0.0.1:3000";
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    constructor(private http: HttpClient){

    }
    httpReq(url: string, method: string, data: any, header: Headers){
        let headers = new Headers();
        console.log('url = '+this.baseurl+url);
        headers.append('Content-Type', 'application/json');
       if (method === 'GET'){ 
            return this.http.get<any>(this.baseurl+url, this.httpOptions)
                        .pipe(catchError(this.handleError));
       } 
        else if (method === 'POST'){ 
            return this.http.post<any>(this.baseurl+url, JSON.stringify(data), this.httpOptions)
                        .pipe(catchError(this.handleError));
        }
        else if (method === 'PUT'){
            return this.http.put<any>(this.baseurl+url, JSON.stringify(data), this.httpOptions)
                        .pipe(catchError(this.handleError));
        }
        else if (method === 'DELETE'){
            return this.http.delete(this.baseurl+url+":"+data._id, this.httpOptions)
                        .pipe(catchError(this.handleError));
        }
    }
    setLocalStaorage(key:string, value:string){
        localStorage.setItem(key,value);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };

      findUserById(id){
        return this.httpReq("/user:"+id,"GET",null,null);
      }
      findContactById(id){
        return this.httpReq("/contact:"+id,"GET",null,null);
      }

      findLoggedRole(){
        let loggedUser = localStorage.getItem('loggedUser');
        console.log('logged user: '+loggedUser);
        const loggedRole =  (loggedUser != null && loggedUser.length > 0)? JSON.parse(loggedUser)[0].role:'';
        return loggedRole;
      }
}
