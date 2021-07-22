import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  form: FormGroup;

  constructor(private _service: ServicesService, private fb:FormBuilder, private _router:Router) {
    this.createForm()
  }

  ngOnInit(): void {
  }

  get serviceValidate(){ return this.form.get('service').invalid && this.form.get('service').touched }

  createForm(){
    this.form = this.fb.group({
      service: ['',Validators.required],
    });
  }

  addService(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._service.createService(data).subscribe( (data:any) =>{
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
