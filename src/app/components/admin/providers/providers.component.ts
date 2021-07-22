import { Component, OnInit } from '@angular/core';

import { ProvidersService } from 'src/app/services/providers.service';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers:any=[];
  public showContainer: boolean;

  constructor(
    private _providers:ProvidersService,
    public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.listprovider();
    this.breakpointObserver.observe(['(min-width: 520px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.showContainer = true;
      } else {
        this.showContainer = false;
      }
    });
  }

  listprovider(){
    this._providers.getProviders().subscribe((data:any)=>{
      this.providers = data;
      console.log(data);
    });
  }

  deleteprovider(id){

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
        
        this._providers.deleteProvider(id).subscribe((data:any)=>{

          this.listprovider();
          
        })
      }

    });



  }

}
