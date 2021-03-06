import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { DIR_IMG, ANGULAR_IMG } from '../../../config/config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  localUserName = localStorage.getItem('user_name');

  categories:any = [];
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;
  showuser:boolean;

  constructor(
    private _categories: CategoriesService,
    private _router:Router
  ){
    
  }

  ngOnInit(): void {
    this._categories.getCategories().subscribe( (data:any) =>{
      this.categories = data;
    });

    if (localStorage.getItem('user_name')) {

      this.showuser=true;
    }

    else{
      this.showuser=false;

    }
  }

  openMenuMobile(){

    let page = document.querySelector('.nav-component');
    page.classList.add("home-over");

    let mobileMenu = document.querySelector('#menu-nav-mobile');
    mobileMenu.classList.add("style-open-mobile");
  }

  openCategoriesMobile(){
    let contentSubitemsMobile = document.querySelector('.content-subitems-mobile');
    contentSubitemsMobile.classList.toggle('toggle-content-subitems-mobile');    
  }

  closeMenuNavMobile(){
    let page = document.querySelector('.nav-component');
    page.classList.remove("home-over");

    let asideMenuMobile = document.querySelector('#menu-nav-mobile');
    asideMenuMobile.classList.remove("style-open-mobile");
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

  asideVer(){
    let aside___menu:any = document.getElementById('aside__menu');
    let over:any = document.getElementById('overwrite');
    aside___menu.setAttribute("style", "display:inline-block;")
    over.setAttribute("style","display:inline-block")
  }

  asideCerrar(){
    let aside___menu:any = document.getElementById('aside__menu');
    let over:any = document.getElementById('overwrite');
    aside___menu.setAttribute("style", "animation:fadeOut; animation-duration: 1s;")
    over.setAttribute("style","display:none;")
  }

  catMenuAbrir(){
    let cat___menu:any = document.getElementById('menu__cat');
    let tag:any = document.getElementById('cat__con');
    cat___menu.setAttribute("style", "display:block; color:black;")
    tag.setAttribute("style", "color:rgb(79, 212, 79); font-weight:700;")
  }

  catMenuAsideAbrir(){
    var element = document.querySelector("#menu__cat--aside");
    element.classList.toggle("hidden");
  }

  clickBody(){
    var element = document.querySelector("#menu__cat");
    element.classList.toggle("hidden");
  }

}
