import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { UsersService } from 'src/app/services/users.service';
import { Script } from 'vm';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';



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
        items: 4
      }
    },
    nav: true
  }

  homeOptions: OwlOptions = {
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
  
  }

  testimonialOptions:  OwlOptions = {
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
    
  constructor(
    private users: UsersService,
    private _emails: EmailsService,
    private _categories: CategoriesService,
    private _provedores: ProvidersService,
    private _router:Router,
    private fb:FormBuilder) {
      this.getCategoriesHome();
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
      console.log(data);
    });
  }



  ngOnInit() {

    particlesJS.load('particles-js', './assets/particles.json');

    this._categories.getCategories().subscribe( (data:any) =>{
      this.categories = data;
      for(let i = 0; i <= this.categories.length - 1; i++){
        this.categoriasPopulares.push(this.categories[i]);
      }
      console.log(this.categoriasPopulares);
    });

    this._provedores.getProviders().subscribe( (data:any) =>{
      this.proveedores = data;
      for(let i = 0; i <= this.proveedores.length - 1 ; i++){
        this.proveedoresPopulares.push(this.proveedores[i]);
      }
    });

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

  getCategoriesHome(){
    this._categories.getCategories().subscribe( data => {
      console.log(data);
    });
    // const categories$ = new Observable( observer =>{
    //   let i = - 1;
    //   const intervalo = setInterval( ()=> {
    //     i++;
    //     observer.next(i);
    //     if( i === 4 ){
    //       observer.complete();
    //       clearInterval( intervalo );
    //     }
    //   }, 1000);
    // });

    // categories$.subscribe(
    //   valor => console.log( valor ),
    //   error => console.warn( error ),
    //   () => console.info('Obs terminado')
    // );
  }

  cerrarPop(){
    var element = document.querySelector("#popUp");
    element.setAttribute("style","display:none;");
  }
  mostrar(){
    
    console.log('click categoria');
    let cat_lista:any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:inline-block;");
    
  }
  cerrar(){
    console.log('click cerrar categoria');
    let cat_lista:any = document.getElementById('categoria_lista');
    cat_lista.setAttribute("style", "display:none;");
  }
  asideAbrir(){
    let aside:any = document.getElementById('nav__responsive--container');
    aside.setAttribute("style", "display:inline-block;");
    let over:any = document.getElementById('overwrite');
  over.setAttribute("style","display:inline-block")
  }
  // asideCerrar(){
  //   let aside:any = document.getElementById('nav__responsive--container');
  //   aside.setAttribute("style", "display:none;");
  //   let over:any = document.getElementById('overwrite');
  // over.setAttribute("style","display:none")
  // }
  asideCerrar(){
    let aside___menu:any = document.getElementById('aside__menu');
    let over:any = document.getElementById('overwrite');
    aside___menu.setAttribute("style", "animation:fadeOut; animation-duration: 1s;")
    over.setAttribute("style","display:none;")
    
    // aside___menu.removeClass('animacionEntrada')
    // aside___menu.addClass('animacionSalida')
    // over.addClass('animacionSalida')
  }
  catMenuAsideAbrir(){
    var element = document.querySelector("#menu__cat--aside");
    element.classList.toggle("hidden2");
  }
  asideVer(){
    console.log('click aside');
    console.log('click categoria');
    let aside___menu:any = document.getElementById('aside__menu');
    let over:any = document.getElementById('overwrite');
    aside___menu.setAttribute("style", "display:inline-block;")
    over.setAttribute("style","display:inline-block")
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
  }

  checkDefaultRegister(){
    sessionStorage.setItem('checkProvider','yes');
    this._router.navigate(['/registro']);
  }
  
  
  // setInterval(function(){ alert("Hello"); }, 3000);

  sendContactPinpul(){
    
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
      console.log(data);
    });
  }
  
  
  
}
