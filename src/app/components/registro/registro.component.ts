import { Component, OnInit } from '@angular/core';
import { EmailsService } from 'src/app/services/emails.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import { CountriesService } from 'src/app/services/countries.service';
import { CitiesService } from 'src/app/services/cities.service';
import { RolesService } from 'src/app/services/roles.service';
import { PlansService } from 'src/app/services/plans.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ANGULAR_IMG } from '../../config/config';

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

  _angularImg = ANGULAR_IMG;

  constructor( 
    private fb:FormBuilder,
    private _typeDocument: TypeDocumentsService,
    private _roles: RolesService,
    private _countries: CountriesService,
    private _cities: CitiesService,
    private _plans: PlansService,
    private _login: LoginService,
    private _router:Router ) {

      this.createForm();

      if( sessionStorage.getItem('checkProvider') ){
        this.checkDefault = true;
        this.form.reset({
          type_user: this.checkDefault,
        })
      } else {
        this.checkDefault = false;
      }


      console.log( this.checkDefault )



      // this._typeDocument.getTypeDocuments().subscribe( (data:any) =>{
      //   this.typeDocuments = data;
      // });

      // this._roles.getRoles().subscribe( (data:any) =>{
      //   this.roles = data;
      // });

      // this._countries.getCountries().subscribe( (data:any) =>{
      //   this.countries = data;
      // });

      // this._cities.getCities().subscribe( (data:any) =>{
      //   this.cities = data;
      // });

      // this._plans.getPlans().subscribe( (data:any) =>{
      //   this.plans = data;
      // });

      


      

  }

  createForm(){
    this.form = this.fb.group({
      // name: ['',Validators.required],
      // proveedor: ['',Validators.required],
      // type_document_id: ['',Validators.required],
      // num_document: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      type_user: [''],
      // type_user: ['',Validators.required],
      // plan_id: ['',Validators.required],
      // country_id: ['',Validators.required],
      // city_id: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  registerProvider(){
    let data = this.form.value;

    console.log(data);
    // return;

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
