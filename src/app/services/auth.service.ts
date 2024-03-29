import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = 'AIzaSyAWptfIF3ZuFrfVCVxI-88L6Hodgh5aPe8';
  private userToken: string;
  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //LogIn
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(
    private http: HttpClient
  ) {
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }:signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken'], resp['expiresIn']);
        return resp
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }:signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp['idToken'], resp['expiresIn']);
        return resp
      })
    );

  }

  private guardarToken(idToken: string, expiresIn: number){
    this.userToken = idToken;
    localStorage.setItem('token', this.userToken);

    let hoy = new Date();
    hoy.setSeconds(expiresIn);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated() : boolean{
    if(this.userToken.length < 2){
      return false;
    }

    const expira = Number.parseInt(localStorage.getItem('expira'));
    const expiraDate = new Date(expira);

    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }
  }
}
