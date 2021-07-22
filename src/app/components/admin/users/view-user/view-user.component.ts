import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  users:any=[];
  cities:any=[];
  countries:any=[];
  id:number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private _users:UsersService,
    private _cities:CitiesService,
    private _countries:CountriesService) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._cities.getCity(this.id).subscribe((data:any)=>{
      this.cities = data;
    });

    this._countries.getCountry(this.id).subscribe((data:any)=>{
      this.countries = data;
    });

    this._users.getUser(this.id).subscribe((data:any)=>{
      this.users = data;
    });
  }

}
