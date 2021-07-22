import { Component, OnInit } from '@angular/core';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-type-document',
  templateUrl: './update-type-document.component.html',
  styleUrls: ['./update-type-document.component.css']
})
export class UpdateTypeDocumentComponent implements OnInit {

  
  form: FormGroup;
  id:number;
  documentID:any = []

  constructor(
    private _document:TypeDocumentsService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private _router:Router) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];
    this._document.getTypeDocument(this.id).subscribe( (data:any) =>{
      this.documentID = data;
      this.form.reset({
        id: this.documentID.id,
        document: this.documentID.document
      });
    });
    
    this.createForm();
  }

  get documentValidate(){ return this.form.get('document').invalid && this.form.get('document').touched }


  createForm(){
    this.form = this.fb.group({
      id: '',
      document: ['',Validators.required]
    });
  }

  updateDocument(){
    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._document.updateTypeDocument(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/tipo-documento']);
    });

  }

}
