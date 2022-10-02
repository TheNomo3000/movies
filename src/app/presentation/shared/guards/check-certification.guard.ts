import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../../../domain/models/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class CheckCertificationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const type = localStorage.getItem('userType');
    if (type != null && type !== undefined) {
      return true;
    }
    return this.router.navigateByUrl('/home');
  }

}
