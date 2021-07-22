import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router,  ActivatedRoute} from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  form: FormGroup;
  rolesID:any=[];
  id:number;

  constructor(
    private _roles:RolesService,
    private fb:FormBuilder,
    private _router:Router,
    private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._roles.getRole(this.id).subscribe( (data:any) =>{
      this.rolesID = data;
      console.log( this.rolesID);

      this.form.reset({
        id: this.rolesID.id,
        name: this.rolesID.name
      });

    });
    
    this.createForm();
  }

  get roleValidate(){ return this.form.get('name').invalid && this.form.get('name').touched }

  createForm(){
    this.form = this.fb.group({
      id:'',
      name: ['',Validators.required],
    });
  }

  updateRole(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._roles.updateRole(data).subscribe( (data:any) =>{
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
