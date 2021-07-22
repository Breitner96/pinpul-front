import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-permiso',
  templateUrl: './edit-permiso.component.html',
  styleUrls: ['./edit-permiso.component.css']
})
export class EditPermisoComponent implements OnInit {

  
  form: FormGroup;
  permisosID:any=[];
  id:number;

  constructor(private _permissions:PermissionService,private fb:FormBuilder, private _router:Router,  private rutaActiva: ActivatedRoute) { 

    this.id = this.rutaActiva.snapshot.params['id'];

    this._permissions.getPermission(this.id).subscribe( (data:any) =>{
      this.permisosID = data;
      console.log( this.permisosID);

      this.form.reset({
        id: this.permisosID.id,
        name: this.permisosID.name
      });

    })
    
    this.createForm();

  }

  ngOnInit(): void {
  }

  get permisoValidate(){ return this.form.get('name').invalid && this.form.get('name').touched }

  createForm(){
    this.form = this.fb.group({
      id:'',
      name: ['',Validators.required],
    });
  }

  updatepermiso(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._permissions.updatePermission(data).subscribe( (data:any) =>{
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
