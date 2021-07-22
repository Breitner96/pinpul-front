import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  title:any = 'Categorías  Populares';  
  type:any = 'PieChart';  
  datosGrafica:any = []
  columnNames:any = ['Name', 'Percentage'];  
  options:any = {   colors: ['#22a6b3', '#eb4d4b', '#f0932b', '#6ab04c', '#686de0'], is3D: true};
  width:any = 500;  
  height:any = 300;
  categories:any[] = [];

  constructor(
    private _category: CategoriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.datosGrafica);
    this.listCategory();
  }

  listCategory(){
    this._category.getCategories().subscribe( (data:any) =>{
      this.categories = data;

      data.map( (element:any) =>{
        this.datosGrafica.push([element.category, parseInt(element.views) ]);
      });

      console.log(this.datosGrafica);

      if(data.denied){
        Swal.fire({
          title: `${data.denied}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this._router.navigate(['/admin/categorias']);
      }
      
    });
  }

  

  deleteCategory(id){

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
          title:'Se ha eliminado la categoria',
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        
        this._category.deleteCategory(id).subscribe( (data:any) =>{
          this.listCategory();
          console.log(data);
        })
      }

    });

  }

}
