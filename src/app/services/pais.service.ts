import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private http: HttpClient
  ) { }

  getPaisesManera1(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map( //funcion map de rxjs
        (resp:any[]) => {
          return resp.map( //funcion map de un arreglo o lista
            pais => {
              return {
                nombre: pais.name,
                codigo: pais.alpha3Code
              }
          })
      })
    );
  }

  getPaises(){

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
      map( (resp:any[]) =>
          resp.map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code })
        )
      )
    );

  }
}
