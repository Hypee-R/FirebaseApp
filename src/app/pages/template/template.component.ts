import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegExp } from 'src/app/resources/reg-Exp.model';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Luis',
    apellidos: 'Altamirano',
    email: 'luis@gmail.com',
    pais: 'MEX',
    genero: ''
  };
  paises: any[] = [];
  constructor(
    public regExp: RegExp,
    private paisService: PaisService
  ) { }

  ngOnInit() {
    this.paisService.getPaises()
    .subscribe(paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: 'Seleccione un pais...',
        codigo: ''
      });
      // console.log(this.paises);
    });
  }

  guardar(form: NgForm){
    console.log("submit disparado");
    console.log(form);
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
    console.log(form.value);

  }

}
