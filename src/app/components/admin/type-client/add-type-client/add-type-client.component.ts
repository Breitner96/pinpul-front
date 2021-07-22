import { Component, OnInit } from '@angular/core';
import { TypeClientsService } from 'src/app/services/type-clients.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-type-client',
  templateUrl: './add-type-client.component.html',
  styleUrls: ['./add-type-client.component.css']
})
export class AddTypeClientComponent implements OnInit {

  form:FormGroup;

  constructor(
    private _typeClient: TypeClientsService,
    private fb:FormBuilder,
    private _router:Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  get typeClientValidate(){ return this.form.get('type_client').invalid && this.form.get('type_client').touched }

  createForm(){
    this.form = this.fb.group({
      type_client: ['',Validators.required],
    });
  }


  addTypeClient(){
    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._typeClient.createTypeClient(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/type-client']);
      console.log(data);
    });
  }

}
