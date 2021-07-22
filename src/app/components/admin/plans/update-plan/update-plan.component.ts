import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {

  form: FormGroup;
  id:number;
  planID:any = []

  constructor(
    private _plan:PlansService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private _router:Router) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._plan.getPlan(this.id).subscribe( (data:any) =>{
      this.planID = data;

      this.form.reset({
        id: this.planID.id,
        indicator: this.planID.plan
      });

    });
    
    this.createForm();
  }

  get planValidate(){ return this.form.get('plan').invalid && this.form.get('plan').touched }


  createForm(){
    this.form = this.fb.group({
      id: '',
      plan: ['',Validators.required]
    });
  }

  updatePlan(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    // console.log(data);
    this._plan.updatePlan(data).subscribe( (data:any) =>{
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
