import { Component, HostListener, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';

import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']

})
export class PromotionsComponent implements OnInit {

  promotions:any=[];
  public showContainer: boolean;
  mydate:any;

  
  constructor(
    private _promotions:PromotionsService,
    public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.listPromotions();
    this.breakpointObserver.observe(['(min-width: 520px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showContainer = true;
        } else {
          this.showContainer = false;
        }
      });
  }



  listPromotions(){
    this._promotions.getPromotions().subscribe((data:any)=>{
      this.promotions=data;
    });
  }

  deletePromotion(id){

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
        
        this._promotions.deletePromotion(id).subscribe((data:any)=>{
          this.listPromotions();
        });
      }

    });


  }

}
