import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import { DIR_IMG, token, ANGULAR_IMG } from '../../config/config';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { EmailsService } from 'src/app/services/emails.service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  slug: any;
  show: boolean = true;
  show2: boolean = false;
  proveedorID: any;
  categories: any = [];
  services: any = [];
  arregloproduct: any = [];
  arregloservices: any = [];
  type_clients: any = [];
  type_companies: any = [];
  countries: any = [];
  cities: any = [];
 
  form: FormGroup;
  formDos: FormGroup;

  DIR_IMG = DIR_IMG;

  dfUser:any = '';
  dfProvider:any = '';
  notProducts:boolean;
  notServices:boolean;
  notEmpleados:boolean;

  productos:any=[];
  firt5product:any=[];
  firt10product:any=[];
  firt15product:any=[];

  servicios:any=[];
  firt5service:any=[];
  firt10service:any=[];
  firt15service:any=[];

  proveedoresInteres:any = [];
  promotions:any = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  public images: string[] = [];

  ruta: {
    nombre:string
  };

  constructor(
    private _activateR: ActivatedRoute,
    private _router: Router,
    private _provider: ProvidersService,
    private _emails: EmailsService,
    private _sanitizer: DomSanitizer,
    private fb: FormBuilder) {

    this.createForm();
    this.createForm2();
  }

  ngOnInit(): void {

    this._activateR.params.subscribe(
      (params: Params) => {

          console.log(params);

          this.slug = params.name;
          this._provider.getProviderBySlug(this.slug).subscribe( (data:any) =>{

            console.log(data);

            this.proveedorID = data.provider;
            this.proveedoresInteres = data.interes;
            // this.images = data.images;
            // this.categories = data.provider.categories;
            // this.services = data.provider.services;
            console.log(this.proveedorID);

            this.productos=this.proveedorID.products.split(",");
            
            // this.productos.push("carro", "moto", "casa","carro", "moto", "casa","carro", "moto", "casa");

            for (let i = 0; i < this.productos.length; i++) {
              
              if (i<=4) {

                this.firt5product.push(this.productos[i])
                
              }

              if(i>4 && i<=9){

                this.firt10product.push(this.productos[i])

              }

              if(i>9 && i<=14){

                this.firt15product.push(this.productos[i])

              }
              
            }

            this.servicios=this.proveedorID.services.split(",");

            //  this.servicios.push("carro", "moto", "casa","carro", "moto", "casa","carro", "moto", "casa");
            
            for (let i = 0; i < this.servicios.length; i++) {
              
              if (i<=4) {

                this.firt5service.push(this.servicios[i])
                
              }

              if(i>4 && i<=9){

                this.firt10service.push(this.servicios[i])

              }

              if(i>9 && i<=14){

                this.firt15service.push(this.servicios[i])

              }
              
            }

            // this.promotions = data.promotions;

            let userIn: any;

            if (localStorage.getItem('access_token')) {
              this.dfUser = parseInt(localStorage.getItem('user_id'));
            } else {
              this.dfUser = 1;
            }

            this.dfProvider = data.provider.id;

            this.form.reset({
              user_id: this.dfUser,
              provider_id: this.dfProvider
            });

            this.type_clients = [];
            data.provider.clients.map((element: any) => {
              this.type_clients.push(` ${element.type_client}`);
            });

            this.type_companies = data.provider.companies;

            this.countries = [];
            data.provider.countries.map((element: any) => {
              this.countries.push(` ${element.country}`);
            });

            this.cities = [];
            data.provider.cities.map((element: any) => {
              this.cities.push(` ${element.city}`);
            });

            if( this.proveedorID.products ){
              this.notProducts = true;
            } else {
              this.notProducts = false;
            }

            if( this.proveedorID.services ){
              this.notServices = true;
            } else {
              this.notServices = false;
            }

            if( this.proveedorID.nempleados ){
              this.notEmpleados = true;
            } else {
              this.notEmpleados = false;
            }

          this.images = []
          data.provider.images.map((element: any) => {
            this.images.push(`${DIR_IMG}/${element.image}`);
          });

        });
      }
    );

    // this.ruta = { nombre: this._activateR.snapshot.params.name }

    
    // this.slug = this._activateR.snapshot.params['name'];
    // console.log( this.slug );

    // this._provider.getProviderBySlug(this.slug).subscribe((data: any) => {

    //   this.promotions = data.promotions;
    //   this.proveedoresInteres = data.interes[0].providers;

    //   let userIn: any;

    //   if (localStorage.getItem('access_token')) {
    //     this.dfUser = parseInt(localStorage.getItem('user_id'));
    //   } else {
    //     this.dfUser = 1;
    //   }

    //   this.dfProvider = data.provider.id;

    //   this.form.reset({
    //     user_id: this.dfUser,
    //     provider_id: this.dfProvider
    //   });


    //   this.proveedorID = data.provider;
    //   console.log(this.proveedorID.url_video);
    //   this.categories = data.provider.categories;
    //   this.services = data.provider.services;

    //   data.provider.clients.map((element: any) => {
    //     this.type_clients.push(` ${element.type_client}`);
    //   });

    //   this.type_companies = data.provider.companies;

    //   data.provider.countries.map((element: any) => {
    //     this.countries.push(` ${element.country}`);
    //   });

    //   data.provider.cities.map((element: any) => {
    //     this.cities.push(` ${element.city}`);
    //   });

    //   if( this.proveedorID.products ){
    //     this.notProducts = true;
    //   } else {
    //     this.notProducts = false;
    //   }

    //   if( this.proveedorID.services ){
    //     this.notServices = true;
    //   } else {
    //     this.notServices = false;
    //   }

    //   data.provider.images.map((element: any) => {
    //     this.images.push(`${DIR_IMG}/${element.image}`);
    //   });

    // });

  }

  get nameValidate() { return this.form.get('full_name').invalid && this.form.get('full_name').touched }
  get nameEmpresaValidate() { return this.form.get('company').invalid && this.form.get('company').touched }
  get emailValidate() { return this.form.get('email').invalid && this.form.get('email').touched }
  get telValidate() { return this.form.get('phone').invalid && this.form.get('phone').touched }
  get asuntoValidate() { return this.form.get('asunto').invalid && this.form.get('asunto').touched }

  createForm() {
    this.form = this.fb.group({
      user_id: '',
      provider_id: '',
      full_name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      asunto: ['', Validators.required],
    })
  }



  get nameValidate2() { return this.formDos.get('nombre').invalid && this.formDos.get('nombre').touched }
  get nameEmpresaValidate2() { return this.form.get('company2').invalid && this.form.get('company2').touched }
  get emailValidate2() { return this.formDos.get('email').invalid && this.formDos.get('email').touched }
  get telValidate2() { return this.formDos.get('tel').invalid && this.formDos.get('tel').touched }
  get asuntoValidate2() { return this.formDos.get('asunto2').invalid && this.formDos.get('asunto2').touched }
  createForm2() {
    this.formDos = this.fb.group({
      nombre: ['', Validators.required],
      company2: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      asunto2: ['', Validators.required],
    })
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }


  

  goOtherProvider(slug:string){
    this._router.navigate(['/proveedor/',slug])
  }

  info() {
    this.show = true;
    this.show2 = false;
    console.log(this.show)
    console.log(this.show2)
    let info: any = document.getElementById('info');
    let contacto: any = document.getElementById('contacto');
    let tab: any = document.getElementById('tab');
    tab.setAttribute("style", "border-bottom: none;");
    info.setAttribute("style", "background:white;");
    contacto.setAttribute("style", "background:#ccc;");
  }

  contacto() {
    console.log('Click en contacto');
    this.show = false;
    this.show2 = true;
    console.log(this.show)
    console.log(this.show2)
    let info: any = document.getElementById('info');
    let contacto: any = document.getElementById('contacto');
    let tab: any = document.getElementById('tab');
    tab.setAttribute("style", "border-bottom: none;");
    info.setAttribute("style", "background:#ccc;");
    contacto.setAttribute("style", "background:white;");
  }

  mostrar() {

    // console.log('click categoria');
    let cat_lista: any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:inline-block;");

  }

  cerrar() {
    // console.log('click cerrar categoria');
    let cat_lista: any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:none;");
  }

  ver__tel() {

    console.log('click ver telefono');
    // let cat_lista:any = document.getElementById('popUp__tel');
    // let over:any = document.getElementById('over2')
    // cat_lista.setAttribute("style", "display:inline-block;");
    // over.setAttribute("style","display:inline-block;");
    var element = document.querySelector("#popUp__tel");
    var element2 = document.querySelector("#over2");
    element.classList.toggle("hidden");
    element2.classList.toggle("hidden2");

  }
  pedirInfoGratis() {
    this._provider.getProviderBySlug(this.slug).subscribe((data: any) => {
      // console.log(data.id);
    });

    var element = document.querySelector("#popUp__infoGratis");
    var element2 = document.querySelector("#over2");
    element.classList.toggle("hidden");
    element2.classList.toggle("hidden2");
  }

  contadorInfo(id: number) {
    this._provider.addView(id).subscribe((data: any) => {
      this._provider.contadorMesGratis(data.id).subscribe((data: any) => {
        // console.log(data);
      });
    });
  }

  sendContactProveedor() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();

      });
    } else {
      let tag: any = document.getElementById('lds-ellipsis');
      tag.setAttribute("style", "display:inline-block;")
    }

    let dataForm = this.form.value
    this._emails.contactProvider(dataForm).subscribe((data: any) => {
      let tag: any = document.getElementById('lds-ellipsis');
      tag.setAttribute("style", "display:none;")
      Swal.fire({
        title: `Pronto nos pondremos en contacto contigo`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
      this.form.reset({
        user_id: this.dfUser,
        provider_id: this.dfProvider,
        full_name: '',
        company: '',
        email: '',
        phone: '',
      });
      console.log(data);
    });
  }

  sendContactPinpul() {

    if (this.formDos.invalid) {
      return Object.values(this.formDos.controls).forEach(control => {
        control.markAsTouched();

      });
    } else {
      let tag: any = document.getElementById('lds-ellipsis');
      tag.setAttribute("style", "display:inline-block;")
    }
    let dataForm = this.formDos.value
    this._emails.contactPinpul(dataForm).subscribe((data: any) => {
      let tag: any = document.getElementById('lds-ellipsis');
      tag.setAttribute("style", "display:none;")
      Swal.fire({
        title: `Pronto nos pondremos en contacto contigo`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
      this.formDos.reset({
        'nombre': '',
        'email': '',
        'tel': '',
        'asunto': '',
      });
      var element = document.querySelector("#popUp__infoGratis");
      var element2 = document.querySelector("#over2");
      element.classList.toggle("hidden");
      element2.classList.toggle("hidden2");
    });
  }

}
