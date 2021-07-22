import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import { RatingsService } from 'src/app/services/ratings.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PunctuationService } from 'src/app/services/punctuation.service';

@Component({
  selector: 'app-add-punctuation',
  templateUrl: './add-punctuation.component.html',
  styleUrls: ['./add-punctuation.component.css']
})
export class AddPunctuationComponent implements OnInit {

  form: FormGroup;

  providers: any = [];
  ratings: any = [];
  users: any = [];

  constructor(
    private _rantings: RatingsService,
    private _users: UsersService,
    private _providers: ProvidersService,
    private _router: Router,
    private fb: FormBuilder,
    private _punctuation: PunctuationService) {}

  ngOnInit(): void {

    let userIn:any;

    this._users.getUsers().subscribe((data: any) => {
      this.users = data;
    });

    this._providers.getProviders().subscribe((data: any) => {
      this.providers = data;
    });

    this._rantings.getRatings().subscribe((data: any) => {
      this.ratings = data;
    });
    
    if( localStorage.getItem('access_token') ){
      userIn = parseInt( localStorage.getItem('user_id') );
      this.form.reset({
        user_id: userIn,
      });
    }

    this.createForm();
  }

  get userValidate() { return this.form.get('user_id').invalid && this.form.get('user_id').touched }
  get providerValidate() { return this.form.get('provider_id').invalid && this.form.get('provider_id').touched }
  get calificacionValidate() { return this.form.get('rating_id').invalid && this.form.get('rating_id').touched }
  get commentValidate() { return this.form.get('comment').invalid && this.form.get('comment').touched }


  createForm() {
    this.form = this.fb.group({
      user_id: ['', Validators.required],
      provider_id: ['', Validators.required],
      rating_id: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  add_Punctuation() {

    console.log( this.form.value );
    // return;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    let data = this.form.value;
    this._punctuation.createPunctuation(data).subscribe((data: any) => {
      if (data) {
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
