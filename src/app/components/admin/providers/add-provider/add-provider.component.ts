import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { PlansService } from 'src/app/services/plans.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { TypeClientsService } from 'src/app/services/type-clients.service';
import { TypeCompaniesService } from 'src/app/services/type-companies.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';


@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {

  form: FormGroup;
  formData: FormData = new FormData();
  plans: any = [];
  countries: any = [];
  cities: any = [];

  categories: any = [];
  services: any = [];
  typeDocuments: any = [];
  type_companies: any = [];
  type_clients: any = [];

  checksCategories: any = [];
  checksServices: any = [];
  checksCompanies: any = [];
  checksclients: any = [];

  checksCountries: any = [];
  checksCities: any = [];

  maxproduct: boolean = false;
  maxservices: boolean = false;

  galery: any = [];

  selectedCountries: number;
  selectedCities: number;
  video:boolean;

  constructor(
    private _plans: PlansService,
    private _countries: CountriesService,
    private _cities: CitiesService,
    private _providers: ProvidersService,
    private fb: FormBuilder,
    private _categories: CategoriesService,
    private _router: Router,
    private _services: ServicesService,
    private _clients: TypeClientsService,
    private _companies: TypeCompaniesService,
    private _typeDocuments: TypeDocumentsService) {}

  ngOnInit(): void {
    this._plans.getPlans().subscribe((data: any) => {
      this.plans = data;
    });

    this._typeDocuments.getTypeDocuments().subscribe((data: any) => {
      this.typeDocuments = data;
    });

    this._countries.getCountries().subscribe((data: any) => {
      this.countries = data;
    });

    this._cities.getCities().subscribe((data: any) => {
      this.cities = data;
    });

    this._categories.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this._services.getServices().subscribe((data: any) => {
      this.services = data;
    });

    this._clients.getTypeClients().subscribe((data: any) => {
      this.type_clients = data;
    });

    this._companies.getTypeCompanies().subscribe((data: any) => {
      this.type_companies = data;
    });

    this.createForm();
  }

  get planValidate() { return this.form.get('plan_id').invalid && this.form.get('plan_id').touched }
  get typeDocumentValidate() { return this.form.get('type_document_id').invalid && this.form.get('type_document_id').touched }
  get countryValidate() { return this.form.get('country_id').invalid && this.form.get('country_id').touched }
  get cityValidate() { return this.form.get('city_id').invalid && this.form.get('city_id').touched }
  get categoriesValidate() { return this.form.get('city_id').invalid && this.form.get('city_id').touched }
  get logoValidate() { return this.form.get('logo').invalid && this.form.get('logo').touched }

  get providerValidate() { return this.form.get('provider').invalid && this.form.get('provider').touched }
  get descriptionValidate() { return this.form.get('description').invalid && this.form.get('description').touched }

  get numDocumentValidate() { return this.form.get('num_document').invalid && this.form.get('num_document').touched }
  get phoneValidate() { return this.form.get('phone').invalid && this.form.get('phone').touched }
  get emailValidate() { return this.form.get('email').invalid && this.form.get('email').touched }
  get numberValidate() { return this.form.get('nempleados').invalid && this.form.get('nempleados').touched }
  get detailsValidate() { return this.form.get('details').invalid && this.form.get('details').touched }
  get garantiaValidate() { return this.form.get('garantia').invalid && this.form.get('garantia').touched }

  get galeriaValidate() { return this.form.get('image').invalid && this.form.get('image').touched }
  get documentValidate() { return this.form.get('document').invalid && this.form.get('document').touched }



  get imagesArray() {
    return this.form.get('image') as FormArray;
  }

  get documentArray() {
    return this.form.get('document') as FormArray;
  }

  createForm() {
    this.form = this.fb.group({
      user_id: '',
      plan_id: ['', Validators.required],
      provider: ['', Validators.required],
      type_document_id: ['', Validators.required],
      num_document: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      logo: ['', Validators.required],
      description: ['', Validators.required],
      products: [''],
      services: [''],
      razon_social: [],
      type_client_id: [],
      country_id: ['', Validators.required],
      city_id: ['', Validators.required],
      countries_id: [],
      cities_id: [''],
      category_id: [],
      nempleados: ['', Validators.required],
      details: ['', Validators.required], // En qué se destaca
      garantia: ['', Validators.required],
      facebook_url: [''],
      twitter_url: [''],
      instagram_url: [''],
      linkedin_url: [''],
      web_site: [''],
      image: this.fb.array([], Validators.required),
      document: this.fb.array([], Validators.required),
    })
  }

  uploadImage(event) {
    this.formData.append('logo', <File>event.target.files[0]);
    // console.log(event.target.files);
  }

  uploadImageGalery(event) {
    let getFiles = event.target.files;
    let valueFiles = Object.keys(getFiles);

    for (let i = 0; i <= valueFiles.length - 1; i++) {
      this.formData.append('image[]', getFiles[i]);
    }
  }

  uploadDocument(event) {
    let getFiles = event.target.files;
    let valueFiles = Object.keys(getFiles);

    for (let i = 0; i <= valueFiles.length - 1; i++) {
      this.formData.append('document[]', getFiles[i]);
    }
  }

  add_provider() {

    // if( this.form.invalid ){
    //   return Object.values( this.form.controls ).forEach( control => {
    //     control.markAsTouched();  
    //   });
    // }

    let recibirstringproducto = this.form.value.products;
    if( recibirstringproducto > 0 ){
      let correcionporcoma = recibirstringproducto.replace(/,\s*$/, "");
      let arregloProducto = correcionporcoma.split(",");
  
      if (arregloProducto.length > 15) {
        this.maxproduct = true;
      } else {
        this.formData.append('products', this.form.get('products').value);
        this.maxproduct = false;
      }
    }


    let recibirstringservicios = this.form.value.services;
    if( recibirstringservicios > 0 ){
      let correcionporcomaservicios = recibirstringservicios.replace(/,\s*$/, "");
      let arregloServicio = correcionporcomaservicios.split(",");
  
      if (arregloServicio.length > 15) {
        this.maxservices = true;
      } else {
        this.formData.append('services', this.form.get('services').value);
        this.maxservices = false;
      }
    }


    this.formData.append('user_id', localStorage.getItem('user_id') );
    this.formData.append('plan_id', this.form.get('plan_id').value);
    this.formData.append('type_document_id', this.form.get('type_document_id').value);
    this.formData.append('country_id', this.form.get('country_id').value);
    this.formData.append('city_id', this.form.get('city_id').value);

    this.formData.append('countries_id', this.form.get('countries_id').value);
    this.formData.append('cities_id', this.form.get('cities_id').value);

    this.formData.append('provider', this.form.get('provider').value);
    this.formData.append('category_id', this.form.get('category_id').value);
    this.formData.append('type_client_id', this.form.get('type_client_id').value);
    this.formData.append('description', this.form.get('description').value);
    // this.formData.append('products', this.form.get('products').value);
    // this.formData.append('services', this.form.get('services').value);
    this.formData.append('razon_social', this.form.get('razon_social').value);

    this.formData.append('num_document', this.form.get('num_document').value);
    this.formData.append('phone', this.form.get('phone').value);
    this.formData.append('email', this.form.get('email').value);
    this.formData.append('nempleados', this.form.get('nempleados').value);
    this.formData.append('details', this.form.get('details').value);
    this.formData.append('garantia', this.form.get('garantia').value);
    this.formData.append('facebook_url', this.form.get('facebook_url').value);
    this.formData.append('twitter_url', this.form.get('twitter_url').value);
    this.formData.append('instagram_url', this.form.get('instagram_url').value);
    this.formData.append('linkedin_url', this.form.get('linkedin_url').value);
    this.formData.append('web_site', this.form.get('web_site').value);


    // if (arregloProducto.length > 15) {
    //   this.maxproduct = true;
    // } else {
    //   this.maxproduct = false;
    // }

    
    this._providers.createProvider(this.formData).subscribe((data: any) => {
      
      let rolUser = localStorage.getItem('VLHAZGTXBI');
      console.log(data);

      if( rolUser == 'proveedor' ){
        this._router.navigate(['/admin/perfil']);
        if (data) {
          Swal.fire({
            title: '¡Hemos registrado tus datos!',
            text: 'Tú información está en revisión',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        }
      } else {
        if(data.error){
          Swal.fire({
            title: `${data.error}`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
        } else {
          Swal.fire({
            title: `${data.messages}`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
          this._router.navigate(['/admin/proveedores']);
        }
      }


    });


  }

}
