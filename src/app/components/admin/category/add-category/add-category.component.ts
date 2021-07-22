import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form:FormGroup;
  formData: FormData = new FormData();

  constructor(
    private _addcategory: CategoriesService,
    private fb:FormBuilder,
    private _activatedR: ActivatedRoute,
    private _router: Router

  ) { 

    

  }

  ngOnInit(): void {
    this.createForm();
  }

  get categoriaValidate(){ return this.form.get('category').invalid && this.form.get('category').touched }
  get imagenValidate(){ return this.form.get('imagen').invalid && this.form.get('imagen').touched }

  createForm(){
    this.form = this.fb.group({
      category: ['',Validators.required],
      imagen: ['',Validators.required],
    })
  }

  uploadImage(event){
    this.formData.append('imagen',<File>event.target.files[0]);
    // console.log(event.target.files[0].name);
  }

  add_categories(){

    // if( this.form.invalid ){
    //   return Object.values( this.form.controls ).forEach( control => {
    //     control.markAsTouched();  
    //   });
    // }

    this.formData.append('category', this.form.get('category').value );
    // console.log(this.form.get('category').value);

    // console.log(this.formData);

    // let data = this.form.value;
    this._addcategory.createCategory(this.formData).subscribe( (data:any) =>{

      if(data.error){
        Swal.fire({
          title: `${data.error}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      } else {
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
        this._router.navigate(['/admin/categorias']);
      }

    });

  }

}
