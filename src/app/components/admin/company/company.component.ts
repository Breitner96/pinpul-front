import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  localIDProvider:any = localStorage.getItem('provider_id');
  providerID:any = [];
  countries:any = [];
  cities:any = [];
  countriesByComa:any;
  citiesByComa:any;

  constructor(
    private _provider: ProvidersService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._provider.getProvider( this.localIDProvider ).subscribe( (data:any) =>{
      console.log(data);
      this.providerID = data;

      // if(this.providerID.state == 'activo'){

      // }

      // if( data.length > 0 ){
      //   this.providerID = data;

      //   if( data.countries.length > 0 ){
      //     data.countries.map((element: any) => {
      //       this.countries.push(` ${element.country}`);
      //     });
      //     this.countriesByComa = this.countries.toString();
      //   }
  
      //   if( data.cities.length > 0 ){
      //     data.cities.map((element: any) => {
      //       this.cities.push(` ${element.city}`);
      //     });
      //     this.citiesByComa = this.cities.toString();
      //   }
      // }
      
      // else {
      //   this._router.navigate(['/admin/dashboard']);
      //   Swal.fire({
      //     icon: 'warning',
      //     title: `Sentimos la molestia`,
      //     text: `${data.message}`,
      //   });
      // }

    });
  }

}
