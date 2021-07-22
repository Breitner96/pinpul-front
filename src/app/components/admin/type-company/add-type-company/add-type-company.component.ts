import { Component, OnInit } from '@angular/core';
import { TypeCompaniesService } from 'src/app/services/type-companies.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-type-company',
  templateUrl: './add-type-company.component.html',
  styleUrls: ['./add-type-company.component.css']
})
export class AddTypeCompanyComponent implements OnInit {

  form:FormGroup;

  constructor(private _company:TypeCompaniesService,private fb:FormBuilder, private _router:Router) { 

    this.createForm();
  }

  ngOnInit(): void {
  }

  get companyValidate(){ return this.form.get('type_company').invalid && this.form.get('type_company').touched }

  createForm(){
    this.form = this.fb.group({
      type_company: ['',Validators.required],
    })
  }

  addCompany(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._company.createTypeCompany(data).subscribe( (data:any) =>{
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
