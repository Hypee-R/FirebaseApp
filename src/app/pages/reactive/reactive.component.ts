import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegExp } from '../../resources/reg-Exp.model';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;
  constructor(
    private regExp: RegExp,
    private _formBuilder: FormBuilder,
    private validators: ValidatorsService
  ) {
    this.initForm();
    this.estableceDataAlForm();
    this.estableceListeners();
  }

  ngOnInit() {
  }

  get arrPasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }

  get validaNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get validaApellidos(){
    return this.form.get('apellidos').invalid && this.form.get('apellidos').touched;
  }

  get validaEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get validaUsuario(){
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  get validaPassword(){
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get validaRepitePassword(){
    const pass1 = this.form.get('password').value;
    const pass2 = this.form.get('repitePass').value;
    return pass1 === pass2 ? false : true;
  }

  get validaDistrito(){
    return this.form.get('direccion.distrito').invalid && this.form.get('direccion.distrito').touched;
  }

  get validaCiudad(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  initForm(){
    this.form = this._formBuilder.group({
      nombre    : ['', [Validators.required, Validators.minLength(4)] ],
      apellidos : ['', [Validators.required, Validators.minLength(4), this.validators.noAltamirano] ],
      email     : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario   : ['', [Validators.required], this.validators.existeUsuario],
      password  : ['', [Validators.required, Validators.minLength(8)]],
      repitePass: ['', [Validators.required]],
      direccion: this._formBuilder.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required]
      }),
      pasatiempos: this._formBuilder.array([])
    },{
      validators: [this.validators.passwordsIguales('password', 'repitePass')]
    });
  }

  estableceDataAlForm(){
    //Con cualquiera de los dos se establece información, la diferencia es que set value
    //requiere todos los atributos y reset solo los que quieras asignar
    //this.form.setValue({
    this.form.reset({
      nombre: 'Aralia',
      apellidos: 'Payán',
      email: 'ara@gmail.com',
      password: '12345678',
      repitePass: '12345678',
      direccion: {
        distrito: "Mexico",
        ciudad: "Puebla"
      }
    });
    ['Comer', 'Dormir', 'Jugar'].forEach(valor => this.arrPasatiempos.push( this._formBuilder.control(valor) ))
  }

  estableceListeners(){
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    })

    this.form.statusChanges.subscribe(status =>{
      console.log(status);
    });

    this.form.get('nombre').valueChanges.subscribe(valueNombre => {
      console.log(valueNombre);
    });
  }

  agregarPasatiempo(){
    this.arrPasatiempos.push(this._formBuilder.control('') );
  }

  eliminarPasatiempo(index: number){
    this.arrPasatiempos.removeAt(index);
  }

  guardar(){
    console.log(this.form);

    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched())
        }else{
          control.markAsTouched();
        }
      });
    }

    this.form.reset();

  }

}
