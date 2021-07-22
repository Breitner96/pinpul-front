import { Component, OnInit } from '@angular/core';
import { TypeClientsService } from 'src/app/services/type-clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-client',
  templateUrl: './type-client.component.html',
  styleUrls: ['./type-client.component.css']
})
export class TypeClientComponent implements OnInit {
  
  typeClients:any=[];

  constructor(private _typeClients: TypeClientsService) {}

  ngOnInit(): void {
    this.listClients();
  }

  listClients(){
    this._typeClients.getTypeClients().subscribe((data:any)=>{
        console.log(data);
        this.typeClients = data;
    });
  }

  deleteTypeClient(id){
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
        
        this._typeClients.deleteTypeClient(id).subscribe((data:any)=>{
          this.listClients();
        });
      }

    });
  }

}
