import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories:any=[];
  id:number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private _categories:CategoriesService) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._categories.getCategory(this.id).subscribe((data:any)=>{
      this.categories=data;
    });
  }

}
