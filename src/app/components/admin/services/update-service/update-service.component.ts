import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  form: FormGroup;
  id:number;
  serviceID:any = []

  constructor(private _services: ServicesService, private rutaActiva: ActivatedRoute, private fb: FormBuilder, private _router:Router) {
    this.id = this.rutaActiva.snapshot.params['id'];

    this._services.getService(this.id).subscribe( (data:any) =>{
      this.serviceID = data;
      console.log( this.serviceID);

      this.form.reset({
        id: this.serviceID.id,
        service: this.serviceID.service
      });

    })
    
    this.createForm();

  }

  ngOnInit(): void {
  }

  get serviceValidate(){ return this.form.get('service').invalid && this.form.get('service').touched }


  createForm(){
    this.form = this.fb.group({
      id: '',
      service: ['',Validators.required]
    });
  }

  updateService(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    // console.log(data);
    this._services.updateService(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/servicios']);
      console.log(data);
    })

  }

}
