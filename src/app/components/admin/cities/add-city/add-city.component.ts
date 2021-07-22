import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  countries:any = [];
  form: FormGroup;

  constructor(
    private _country: CountriesService,
    private _city: CitiesService,
    private fb: FormBuilder,
    private _activatedR: ActivatedRoute,
    private _router: Router

  ) {}

  ngOnInit(): void {
    this._country.getCountries().subscribe( (data:any) =>{
      this.countries = data;
      console.log(data);
    })

    this.createForm();
  }

  get ciudadValidate(){ return this.form.get('city').invalid && this.form.get('city').touched }
  get countryValidate(){ return this.form.get('country_id').invalid && this.form.get('country_id').touched }

  createForm(){
    this.form = this.fb.group({
      country_id: ['',Validators.required],
      city: ['',Validators.required]
    })
  }

  addcity(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._city.createCity(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/ciudades']);
      console.log(data);
    })
  
  }

}
