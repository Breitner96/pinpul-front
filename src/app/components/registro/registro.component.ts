import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ANGULAR_IMG, DIR_IMG } from '../../config/config';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  typeDocuments:any = [];
  roles:any = [];
  countries:any = [];
  cities:any = [];
  plans:any = [];
  form:FormGroup;

  checkDefault:boolean;

  // _angularImg = ANGULAR_IMG;
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor( 
    private fb:FormBuilder,
    private _login: LoginService,
    private _router:Router ) {

      

      if( sessionStorage.getItem('checkProvider') ){
        this.checkDefault = true;
        this.form.reset({
          type_user: this.checkDefault,
        })
      } else {
        this.checkDefault = false;
      }
  }

  get nameValidate() { return this.form.get('name').invalid && this.form.get('name').touched }
  get emailValidate() { return this.form.get('email').invalid && this.form.get('email').touched }
  get passwordValidate() { return this.form.get('password').invalid && this.form.get('password').touched }
  get parsswordConfirmValidate() { return this.form.get('password_confirmation').invalid && this.form.get('password_confirmation').touched }

  createForm(){
    this.form = this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      password_confirmation: ['',Validators.required],
      type_user: ['']
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  registerProvider(){
    let data = this.form.value;

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    this._login.singUp(data).subscribe( (data:any) =>{
      console.log(data);
      this._router.navigate(['/login']);
      
      if(data){
        Swal.fire({
          title: `El registro fue exitoso, inicia sesión`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
    });

  }

}
