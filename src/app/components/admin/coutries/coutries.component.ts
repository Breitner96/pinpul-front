import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-coutries',
  templateUrl: './coutries.component.html',
  styleUrls: ['./coutries.component.css']
})
export class CoutriesComponent implements OnInit {

  paises:any = [];

  constructor( private _pais:CountriesService) {}

  ngOnInit(): void {
    this.listCountries();
  }

  listCountries(){
    this._pais.getCountries().subscribe( (data:any) =>{
      this.paises = data;
      console.log(data);
    });
  }


  deleteCountry(id){
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
        
        this._pais.deleteCountry(id).subscribe( (data:any) =>{
          this.listCountries();
          console.log(data);
        })
      }

    });


  }



}
