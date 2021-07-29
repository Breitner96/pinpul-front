import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  countries:any = [];
  cities:any = [];
  searchCity:any;

  constructor(
    private _country: CountriesService,
    private _city: CitiesService
  ) {}

  ngOnInit(): void {
    this.listCities();
  }

  listCities(){
    this._city.getCities().subscribe( (data:any) =>{
      this.cities = data;
      console.log(data);
    });
  }

  getCityByWord(){

  }

  deleteCity(id){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si lo eliminas perderás toda la información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Se ha eliminado la categoria',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this._city.deleteCity(id).subscribe( (data:any) =>{
          this.listCities();
          console.log(data);
        })
      }
    });
  }


}
