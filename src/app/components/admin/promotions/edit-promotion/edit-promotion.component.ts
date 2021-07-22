import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {

  form: FormGroup;
  id:number;
  promotionID:any = [];
  formData:any = new FormData();
  imagePath:any;

  constructor(
    private _promotions:PromotionsService,
    private fb:FormBuilder,
    private rutaActiva: ActivatedRoute,
    private _router:Router) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._promotions.getPromotion(this.id).subscribe( (data:any) =>{
      this.promotionID = data;
      this.form.reset({
        title: this.promotionID.title,
        description: this.promotionID.description,
        discount: this.promotionID.discount,
        start_promotion: this.promotionID.start_promotion,
        end_promotion: this.promotionID.end_promotion,
        status: this.promotionID.status
      });
    });
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
      id:'',
      provider_id: '',
      image: [''],
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

  update_promotion(){

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


    this.formData.append('_method', 'PUT');

    this._promotions.updatePromotion(this.id, this.formData).subscribe( (data:any) =>{
      // console.log(data);
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/promotions']);
    });


  }

}
