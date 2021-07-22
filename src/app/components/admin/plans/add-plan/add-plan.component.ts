import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';
import { PlansService } from 'src/app/services/plans.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  form: FormGroup;
  permisos:any=[];
  checksPermiso:any = [];


  constructor(
    private _plan:PlansService,
    private fb:FormBuilder,
    private _router:Router,
    private _permisos:PermissionService) {}
  

  ngOnInit(): void {
    this._permisos.getPermissions().subscribe((data:any)=>{
      this.permisos=data;
    });

    this.createForm();
  }

  get planValidate(){ return this.form.get('plan').invalid && this.form.get('plan').touched }

  get PermisosArray() {
    return this.form.get('permission_id') as FormArray;
  }

  createForm(){
    this.form = this.fb.group({
      plan: ['',Validators.required],
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
  
  addPlan(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;

    console.log(data);
    
    this._plan.createPlan(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/planes']);
      console.log(data);
    })
  
  }

}
