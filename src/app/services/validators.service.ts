import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor(){}

  noAltamirano( control: FormControl): ErrorValidate {

    if(control.value.toLowerCase() === 'altamirano'){
      return {
        noAltamirano: true
      }
    }

    return null;
  }

  existeUsuario( control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    return new Promise( (resolve, reject) => {

      setTimeout(() => {

        if(control.value == 'hyper'){
          resolve({existe: true})
        }else{
          resolve(null);
        }

      }, 3500);

    });

  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({ noEsIgual: true })
      }

    }

  }

}
