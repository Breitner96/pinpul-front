import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services:any=[];

  constructor(private _services: ServicesService) {
    this.listServices();
  }

  ngOnInit(): void {
  }

  listServices(){
    this._services.getServices().subscribe((data:any)=>{
      // console.log(data);
      this.services = data;
    });
  }

  deleteService(id){

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
        
        this._services.deleteService(id).subscribe((data:any)=>{

          this.listServices();
          
        })
      }

    });
    
  }
  


}
