import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any=[];
  public showContainer: boolean;


  constructor(
    private _users:UsersService,
    private _router: Router,
    public breakpointObserver: BreakpointObserver) {
    
   }

  ngOnInit(): void {

    this.listUsers();

    this.breakpointObserver.observe(['(min-width: 768px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showContainer = true;
      } else {
        this.showContainer = false;
      }
    });

  }

  listUsers(){
    this._users.getUsers().subscribe((data:any)=>{
      console.log(data);
      this.users = data;
    });
  }

  deleteuser(id){

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
        
        this._users.deleteUser(id).subscribe((data:any)=>{
          this.listUsers();
        });
      }

    });



    
  }


}




