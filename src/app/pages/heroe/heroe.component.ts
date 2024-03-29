import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  constructor(
    private heroeService: HeroesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo'){

      this.heroeService.getHeroeById(id)
          .subscribe((resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
          });

    }
  }

  guardar(form: NgForm){

    if(form.invalid){
      console.log("formulario no valido");
      return;
    }else{

      swal({
        title: 'Espere',
        text: 'Guardando Información',
        type: 'info',
        allowOutsideClick: false
      });

      swal.showLoading();

      let peticion: Observable<any>;
      if(this.heroe.id){
        peticion = this.heroeService.actualizarHeroe(this.heroe);
      }else{
        peticion = this.heroeService.crearHeroe(this.heroe);
      }

      peticion
      .subscribe(response => {

        swal({
          title: this.heroe.nombre,
          text: 'Se actualizó correctamente',
          type: 'success'
        });

      });

    }



  }

}
