import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PromotionsService } from 'src/app/services/promotions.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {

  form:FormGroup;
  formData: FormData = new FormData();


  constructor(private _promotion:PromotionsService,
    private fb:FormBuilder,
    private _router:Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  get imagenValidate(){ return this.form.get('image').invalid && this.form.get('image').touched }
  get titleValidate(){ return this.form.get('title').invalid && this.form.get('title').touched }
  get descriptionValidate(){ return this.form.get('description').invalid && this.form.get('description').touched }
  get discountValidate(){ return this.form.get('discount').invalid && this.form.get('discount').touched }

  get startpromotionValidate(){ return this.form.get('start_promotion').invalid && this.form.get('start_promotion').touched }
  get endpromotionValidate(){ return this.form.get('end_promotion').invalid && this.form.get('end_promotion').touched }

  get statusValidate(){ return this.form.get('status').invalid && this.form.get('status').touched }



  createForm(){
    this.form = this.fb.group({
      provider_id: '',
      image: ['',Validators.required],
      title: ['',Validators.required],
      description: ['',Validators.required],
      discount: ['',Validators.required],
      start_promotion: ['',Validators.required],
      end_promotion: ['',Validators.required],
      status: ['',Validators.required]
    })
  }


  uploadImage(event){

    this.formData.append('image',<File>event.target.files[0]);
    console.log(event.target.files[0].name);

  }

  add_promotion(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    this.formData.append('provider_id', localStorage.getItem('provider_id') );
    this.formData.append('title', this.form.get('title').value );
    this.formData.append('description', this.form.get('description').value );
    this.formData.append('discount', this.form.get('discount').value );
    this.formData.append('start_promotion', this.form.get('start_promotion').value );
    this.formData.append('end_promotion', this.form.get('end_promotion').value );
    this.formData.append('status', this.form.get('status').value );

    console.log(this.form.get('start_promotion').value);

    // console.log(this.form.get('category').value);

    console.log(this.formData);

    // let data = this.form.value;
    this._promotion.createPromotion(this.formData).subscribe( (data:any) =>{
      console.log(data);
      if(data){
        Swal.fire({  
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/promotions']);
    })
  }




}
