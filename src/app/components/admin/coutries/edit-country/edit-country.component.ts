import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {

  form: FormGroup;
  id:number;
  countryID:any = []

  constructor(
    private rutaActiva: ActivatedRoute,
    private _country:CountriesService,
    private fb: FormBuilder,
    private _router: Router) {}

  ngOnInit(): void {

    this.id = this.rutaActiva.snapshot.params['id'];

    this._country.getCountry(this.id).subscribe( (data:any) =>{
      this.countryID = data;
      console.log( this.countryID);

      this.form.reset({
        id: this.countryID.id,
        indicator: this.countryID.indicator,
        country: this.countryID.country
      });
    });
    
    this.createForm();

  }

  get indicatorValidate(){ return this.form.get('indicator').invalid && this.form.get('indicator').touched }
  get countryValidate(){ return this.form.get('country').invalid && this.form.get('country').touched }

  createForm(){
    this.form = this.fb.group({
      id: '',
      indicator: ['',Validators.required],
      country: ['',Validators.required]
    });
  }

  updateCountry(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    // console.log(data);
    this._country.updateCountry(data).subscribe( (data:any) =>{
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
