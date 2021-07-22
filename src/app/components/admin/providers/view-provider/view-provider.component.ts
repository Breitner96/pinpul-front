import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';

import { DIR_DOCUMENTS } from '../../../../config/config';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.css']
})
export class ViewProviderComponent implements OnInit {

  providers:any=[];
  id:number;
  countriesid:string="";
  citiesid:string="";
  documents:any = [];

  rootDocuments = DIR_DOCUMENTS;

  constructor(
    private _providers:ProvidersService,
    private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._providers.getProvider(this.id).subscribe((data:any)=>{
      this.providers = data;

      this.documents = data.documents;
      
      for (let i = 0; i < this.providers.countries.length; i++) {
        this.countriesid=this.providers.countries[i].country+", "+ this.countriesid;
      }

      for (let i = 0; i < this.providers.cities.length; i++) {
        this.citiesid=this.providers.cities[i].city+", "+ this.citiesid;
      }

      this.funcountries(this.countriesid);
      this.funcities(this.citiesid);
      this.view(data);

    });
  }

  faceon:boolean=false;
  twion:boolean=false;
  inston:boolean=false;
  linkon:boolean=false;
  webon:boolean=false;
  paises:string="";
  ciudades:string="";

  DownloadDocumentprovider(id){
  }

  funcountries(valor:string){
    this.paises=valor.slice(0,-2); 
    console.log(this.paises);
  }

  funcities(valor:string){
    this.ciudades=valor.slice(0,-2); 
    console.log(this.ciudades);
  }

  view(data:any){

    if(data.facebook_url == "null" || data.facebook_url == null){
      this.faceon=false;
      console.log("face vacio");
    } else{
      this.faceon=true;
    }

    if(data.twitter_url == "null" || data.twitter_url == null){
      this.twion=false;
    } else{
      this.twion=true;
    }

    if(data.instagram_url == "null" || data.instagram_url == null){
      this.inston=false;
    } else{
      this.inston=true;
    }
    

    if(data.linkedin_url == "null" || data.linkedin_url == null){
      this.linkon=false;
    } else{
      this.linkon=true;
    }

    if(data.web_site == "null" || data.web_site == null){
      this.webon=false;
    } else{
      this.webon=true;
    }
    
  }

}
