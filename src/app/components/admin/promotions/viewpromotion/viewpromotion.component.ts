import { Component, OnInit } from '@angular/core';
import { PromotionsService } from 'src/app/services/promotions.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewpromotion',
  templateUrl: './viewpromotion.component.html',
  styleUrls: ['./viewpromotion.component.css']
})
export class ViewpromotionComponent implements OnInit {
  
  form: FormGroup;
  promotions:any=[];
  id:number;
  estado:boolean=false;

  constructor(
    private _promotions:PromotionsService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._promotions.getPromotion(this.id).subscribe( (data:any) =>{
      this.promotions = data;

      if (this.promotions.status=='Activo'){
        this.estado=true;
        console.log("Estado verde");
      }
      else{
        this.estado=false;
        console.log("Estado rojo");
      }

    });
  }

}
