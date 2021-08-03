import { Component, OnInit, HostListener } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { DIR_IMG } from '../../config/config';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';

// import {HostListener, KeyboardEvent} from '@angular/core';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categories: any = [];
  providers: any = [];
  providersState: any = [];
  rootImage = DIR_IMG;
  slug: any;
  allpost:any = [];
  notEmptyPost = true;
  notscrolly = true;
  sizedata;
  categoriaP:any = [];
  cities:any = [];
  countries:any = [];

  downCategories:boolean = false;

  constructor(
    private _categories: CategoriesService,
    private _providers: ProvidersService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private _cities: CitiesService,
    private _countries: CountriesService,
    private _activateR: ActivatedRoute) {
    // this.slug = this._activateR.snapshot.params['name'];
    // this.listProviders();
    // this.listCategories();
    // this.loadInitPost();
  }

  ngOnInit(): void {

    this._categories.getCategories().subscribe( (data:any) =>{
      this.categories = data;
    });

    this._cities.getCities().subscribe( (data:any) =>{
      this.cities = data;
    });

    this._countries.getCountries().subscribe( (data:any) =>{
      this.countries = data;
    });

    this._activateR.params.subscribe(
      (params: Params) => {
        this.slug = params.name;

        this._categories.getCategoryBySlug(this.slug).subscribe( (data:any) =>{
          console.log(data);
          if(data){
            this.allpost = data.providers;
            this.categoriaP = data.categories;
          } else {
            this.allpost = 0;
          }
        });
      }
    );

    // document.querySelector(':not(body)').addEventListener('click',()=>{
    //   console.log( document.querySelector('body') );
    // })

  }

  // filterCategory(){
  //   let ctCategories = document.querySelector('.content-categories');
  //   ctCategories.classList.toggle('open-filter-category');
  // }

  loadInitPost() {
    this._categories.getCategoryBySlug(this.slug).subscribe((data: any) => {

      // console.log(data);

      this.sizedata = data.proveedor;

      if (this.sizedata > 0) {
        for (let i = 0; i < 7; i++) {
          this.allpost.push(data[i]);
        }
        console.log(this.allpost)
        this.sizedata = this.sizedata - 7;
      } else {
        // this.allpost = data[0].providers;
        this.allpost = data;
        console.log(this.allpost)
      }

    });
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
    }
  }

  // load th next 6 posts
  loadNextPost() {
    this._categories.getCategoryBySlug(this.slug).subscribe((data: any) => {

      if (this.sizedata < 1) {
        this.spinner.hide();
        this.notEmptyPost = false;
      }

      else {

        if (this.sizedata > 6) {
          // for (let i = (data.providers.length - this.sizedata); i < (data[0].providers.length - this.sizedata) + 7; i++) {
          for (let i = (data.length - this.sizedata); i < (data.length - this.sizedata) + 7; i++) {
            // this.allpost.push(data[0].providers[i]);
            this.allpost.push(data[i]);
          }

          this.sizedata = this.sizedata - 7;
          this.notscrolly = true;

        } else {
          // for (let i = (data.providers.length - this.sizedata); i < data[0].providers.length; i++) {
          for (let i = (data.length - this.sizedata); i < data.length; i++) {
            // this.allpost.push(data[0].providers[i]);
            this.allpost.push(data[i]);
            this.notscrolly = false;
            this.notEmptyPost = false;
            this.spinner.hide();
            // console.log("entro aqui");
          }
        }
      }
    });

  }

  listProviders() {
    // this._providers.getProviders().subscribe( (data:any) =>{
    //   this.providers = data;
    // });
    this._categories.getCategoryBySlug(this.slug).subscribe((data: any) => {
      // this.providers = data[0].providers;
      // console.log(data);
      this.providers = data;
      // console.log( data.providers[0].state )
    });
  }

  listProvidersByState() {

  }



  listCategories() {
    this._categories.getCategories().subscribe((data: any) => {
      // console.log(data);
      // this.categories = data[0].providers.categories;
      this.categories = data;
    });
  }


  mostrar(id: any) {
    console.log(id);
    let cat_lista: any = document.getElementById(id);
    cat_lista.setAttribute("style", "display:inline-block;");

  }

  cerrar(id: any) {
    // console.log('click cerrar categoria');
    let cat_lista: any = document.getElementById(id);
    cat_lista.setAttribute("style", "display:none;");
  }

  mostrarOpt() {
    let cat_lista: any = document.getElementById('chip_options');
    cat_lista.setAttribute("style", "display:inline-block;");
  }

  cerrarOpt() {
    let cat_lista: any = document.getElementById('chip_options');
    cat_lista.setAttribute("style", "display:none;");
  }

  clickBody() {
    var element = document.querySelector("#chip_options");
    element.classList.toggle("hidden");
  }

  changeCategoryFilter($event){
    console.log($event.slug);

    this._activateR.params.subscribe(
      (params: Params) => {
        this.slug = params.name;

        this._categories.getCategoryBySlug($event.slug).subscribe( (data:any) =>{
          console.log(data);
          if(data){
            this.allpost = data.providers;
            this.categoriaP = data.categories;
          } else {
            this.allpost = 0;
          }
        });
      }
    );
  }

  filterCategory($event){

  }

  changeCityFilter($event){

  }

  changeCountryFilter($event){
    
  }

  

}
