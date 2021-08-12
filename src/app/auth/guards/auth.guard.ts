import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canLoad(): boolean {

    if(this.auth.isAuthenticated()){
      return true;
    }else{
      console.log("redireccionando al login");
      this.router.navigate(['/login'], {replaceUrl: true});
      return false;
    }

  }

}
