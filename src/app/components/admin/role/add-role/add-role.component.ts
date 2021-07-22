import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  form: FormGroup;
  // formData: FormData = new FormData();
  permisos:any=[];
  checksPermiso:any = [];

  constructor(
    private _roles:RolesService,
    private fb:FormBuilder,
    private _router:Router,
    private _permisos:PermissionService) {}

  ngOnInit(): void {
    this._permisos.getPermissions().subscribe((data:any)=>{
      this.permisos=data;
    });

    this.createForm();
  }

  get roleValidate(){ return this.form.get('name').invalid && this.form.get('name').touched }

  get PermisosArray() {
    return this.form.get('permission_id') as FormArray;
  }

  createForm(){

    this.form = this.fb.group({
      name: ['',Validators.required],
      permission_id: this.fb.array(this.checksPermiso,Validators.required),
    });
  }

  choosePermiso($event){

    let changeBoolean = $event.target.checked;

    let getCheckValue = $event.target.value;
    let index = this.checksPermiso.indexOf( getCheckValue );

    if( changeBoolean === true ){
      this.PermisosArray.push(  this.fb.control( getCheckValue )  );
    } else {
      this.PermisosArray.removeAt(index) ;
    }

  }

  addRole(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;

    console.log(data);
    
    this._roles.createRole(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/Roles']);
      console.log(data);
    })
  
  }

}
