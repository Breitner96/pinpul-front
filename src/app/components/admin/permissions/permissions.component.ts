import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  permisos:any=[];

  constructor(private _permisos:PermissionService) { 

    this.listaPermisos();

  }

  ngOnInit(): void {
  }

  listaPermisos(){

    this._permisos.getPermissions().subscribe((data:any)=>{

      this.permisos=data;
    })

  }

  deletePermiso(id){

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
        
        this._permisos.deletePermission(id).subscribe((data:any)=>{

          this.listaPermisos();
        })
      }

    });



  }

}
