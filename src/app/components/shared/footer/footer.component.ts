import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { DIR_IMG , ANGULAR_IMG} from '../../../config/config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories:any = [];
  categoriasPopulares:any = [];
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;
  constructor(
    private _categories: CategoriesService,
  ) { 
    this._categories.getCategories().subscribe( (data:any) =>{
      this.categories = data;
      for(let i = 0; i < 6; i++){
        this.categoriasPopulares.push(this.categories[i]);
      }
    });
  }

  ngOnInit(): void {
  }

}
