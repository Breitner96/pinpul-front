import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { TypeCompaniesService } from 'src/app/services/type-companies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-type-company',
  templateUrl: './update-type-company.component.html',
  styleUrls: ['./update-type-company.component.css']
})
export class UpdateTypeCompanyComponent implements OnInit {

  form: FormGroup;
  id:number;
  companyID:any = []

  constructor(private _company:TypeCompaniesService,private fb:FormBuilder,
    private rutaActiva: ActivatedRoute, private _router:Router) { 

      this.id = this.rutaActiva.snapshot.params['id'];

      this._company.getTypeCompany(this.id).subscribe( (data:any) =>{
        this.companyID = data;
        console.log( this.companyID);
  
        this.form.reset({
          id: this.companyID.id,
          type_company: this.companyID.type_company
        });
  
      })
      
      this.createForm();


    }

  ngOnInit(): void {
  }

  get companyValidate(){ return this.form.get('type_company').invalid && this.form.get('type_company').touched }


  createForm(){
    this.form = this.fb.group({
      id: '',
      type_company: ['',Validators.required]
    });
  }

  updateCompany(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    // console.log(data);
    this._company.updateTypeCompany(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/type-company']);
      console.log(data);
    })

  }

}
