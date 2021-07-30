import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import { DIR_IMG , ANGULAR_IMG} from '../../config/config';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-proveedores-populares',
  templateUrl: './proveedores-populares.component.html',
  styleUrls: ['./proveedores-populares.component.css']
})
export class ProveedoresPopularesComponent implements OnInit {

  proveedores:any = [];
  proveedoresOptions: OwlOptions;
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;

  constructor(
    private _providers: ProvidersService,
  ) { }

  ngOnInit(): void {

    this._providers.getProviders().subscribe( (data:any) =>{
      this.proveedores = data;
    });

    this.proveedoresOptions = {
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

  mostrar(){

  }

  cerrar(){}

}
