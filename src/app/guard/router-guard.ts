import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// Use to redirect to a page in case of wrong url

@Injectable ()

export class RouterGaurds implements CanActivate {
  constructor(private _router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +route.url[1].path;
    if(isNaN(id) || id < 1) {
      alert('invalid URL');
      this._router.navigate(['/products']);
      return false;
    }
    return undefined;
  }


}
