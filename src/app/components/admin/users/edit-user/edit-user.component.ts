import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UsersService } from 'src/app/services/users.service';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import { RolesService } from 'src/app/services/roles.service';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  id:number;
  usersID:any = []
  cities:any=[];
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
    private rutaActiva: ActivatedRoute,
    private _roles: RolesService,
    private _permissions: PermissionService) {}
  
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

    this._permissions.getPermissions().subscribe((data:any)=>{
      this.permissions = data;
    });

    this.id = this.rutaActiva.snapshot.params['id'];
    
    this._users.getUser(this.id).subscribe((data:any)=>{

      // console.log(data.permissions);

      data.permissions.map( (element:any) =>{
        this.checkPermissions.push( element.name );
      });

      // console.log(this.checkPermissions);
      this.usersID = data;

      this.form.reset({
        id: this.usersID.id,
        country_id: this.usersID.country_id,
        city_id: this.usersID.city_id,
        type_document_id: this.usersID.type_document_id,
        name: this.usersID.name,
        last_name: this.usersID.last_name,
        email: this.usersID.email,
        dni: this.usersID.dni,
        phone: this.usersID.phone,
        password: this.usersID.password,
        rol_id: this.usersID.rol[0].name,
        permission: this.checkPermissions
      });
    });
  
    this.createForm();
  }

  get countryValidate(){ return this.form.get('country_id').invalid && this.form.get('country_id').touched }
  get cityValidate(){ return this.form.get('city_id').invalid && this.form.get('city_id').touched }
  get typedocumentValidate(){ return this.form.get('type_document_id').invalid && this.form.get('type_document_id').touched }
  get nameValidate(){ return this.form.get('name').invalid && this.form.get('name').touched }
  get lastnameValidate(){ return this.form.get('last_name').invalid && this.form.get('last_name').touched }
  get emailValidate(){ return this.form.get('email').invalid && this.form.get('email').touched }
  get dniValidate(){ return this.form.get('dni').invalid && this.form.get('dni').touched }
  get phoneValidate(){ return this.form.get('phone').invalid && this.form.get('phone').touched }
  get rolValidate(){ return this.form.get('rol_id').invalid && this.form.get('rol_id').touched }

  get permissionsArray() {
    return this.form.get('permission') as FormArray;
  }

  createForm(){
    this.form = this.fb.group({
      id:'',
      // country_id: ['',Validators.required],
      // city_id: ['',Validators.required],
      // type_document_id: ['',Validators.required],
      name: [''],
      // last_name: ['',Validators.required],
      email: ['',Validators.required],
      // dni: ['',Validators.required],
      // phone: ['',Validators.required],
      password: [''],
      rol_id: ['',Validators.required],
      permission: [''],
    });
  }

  choosePermissions($event){
    if( $event.target.checked ){
      this.checkPermissions.push( $event.target.value );
    } else {
      this.checkPermissions.splice( $event.target.checked, 1 );
    }
  }
  
  update_user(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    console.log(data);
    this._users.updateUser(data).subscribe( (data:any) =>{
      console.log(data);
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/usuarios']);
    });

  }

}
