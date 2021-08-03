import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { UsersService } from 'src/app/services/users.service';
import { Script } from 'vm';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { EmailsService } from 'src/app/services/emails.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

declare var particlesJS: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  localUserName = localStorage.getItem('user_name');

  
  categoriasPopulares:any = [];
  proveedoresPopulares:any = [];
  categories:any = [];
  proveedores:any = [];
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;
  form:FormGroup;
  showuser:boolean;
  popUp:boolean = false;
  customOptions: OwlOptions;
  homeOptions: OwlOptions;
  testimonialOptions:OwlOptions;

  // recaptcha
  public recentToken: string = ''
  private singleExecutionSubscription: Subscription;

  recaptchaAvailable = false;


    
  constructor(
    private users: UsersService,
    private _http: HttpClient,
    private _emails: EmailsService,
    private _categories: CategoriesService,
    private _provedores: ProvidersService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private _router:Router,
    private fb:FormBuilder) {
      // this.getCategoriesHome();
      
  }
  get nameValidate(){ return this.form.get('nombre').invalid && this.form.get('nombre').touched }
  get emailValidate(){ return this.form.get('email').invalid && this.form.get('email').touched }
  get telValidate(){ return this.form.get('tel').invalid && this.form.get('tel').touched } 
  get asuntoValidate(){ return this.form.get('asunto').invalid && this.form.get('asunto').touched }
  

  createForm(){
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      email: ['',Validators.required],
      tel: ['',Validators.required],
      asunto: ['',Validators.required],
    })
  }


  showUsers(){
    this.users.getUsers().subscribe( (data:any) =>{
      // console.log(data);
    });
  }

  // newPromise(): Promise<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization':'Bearer ' + localStorage.getItem('access_token')
  //   });

  //   const promesa = new Promise( (resolve, reject) =>{
  //     resolve( this._http.get(`https://pinpul.com/site/public_html/api/categories`,{headers: headers}) )
  //   });
  //   return promesa;
  // }

  getRecaptchaToken(action){
    this.singleExecutionSubscription = this.recaptchaV3Service.execute(action)
    .subscribe(response => {
        this.recentToken = response;
        this.recaptchaAvailable = true;
    },error=>{
      console.log("error getting recaptcha");
      // this.OnDestroy();
    });
  }

  OnDestroy(){}

  // async categoriasAll(){
  //   this.categories = await this._categories.obtenerCategorias();
  //   console.log( this.categories );
  // }



  ngOnInit() {
    // this.newPromise()
    //       .then( resp =>{
    //         resp.subscribe( data => {
    //           this.categoriasPopulares = data;
    //         })
    //       });

    setTimeout( ()=>{
      this.popUp = true;
    }, 3000);

    this.getRecaptchaToken('register');

    particlesJS.load('particles-js', './assets/particles.json');

    

    // this._categories.obtenerCategorias().then( resp => console.log( resp ) );

    

    this._categories.getCategories().subscribe( (data:any) =>{

      console.log(data)
      this.categories = data;

      this.customOptions = {
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
          768: {
            items: 2,
            nav: true
          },
          992: {
            items: 4,
            nav: true
          },
          1024: {
            items: 4,
            nav: false
          }
        },
        nav: true
      }
    });

    this._provedores.getProviders().subscribe( (data:any) =>{
      // console.log(data);
      this.proveedores = data;

      // for(let i = 0; i <= this.proveedores.length - 1 ; i++){
      //   this.proveedoresPopulares.push(this.proveedores[i]);
      // }

      this.homeOptions = {
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
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      };

    });

    this.testimonialOptions = {
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
        }
      },
      nav: true
    }
    

    if (localStorage.getItem('user_name')) {
      this.showuser=true;
    }
    else{
      this.showuser=false;
    }

    this.createForm();
  }

  logout(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('VLHAZGTXBI');
    localStorage.removeItem('SB177IRHUL');
    localStorage.removeItem('access_token');
    localStorage.removeItem('provider_id');
    this._router.navigate(['/login']);
  }

  openMenuMobile(){
    let page = document.querySelector('.home');
    page.classList.add("home-over");

    let mobileMenu = document.querySelector('#menu-nav-mobile');
    mobileMenu.classList.add("style-open-mobile");
  }

  closeMenuNavMobile(){
    let body = document.querySelector('.home');
    body.classList.remove("home-over");

    let mobileMenu = document.querySelector('#menu-nav-mobile');
    mobileMenu.classList.remove("style-open-mobile");
  }

  openCategoriesMobile(){
    let contentSubitemsMobile = document.querySelector('.content-subitems-mobile');
    contentSubitemsMobile.classList.toggle('toggle-content-subitems-mobile');    
  }

  

  cerrarPop(){
    var element = document.querySelector("#popUp");
    element.setAttribute("style","display:none;");
  }
  mostrar(){
    let cat_lista:any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:inline-block;");
  }

  cerrar(){
    let cat_lista:any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:none;");
  }

  asideAbrir(){
    console.log('Abrir menú responsive');
    // let aside:any = document.getElementById('nav__responsive--container');
    // aside.setAttribute("style", "display:inline-block;");
    // let over:any = document.getElementById('overwrite');
    // over.setAttribute("style","display:inline-block");

    let body = document.querySelector('.home');
    body.classList.add("home-over");

    let asideMenuMobile = document.querySelector('#menu-nav-mobile');
    asideMenuMobile.classList.add("style-open-mobile");
  }

  asideCerrar(){
    let aside___menu:any = document.getElementById('aside__menu');
    let over:any = document.getElementById('overwrite');
    aside___menu.setAttribute("style", "animation:fadeOut; animation-duration: 1s;")
    over.setAttribute("style","display:none;")
  }

  catMenuAsideAbrir(){
    var element = document.querySelector("#menu__cat--aside");
    element.classList.toggle("hidden2");
  }

  asideVer(){
    // let aside___menu:any = document.getElementById('aside__menu');
    // let over:any = document.getElementById('overwrite');
    // aside___menu.setAttribute("style", "display:inline-block;")
    // over.setAttribute("style","display:inline-block")
  }

  mostrarColl(){
    let aside:any = document.getElementById('contenedor__menu2');
    aside.setAttribute("style", "display:inline-block;");
    let tag:any = document.getElementById('cat__tag');
    tag.setAttribute("style","color:rgb(79, 212, 79);")
    
  }
  cerrarColl(){
    let aside:any = document.getElementById('contenedor__menu2');
    aside.setAttribute("style", "display:none;");
    let tag:any = document.getElementById('cat__tag');
    tag.setAttribute("style","color:white;")
  }

  clickBody(){
    var element = document.querySelector("#contenedor__menu2");
    element.classList.toggle("hidden");
    element.classList.add("open-categories");
  }

  checkDefaultRegister(){
    sessionStorage.setItem('checkProvider','yes');
    this._router.navigate(['/registro']);
  }
  
  
  // setInterval(function(){ alert("Hello"); }, 3000);

  sendContactPinpul(){

    if(this.recaptchaAvailable){
      // do we have recaptcha token?
     this.form.value.rcToken = this.recentToken;
   }
    
    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched(); 
      });
    }else{
      let tag:any = document.getElementById('lds-ellipsis');
      tag.setAttribute("style","display:inline-block;")
    }
    let dataForm = this.form.value
    this._emails.contactPinpul(dataForm).subscribe( (data:any) =>{
      let tag:any = document.getElementById('lds-ellipsis');
      tag.setAttribute("style","display:none;")
      Swal.fire({
        title: `Pronto nos pondremos en contacto contigo`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
      this.form.reset({
        'nombre': '',
        'email': '',
        'tel': '',
        'asunto': '',
      });
      // console.log(data);
    });
  }
  
  
  
}
