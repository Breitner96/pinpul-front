import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeDocumentsService } from 'src/app/services/type-documents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-type-document',
  templateUrl: './add-type-document.component.html',
  styleUrls: ['./add-type-document.component.css']
})
export class AddTypeDocumentComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    private _document:TypeDocumentsService,
    private fb:FormBuilder,
    private _router:Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  get documentValidate(){ return this.form.get('document').invalid && this.form.get('document').touched }

  createForm(){
    this.form = this.fb.group({
      document: ['',Validators.required],
    });
  }

  addDocument(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._document.createTypeDocument(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/tipo-documento']);
      console.log(data);
    })
  
  }

}
