import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  form: FormGroup;
  id:number;
  categoryID:any = [];
  formData:any = new FormData();
  imagePath:any;

  

  constructor(
    private _editcategory:CategoriesService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._editcategory.getCategory(this.id).subscribe( (data:any) =>{
      this.categoryID = data;
      // console.log( this.categoryID );

      this.form.reset({
        category: this.categoryID.category
      });
    });

    this.createForm();
  }

  get categoriaValidate(){ return this.form.get('category').invalid && this.form.get('category').touched }
  get imagenValidate(){ return this.form.get('imagen').invalid && this.form.get('imagen').touched }

  createForm(){
    this.form = this.fb.group({
      id: '',
      category: ['',Validators.required],
      imagen: ['']
    });
  }

  uploadImage(event){
    // console.log(<File>event.target.files[0]);
    this.formData.append('imagen',<File>event.target.files[0]);
  }

  update_categories(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }
    this.formData.append('category', this.form.get('category').value );
    this.formData.append('_method', 'PUT');
    
    this._editcategory.updateCategory(this.id, this.formData).subscribe( (data:any) =>{

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
