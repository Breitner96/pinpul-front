import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categorias-populares',
  templateUrl: './categorias-populares.component.html',
  styleUrls: ['./categorias-populares.component.css']
})
export class CategoriasPopularesComponent implements OnInit {

  categories:any = [];
  customOptions: OwlOptions;
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor(
    private _categories: CategoriesService,
  ) { }

  ngOnInit(): void {
    
    this._categories.getCategories().subscribe( (data:any) =>{
      this.categories = data;
    });

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
          items: 3,
          nav: true
        },
        1024: {
          items: 4,
          nav: false
        }
      },
      nav: true
    }
  }

}
