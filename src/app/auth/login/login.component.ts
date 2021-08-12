import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onSubmit(form: NgForm){
    if(form.invalid){ return; }

    swal({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    swal.showLoading();

    this.auth.login(this.usuario)
    .subscribe( resp => {

      console.log(resp);
      swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, (err)=> {
      console.log(err.error.error.message);
      swal({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    })

  }

}
