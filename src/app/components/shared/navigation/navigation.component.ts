import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { DIR_IMG, ANGULAR_IMG } from '../../../config/config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  categories:any = [];
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor(private _categories: CategoriesService) {
    this._categories.getCategories().subscribe( (data:any) =>{
      this.categories = data;
      // console.log(this.categories);
    })
  }

  ngOnInit(): void {
  }
  asideVer(){
    console.log('click aside');
    console.log('click categoria');
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
    
    // aside___menu.removeClass('animacionEntrada')
    // aside___menu.addClass('animacionSalida')
    // over.addClass('animacionSalida')
  }

  catMenuAbrir(){
    let cat___menu:any = document.getElementById('menu__cat');
    let tag:any = document.getElementById('cat__con');
    // let buscar:any  = document.getElementById('barra__buscar');
    // buscar.setAttribute("style", "width:80%;");
    cat___menu.setAttribute("style", "display:block; color:black;")
    tag.setAttribute("style", "color:rgb(79, 212, 79); font-weight:700;")
    // tag.setAttribute("style","background:rgb(79, 212, 79); padding:0.5rem 2rem; color:white; ")
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
