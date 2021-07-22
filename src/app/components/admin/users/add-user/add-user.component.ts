import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import { RolesService } from 'src/app/services/roles.service';
import { PermissionService } from 'src/app/services/permission.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  form: FormGroup;

  cities:any=[];
  users:any=[];
  countries:any=[];
  type_documents:any=[];
  roles:any = [];
  permissions:any = [];

  checkPermissions:any = [];

  constructor(
    private _cities:CitiesService,
    private _countries:CountriesService,
    private _users:UsersService,
    private fb: FormBuilder,
    private _router:Router,
    private _documents:TypeDocumentsService,
    private _roles: RolesService,
    private _permissions: PermissionService) { }

  ngOnInit(): void {
    this._countries.getCountries().subscribe( (data:any) =>{
      this.countries = data;
    });

    this._cities.getCities().subscribe( (data:any) =>{
      this.cities = data;
    });

    this._documents.getTypeDocuments().subscribe((data:any)=>{
      this.type_documents = data;
    });

    this._roles.getRoles().subscribe((data:any)=>{
      this.roles = data;
    });
    this.createForm();
  }


  // get countryValidate(){ return this.form.get('country_id').invalid && this.form.get('country_id').touched }
  // get cityValidate(){ return this.form.get('city_id').invalid && this.form.get('city_id').touched }

  // get typedocumentValidate(){ return this.form.get('type_document_id').invalid && this.form.get('type_document_id').touched }
  
  get nameValidate(){ return this.form.get('name').invalid && this.form.get('name').touched }
  // get lastnameValidate(){ return this.form.get('last_name').invalid && this.form.get('last_name').touched }
  
  get emailValidate(){ return this.form.get('email').invalid && this.form.get('email').touched }
  // get dniValidate(){ return this.form.get('dni').invalid && this.form.get('dni').touched }
  
  // get phoneValidate(){ return this.form.get('phone').invalid && this.form.get('phone').touched }
  get passwordValidate(){ return this.form.get('password').invalid && this.form.get('password').touched }
  get rolValidate(){ return this.form.get('rol_id').invalid && this.form.get('rol_id').touched }

  // get permissionsArray() {
  //   return this.form.get('permissions') as FormArray;
  // }


  createForm(){
    this.form = this.fb.group({
      // country_id: ['',Validators.required],
      // city_id: ['',Validators.required],
      // type_document_id: ['',Validators.required],
      name: ['',Validators.required],
      // last_name: ['',Validators.required],
      email: ['',Validators.required],
      // dni: ['',Validators.required],
      // phone: ['',Validators.required],
      password: ['',Validators.required],
      rol_id: ['',Validators.required],
      // permissions: this.fb.array([],Validators.required)
    })
  }

  // choosePermissions($event){
  //   let changeBoolean = $event.target.checked;

  //   let getCheckValue = $event.target.value;
  //   let index = this.checkPermissions.indexOf( getCheckValue );

  //   if( changeBoolean === true ){
  //     this.permissionsArray.push(  this.fb.control( getCheckValue )  );
  //   } else {
  //     this.permissionsArray.removeAt(index) ;
  //   }
  // }

  add_user(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._users.createUser(data).subscribe( (data:any) =>{
      console.log(data);
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/usuarios']);
      console.log(data);
    });
  
  }


}
