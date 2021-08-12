import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import swal from 'sweetalert2';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  loading: boolean = true;
  listHeroes: HeroeModel[] = [];
  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit() {

    this.heroesService.getHeroes()
        .subscribe(heroes => {
          this.listHeroes = heroes;
          this.loading = false;
        });

  }

  borrarHeroe(heroe: HeroeModel, index: number){

    swal({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
        if(resp.value){

          this.heroesService.borrarHeroe(heroe.id)
              .subscribe();
          this.listHeroes.splice(index, 1)

        }
    });

  }

}
