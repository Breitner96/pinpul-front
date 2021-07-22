import { Component, OnInit } from '@angular/core';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-type-document',
  templateUrl: './type-document.component.html',
  styleUrls: ['./type-document.component.css']
})
export class TypeDocumentComponent implements OnInit {

  documentos:any=[];
  name:number=1;

  constructor(private _document:TypeDocumentsService) {}

  ngOnInit(): void {
    this.listdocuments();
  }

  listdocuments(){
    this._document.getTypeDocuments().subscribe((data:any)=>{
      this.documentos=data;
    });
  }

  deletedocument(id){
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
        this._document.deleteTypeDocument(id).subscribe((data:any)=>{
          this.listdocuments();
        });
      }
    });
  }

}
