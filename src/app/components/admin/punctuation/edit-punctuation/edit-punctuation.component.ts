import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PunctuationService } from 'src/app/services/punctuation.service';


@Component({
  selector: 'app-edit-punctuation',
  templateUrl: './edit-punctuation.component.html',
  styleUrls: ['./edit-punctuation.component.css']
})
export class EditPunctuationComponent implements OnInit {
  id:number;
  form:FormGroup;
  providers:any=[];
  ratings:any=[];
  users:any=[];
  Punctuation_id:any=[];

  constructor(
    private _rantings:RatingsService,
    private _users:UsersService,
    private _providers:ProvidersService,
    private _router:Router,
    private fb:FormBuilder,
    private _punctuation:PunctuationService,
    private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._punctuation.getPunctuation(this.id).subscribe( (data:any) =>{
      this.Punctuation_id = data;
      console.log( this.Punctuation_id);

      this.form.reset({
        id:this.Punctuation_id.id,
        rating_id: this.Punctuation_id.rating_id,
        user_id: this.Punctuation_id.user_id,
        provider_id: this.Punctuation_id.provider_id,
        
      });

    })

    this._users.getUsers().subscribe((data:any)=>{
      this.users = data;
    });

    this._providers.getProviders().subscribe((data:any)=>{
      this.providers = data;
    });

    this._rantings.getRatings().subscribe((data:any)=>{
      this.ratings = data;
    });
    
    this.createForm();
  }

  get userValidate(){ return this.form.get('user_id').invalid && this.form.get('user_id').touched }
  get providerValidate(){ return this.form.get('provider_id').invalid && this.form.get('provider_id').touched }
  get calificacionValidate(){ return this.form.get('rating_id').invalid && this.form.get('rating_id').touched }


  createForm(){
    this.form = this.fb.group({
      id:'',
      user_id: ['',Validators.required],
      provider_id: ['',Validators.required],
      rating_id: ['',Validators.required]
    })
  }

  edit_Punctuation(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._punctuation.updatePunctuation(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/puntuaciones']);

    })
  
  }

}
