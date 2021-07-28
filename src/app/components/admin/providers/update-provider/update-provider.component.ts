import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { PlansService } from 'src/app/services/plans.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ServicesService } from 'src/app/services/services.service';
import { threadId } from 'worker_threads';
import { TypeClientsService } from 'src/app/services/type-clients.service';
import { TypeCompaniesService } from 'src/app/services/type-companies.service';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import { DIR_IMG } from '../../../../config/config';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {

  form: FormGroup;
  id:number;
  providerID:any = [];
  formData:any = new FormData();
  imagePath:any;
  plans:any=[];
  countries:any=[];
  cities:any=[];

  categories:any = [];
  checksCategories:any = [];
  newArray: any = [];

  services:any=[];
  typeDocuments: any = [];
  checksServices:any = [];
  valores:any;

  type_companies:any=[];
  type_clients:any=[];

  checksCompanies:any = [];
  checksclients:any = [];

  checksCountries:any = [];
  checksCities:any = [];
  maxproduct:boolean=false;
  maxservices: boolean = false;

  defaultClients:any = [];
  defaultCountry:any = '';
  defaultCountries:any = [];
  defaultCity:any = '';
  defaultCities:any = [];

  defaultCategories:any = [];

  can:boolean = false;

  images:any = [];
  documents:any = [];

  DIR_IMG = DIR_IMG;

  arrState = [
    { name: 'activo'},
    { name: 'en revisión'},
  ];

  btnBackProvider:boolean = false;
  btnBackGerencia:boolean = false;
  video:boolean;

  constructor(
    private _plans:PlansService,
    private _countries:CountriesService,
    private _cities:CitiesService,
    private _providers:ProvidersService,
    private fb:FormBuilder,
    private rutaActiva: ActivatedRoute,
    private _categories: CategoriesService,
    private _services: ServicesService,
    private _router: Router,
    private _clients:TypeClientsService,
    private _companies:TypeCompaniesService,
    private _typeDocuments: TypeDocumentsService ) { }

  listImage(){
    
  }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    if( localStorage.getItem('VLHAZGTXBI') == 'gerencia' || localStorage.getItem('VLHAZGTXBI') == 'admin'  ){
      this.can = true;
    }

    if( localStorage.getItem('VLHAZGTXBI') == 'proveedor' ){
      this.btnBackProvider = true;
    }
    if( localStorage.getItem('VLHAZGTXBI') == 'gerencia' ){
      this.btnBackGerencia = true;
    } 

    this._providers.getProvider(this.id).subscribe( (data:any) =>{
      this.providerID = data;

      console.log(data);

      if( this.providerID.plan.plan == 'Premium' ){
        this.video = true;
      }

      this.images = data.images;
      this.documents = data.documents;

      this.defaultClients = this.providerID.clients;
      this.defaultCountry = this.providerID.country_id;
      this.defaultCountries = this.providerID.country_id;
      this.defaultCity = this.providerID.city_id;
      this.defaultCities = this.providerID.city_id;
      this.defaultCategories = this.providerID.categories;

      this.form.reset({
        'id': this.providerID.id,
        'plan_id': this.providerID.plan_id,
        'type_document_id': this.providerID.type_document_id,
        'num_document': this.providerID.num_document,
        'email': this.providerID.email,
        'phone': this.providerID.phone,
        'description': this.providerID.description,
        'products': this.providerID.products,
        'services': this.providerID.services,
        'razon_social': this.providerID.razon_social,
        'type_client_id': this.providerID.clients,
        'country_id': this.providerID.country_id,
        'city_id': this.providerID.city_id,
        'countries_id': this.providerID.countries,
        'cities_id': this.providerID.cities,
        'provider': this.providerID.provider,
        'category_id': this.providerID.categories,
        'nempleados': this.providerID.nempleados,
        'details': this.providerID.details,
        'garantia': this.providerID.garantia,
        'facebook_url': this.providerID.facebook_url,
        'twitter_url': this.providerID.twitter_url,
        'instagram_url': this.providerID.instagram_url,
        'linkedin_url': this.providerID.linkedin_url,
        'web_site': this.providerID.web_site,
        'state': this.providerID.state
      });
    });
    

    this._plans.getPlans().subscribe((data:any)=>{
      this.plans = data;
    });

    this._typeDocuments.getTypeDocuments().subscribe((data: any) => {
      this.typeDocuments = data;
    });

    this._countries.getCountries().subscribe((data:any)=>{
      this.countries = data;
    });

    this._cities.getCities().subscribe((data:any)=>{
      this.cities = data;
    });

    this._categories.getCategories().subscribe((data:any)=>{
      this.categories = data;
    });
    
    this._clients.getTypeClients().subscribe((data:any)=>{
      this.type_clients = data;
    });

    this._companies.getTypeCompanies().subscribe((data:any)=>{
      this.type_companies=data;
    });
    
    
    this.createForm();
  }


  get planValidate(){ return this.form.get('plan_id').invalid && this.form.get('plan_id').touched }
  get typeDocumentValidate() { return this.form.get('type_document_id').invalid && this.form.get('type_document_id').touched }
  get countryValidate(){ return this.form.get('country_id').invalid && this.form.get('country_id').touched }
  get cityValidate(){ return this.form.get('city_id').invalid && this.form.get('city_id').touched }
  get logoValidate(){ return this.form.get('logo').invalid && this.form.get('logo').touched }
  get providerValidate(){ return this.form.get('provider').invalid && this.form.get('provider').touched }
  get descriptionValidate(){ return this.form.get('description').invalid && this.form.get('description').touched }

  get numDocumentValidate() { return this.form.get('num_document').invalid && this.form.get('num_document').touched }
  get phoneValidate(){ return this.form.get('phone').invalid && this.form.get('phone').touched }
  get emailValidate(){ return this.form.get('email').invalid && this.form.get('email').touched }
  // get numberValidate(){ return this.form.get('nempleados').invalid && this.form.get('nempleados').touched }
  // get detailsValidate(){ return this.form.get('details').invalid && this.form.get('details').touched }
  // get garantiaValidate(){ return this.form.get('garantia').invalid && this.form.get('garantia').touched }

  get galeriaValidate() { return this.form.get('image').invalid && this.form.get('image').touched }
  get documentValidate() { return this.form.get('document').invalid && this.form.get('document').touched }

  createForm(){
    this.form = this.fb.group({
      id:'',
      plan_id: ['',Validators.required],
      type_document_id: ['', Validators.required],
      num_document: ['', Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      logo: ['',Validators.required],
      description: ['',Validators.required],
      products: [''],
      services: [''],
      razon_social: ['',Validators.required],
      type_client_id: [],
      country_id: ['',Validators.required],
      city_id: ['',Validators.required],
      countries_id: [''],
      cities_id: [''],
      provider: ['',Validators.required],
      category_id: ['',Validators.required],
      nempleados:[''],
      details:[''],
      garantia:[''],
      facebook_url: [''],
      twitter_url: [''],
      instagram_url: [''],
      linkedin_url: [''],
      web_site: [''],
      url_video: [''],
      state: [''],
      image: this.fb.array([], Validators.required),
      document: this.fb.array([], Validators.required),
    })
  }

  uploadImage(event){
    this.formData.append('logo',<File>event.target.files[0]);
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

  update_provider(){

    // if( this.form.invalid ){
    //   return Object.values( this.form.controls ).forEach( control => {
    //     control.markAsTouched();  
    //   });
    // }

    let recibirstringproducto = this.form.value.products;
    // console.log( recibirstringproducto );
    if( recibirstringproducto ){
      let correcionporcoma = recibirstringproducto.replace(/,\s*$/, "");
      let arregloProducto = correcionporcoma.split(",");
  
      if (arregloProducto.length > 15) {
        this.maxproduct = true;
      } else {
        this.maxproduct = false;
      }
    }

    let recibirstringservicios = this.form.value.services;
    if( recibirstringservicios ){
      let correcionporcomaservicios = recibirstringservicios.replace(/,\s*$/, "");
      let arregloServicio = correcionporcomaservicios.split(",");
  
      if (arregloServicio.length > 15) {
        this.maxservices = true;
      } else {
        this.maxservices = false;
      }
    }

    // this.formData.append('user_id', localStorage.getItem('user_id') );
    this.formData.append('plan_id', this.form.get('plan_id').value);
    this.formData.append('type_document_id', this.form.get('type_document_id').value);
    this.formData.append('country_id', this.form.get('country_id').value);
    this.formData.append('city_id', this.form.get('city_id').value);

    let argCountries = [];
    this.form.get('countries_id').value.map( (element:any) =>{
      argCountries.push(element.id);
    });
    this.formData.append('countries_id', argCountries);

    let argCities = [];
    this.form.get('cities_id').value.map( (element:any) =>{
      argCities.push(element.id)
    })
    this.formData.append('cities_id', argCities);


    this.formData.append('provider', this.form.get('provider').value);

    let argTypeClient = [];
    this.form.get('type_client_id').value.map( (element:any) =>{
      argTypeClient.push(element.id);
    });
    this.formData.append('type_client_id', argTypeClient );

    let argCategories = [];
    this.form.get('category_id').value.map( (element:any) =>{
      argCategories.push(element.id);
    });

    this.formData.append('category_id', argCategories );
    this.formData.append('description', this.form.get('description').value);
    this.formData.append('products', this.form.get('products').value);
    this.formData.append('services', this.form.get('services').value);
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
    this.formData.append('url_video', this.form.get('url_video').value);
    this.formData.append('state', this.form.get('state').value);

    this.formData.append('_method', 'PUT');

    this._providers.updateProvider(this.id, this.formData).subscribe( (data:any) =>{

      // console.log(data);
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/proveedores']);

      let rolUser = localStorage.getItem('VLHAZGTXBI');
  
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

  removeImageGallery(image,id){
    
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
          title:'Se ha eliminado la imagen',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });

        this.images.splice(id, 1);

        let obj = {
          imagen: image,
          provider_id: localStorage.getItem('provider_id')
        }
        
        this._providers.eliminarFotoGaleria(obj).subscribe((data:any)=>{
          console.log(data);
        });

      }

    });
  }


}
