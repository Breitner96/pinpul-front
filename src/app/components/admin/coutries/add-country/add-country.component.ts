import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _counrty: CountriesService,
    private _router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  get indicatorValidate(){ return this.form.get('indicator').invalid && this.form.get('indicator').touched }
  get countryValidate(){ return this.form.get('country').invalid && this.form.get('country').touched }


  createForm(){
    this.form = this.fb.group({
      indicator: ['',Validators.required],
      country: ['',Validators.required]
    })
  }

  addCountry(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._counrty.createCountry(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/paises']);
    });
  
  }
  
}
