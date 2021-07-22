import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {


  form: FormGroup;
  id:number;
  cityID:any = []
  countries:any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private _country:CountriesService,
    private fb: FormBuilder,
    private _city:CitiesService,
    private _router: Router) {}

  ngOnInit(): void {
    this._country.getCountries().subscribe( (data:any) =>{
      this.countries = data;
    });

    this.id = this.rutaActiva.snapshot.params['id'];

    this._city.getCity(this.id).subscribe( (data:any) =>{
      this.cityID = data;

      this.form.reset({
        id: this.cityID.id,
        country_id: this.cityID.country_id,
        city: this.cityID.city
      });

    });

    this.createForm();
  }

  get ciudadValidate(){ return this.form.get('city').invalid && this.form.get('city').touched }
  get countryValidate(){ return this.form.get('country_id').invalid && this.form.get('country_id').touched }

  createForm(){
    this.form = this.fb.group({
      id: '',
      country_id: ['',Validators.required],
      city: ['',Validators.required]
    })
  }

  updatecity(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._city.updateCity(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/ciudades']);
      console.log(data);
    });
  
  }

}
