import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { ANGULAR_IMG, DIR_IMG } from '../../config/config';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // categories:any = [];
  
  form: FormGroup;
  permissions:any = [];
  @Input() rol: string;

  // _angularImg = ANGULAR_IMG;
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;


  constructor( 
    private _auth: LoginService,
    private fb: FormBuilder,
    private _router:Router ) {
    this.createForm();
  }

  ngOnInit(): void {}

  // get emailValidate(){
  //   return this.form.get('email').invalid && this.form.get('email').touched
  // }
  get emailValidate(){ return this.form.get('email').invalid && this.form.get('email').touched }

  get passwordValidate(){ return this.form.get('password').invalid && this.form.get('password').touched }

  createForm(){
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  login(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    // console.log(data);
    this._auth.signIn(data).subscribe( (data:any) =>{


      localStorage.setItem('access_token', data.access_token);
      // localStorage.setItem('expires_in', data.expires_in);
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('user_name', data.user.name);

      /* Rol */
      localStorage.setItem('VLHAZGTXBI', data.rol[0].name);

      if(data){
        Swal.fire({
          title: data.error,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      
      if( localStorage.getItem('access_token') ){
        setTimeout( () => {
          localStorage.removeItem('access_token');
          Swal.fire({
            title: `Su sesión ha caducado`,
            confirmButtonText: 'Cerrar'
          });
          this._router.navigateByUrl('/login');
        }, 3600000); // 1 hora = 3600000
      }

      // data.permissions.map( (element:any) =>{
      //   this.permissions.push( element.name );
      // });

      /* Permisos */
      // localStorage.setItem('SB177IRHUL', JSON.stringify(this.permissions) );
      
      this._router.navigate(['/admin/dashboard']);
      if(data){
        Swal.fire({
          title: `Ingreso correcto`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      
    });
  }

}
