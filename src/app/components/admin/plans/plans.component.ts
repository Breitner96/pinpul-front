import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  planes:any=[];

  constructor(private _plan:PlansService) {}

  ngOnInit(): void {
    this.listPlans();
  }
  
  listPlans(){
    this._plan.getPlans().subscribe((data:any)=>{
      this.planes=data;
    });
  }

  deletePlan(id){

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
        
        this._plan.deletePlan(id).subscribe((data:any)=>{

          this.listPlans();
          console.log(data);
    
        })
    
      }

    });


  }

}
