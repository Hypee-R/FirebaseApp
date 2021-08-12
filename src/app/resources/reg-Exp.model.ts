import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class RegExp{

  public validEmail:string = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";

  constructor(){}
}
