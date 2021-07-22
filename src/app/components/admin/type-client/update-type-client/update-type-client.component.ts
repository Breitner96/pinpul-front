import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { TypeClientsService } from 'src/app/services/type-clients.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-type-client',
  templateUrl: './update-type-client.component.html',
  styleUrls: ['./update-type-client.component.css']
})
export class UpdateTypeClientComponent implements OnInit {

  form: FormGroup;
  id:number;
  typeClientDB:any = [];

  constructor(
    private _typeClient: TypeClientsService,
    private fb:FormBuilder,
    private rutaActiva: ActivatedRoute,
    private _router:Router) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];
    this._typeClient.getTypeClient(this.id).subscribe( (data:any) =>{
      this.typeClientDB = data;
      this.form.reset({
        id: this.typeClientDB.id,
        type_client: this.typeClientDB.type_client
      });
    });
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      id: '',
      type_client: ['',Validators.required]
    });
  }

  get typeClientValidate(){ return this.form.get('type_client').invalid && this.form.get('type_client').touched }

  updateTypeClient(){

    if( this.form.invalid ){
      return Object.values( this.form.controls ).forEach( control => {
        control.markAsTouched();  
      });
    }

    let data = this.form.value;
    this._typeClient.updateTypeClient(data).subscribe( (data:any) =>{
      if(data){
        Swal.fire({
          title: `${data.messages}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        });
      }
      this._router.navigate(['/admin/type-client']);
    });

  }

}
