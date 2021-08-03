import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { EmailsService } from 'src/app/services/emails.service';
import Swal from 'sweetalert2';
import { EpaycoService } from 'src/app/services/epayco.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  userID: any = [];
  providerID: any = [];
  selectProvider: boolean = false;
  selectRol: boolean = false;
  showInfoProvider: boolean = false;
  form: FormGroup;
  formInfo: FormGroup;

  localUserID: any;
  rolUser: any;

  existProvider: boolean;
  stateProvider: boolean = false;

  ifPremium: boolean
  notPremium: boolean;
  notGerencia: boolean;

  noMostrarDatosAprovados: boolean = false;

  constructor(
    private _user: UsersService,
    private _provider: ProvidersService,
    private fb: FormBuilder,
    private _router: Router,
    private _epayco: EpaycoService) { }

  ngOnInit(): void {

    this.localUserID = parseInt(localStorage.getItem('user_id'));
    this.rolUser = localStorage.getItem('VLHAZGTXBI');

    if (this.rolUser == 'gerencia') {
      this.notGerencia = false;
    } else {
      this.notGerencia = true;
    }

    if (this.rolUser != 'proveedor' || this.rolUser != 'cliente') {
      this.noMostrarDatosAprovados = false;
    } else {
      this.noMostrarDatosAprovados = true;
    }

    this.updateInforForm();


    this._user.getUser(this.localUserID).subscribe((data: any) => {
      this.userID = data;
      // console.log(this.userID);

      this.formInfo.reset({
        id: this.userID.id,
        name: this.userID.name,
        email: this.userID.email,
        phone: this.userID.phone,
        rol_id: this.rolUser
      });

      this._provider.getProviderByUser(this.userID.id).subscribe((data: any) => {
        // console.log(data);
        if (data.length > 0) {

          this._provider.getProviderByUser(this.userID.id).subscribe((data: any) => {

            console.log(data);

            if (localStorage.getItem('provider_id')) {
              localStorage.setItem('provider_id', data[0].id);
            }

            if (data.length > 0) {
              this.existProvider = true;

              if (data[0].state == 'activo') {
                this.stateProvider = true;
                localStorage.setItem('provider_id', data[0].id);
              }

              if (data[0].plan.plan == 'Premium') {
                this.ifPremium = true;
              } else {
                this.notPremium = true;
              }

            } else {
              this.existProvider = false;
            }

          });
        }
      });

    });

    this.createForm();

  }

  updateInforForm() {
    this.formInfo = this.fb.group({
      id: '',
      name: ['',],
      email: ['',],
      phone: [''],
      password: [''],
      password_confirmation: [''],
      rol_id: []
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      cvc: ['', Validators.required],
      exp_month: ['', Validators.required],
      exp_year: ['', Validators.required]
    });
  }

  generateTokenCard() {
    console.log(this.form.value);
    this._epayco.createTokenClient(this.form.value).subscribe((data: any) => {
      console.log(data);
    });
  }

  mostrarPago() {
    var element = document.querySelector(".formulario__pago");
    element.classList.toggle("hidden");
  }

  updateUserData() {
    let data = this.formInfo.value;
    // console.log(data);
    this._user.updateUser(data).subscribe((data: any) => {
      Swal.fire({
        title: `Datos actualizados correctamente`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      });
      this._router.navigate(['/admin/perfil']);
      // console.log(data);
    });
  }



}
