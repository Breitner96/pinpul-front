import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles:any=[];

  constructor(private _role:RolesService) {}

  ngOnInit(): void {
    this.listaRoles();
  }

  listaRoles(){
    this._role.getRoles().subscribe((data:any)=>{
      this.roles=data;
    });
  }

  deleteRole(id){

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
        
        this._role.deleteRole(id).subscribe((data:any)=>{

          this.listaRoles();
        })
      }

    });



  }


}
