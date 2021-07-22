import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-permiso',
  templateUrl: './add-permiso.component.html',
  styleUrls: ['./add-permiso.component.css']
})
export class AddPermisoComponent implements OnInit {

  form: FormGroup;


  constructor(private _permissions:PermissionService,private fb:FormBuilder, private _router:Router) { 

    this.createForm()
  }

  ngOnInit(): void {
  }

  get permisoValidate(){ return this.form.get('name').invalid && this.form.get('name').touched }

  createForm(){
    this.form = this.fb.group({
      name: ['',Validators.required],
    });
  }

  addpermiso(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._permissions.createPermission(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/Permisos']);
      console.log(data);
    })
  
  }

}
