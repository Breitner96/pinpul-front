import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { RolesService } from 'src/app/services/roles.service';
import { DIR_IMG , ANGULAR_IMG} from '../../../config/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  permissionsLocalStorage:any = [];
  permissionsDB:any = [];
  
  rol:any;
  roles:any = [];
  rootImage = DIR_IMG;
  rootNGIMg = ANGULAR_IMG;
  
  can:boolean;

  // roles: ['gerencia','admin','financiero','atención al cliente','proveedor','cliente'],
  links:any = [
    {
      label: 'Dashboard',
      slug: '/admin/dashboard',
      icon: 'fas fa-chart-pie',
      roles: ['gerencia','admin','financiero','atención al cliente','proveedor','cliente']
    },
    {
      label: 'Mi Información',
      slug: '/admin/perfil',
      icon: 'fas fa-edit',
      roles: ['gerencia','admin','financiero','atención al cliente','proveedor','cliente']
    },
    {
      label: 'Mi Empresa',
      slug: '/admin/empresa',
      icon: 'far fa-building',
      roles: ['proveedor']
    },
    // {
    //   label: 'Empresa',
    //   slug: '#',
    //   icon: 'fas fa-edit',
    //   roles: ['proveedor']
    // },
    {
      label: 'Categorías',
      slug: '/admin/categorias',
      icon: 'fas fa-edit',
      roles: ['gerencia','admin']
    },
    {
      label: 'Mensajes',
      slug: '/admin/messages-all',
      icon: 'fas fa-envelope',
      roles: ['gerencia','proveedor']
    },
    {
      label: 'Países',
      slug: '/admin/paises',
      icon: 'fas fa-globe',
      roles: ['gerencia','admin'],
    },
    {
      label: 'Ciudades',
      slug: '/admin/ciudades',
      icon: 'fas fa-map',
      roles: ['gerencia','admin'],
    },
    // {
    //   label: 'Planes',
    //   slug: '/admin/planes',
    //   icon: 'fas fa-bullhorn',
    //   roles: ['gerencia'],
    // },
    // {
    //   label: 'Servicios',
    //   slug: '/admin/servicios',
    //   icon: 'fas fa-book',
    //   roles: ['gerencia','admin'],
    // },
    {
      label: 'Tipo Documentos',
      slug: '/admin/tipo-documento',
      icon: 'fas fa-cog',
      roles: ['gerencia','admin'],
    },
    // {
    //   label: 'Tipo Compañias',
    //   slug: '/admin/type-company',
    //   icon: 'fas fa-industry',
    //   roles: ['gerencia','admin'],
    // },
    {
      label: 'Tipo cliente',
      slug: '/admin/type-client',
      icon: 'fas fa-suitcase',
      roles: ['gerencia','admin'],
    },
    {
      label: 'Promociones',
      slug: '/admin/promotions',
      icon: 'fas fa-bolt',
      // roles: ['gerencia','admin','financiero','proveedor'], proveedor puede mostrar sólo si es premium
      roles: ['proveedor'], // proveedor puede mostrar sólo si es premium
    },
    {
      label: 'Proveedores',
      slug: '/admin/proveedores',
      icon: 'fas fa-male',
      roles: ['gerencia','admin','financiero','atención al cliente'],
    },
    // {
    //   label: 'Editar empresa',
    //   slug: '/admin/edit-company',
    //   icon: 'fas fa-male',
    //   roles: ['gerencia','proveedor'],
    // },
    {
      label: 'Ofertas',
      slug: '/admin/ofertas',
      icon: 'fas fa-male',
      roles: ['cliente'],
    },
    {
      label: 'Usuarios',
      slug: '/admin/usuarios',
      icon: 'fas fa-user-plus',
      roles: ['gerencia','admin','atención al cliente'],
    },
    // {
    //   label: 'Comentarios',
    //   slug: '/admin/comentarios',
    //   icon: 'fas fa-comment',
    //   roles: ['gerencia','admin','cliente','atención al cliente'],
    // },
    {
      label: 'Roles',
      slug: '/admin/roles',
      icon: 'fas fa-comment',
      roles: ['gerencia'],
    },
    // {
    //   label: 'Permisos',
    //   slug: '/admin/permisos',
    //   icon: 'fas fa-cubes',
    //   roles: ['gerencia'],
    // },
    // {
    //   label: 'Calificaciónes',
    //   slug: '/admin/puntuaciones',
    //   icon: 'fas fa-smile',
    //   roles: ['gerencia','cliente'],
    // },
  ];

  constructor(
    private _permissions: PermissionService,
    private _roles: RolesService
  ) {

    this.permissionsLocalStorage = JSON.parse( localStorage.getItem('SB177IRHUL') );
    this.rol = localStorage.getItem('VLHAZGTXBI');

    
    let containRole = '';
    for(let i = 0; i <= this.links.length - 1; i++){
      containRole = this.links[i].roles.includes( this.rol );

      if( containRole ){
        this.links[i].show = true;
      } else {
        this.links[i].show = false;
      }

    }

    /* Tratar de hacerlo directamente con la base de datos
    */

    // this._roles.getRoles().subscribe( (data:any) =>{
    //   let containRole = '';
    //   this.roles = data;
    //   for(let i = 0; i <= this.links.length - 1; i++){
    //     containRole = this.roles.some( (element) =>{
    //       return element.name == this.rol;
    //     });
    //       console.log(containRole);
    //     if( containRole ){
    //       this.links[i].show = true;
    //     } else {
    //       this.links[i].show = false;
    //     }
    //   }
    // });

    
  }

  ngOnInit(): void {}


}
