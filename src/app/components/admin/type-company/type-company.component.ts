import { Component, OnInit } from '@angular/core';
import { TypeCompaniesService } from 'src/app/services/type-companies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-company',
  templateUrl: './type-company.component.html',
  styleUrls: ['./type-company.component.css']
})
export class TypeCompanyComponent implements OnInit {

  companies:any=[];

  constructor(private _company:TypeCompaniesService) { 

    this.listCompanies();

  }

  listCompanies(){

    this._company.getTypeCompanies().subscribe((data:any)=>{

        this.companies=data;

    })

  }

  ngOnInit(): void {
  }

  deletecompany(id){

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
        
        this._company.deleteTypeCompany(id).subscribe((data:any)=>{

          this.listCompanies();
  
        })
      }

    });



  }

}
