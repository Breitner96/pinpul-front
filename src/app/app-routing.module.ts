import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

import {LoginComponent} from './components/login/login.component';
import {PoliticasComponent} from './components/politicas/politicas.component';
import {PreguntasComponent} from './components/preguntas/preguntas.component';

import {RegistroComponent} from './components/registro/registro.component';

import { DetailsComponent } from './components/details/details.component';
import { BlogComponent } from './components/blog/blog.component';
import { VistaBlogComponent } from './components/vista-blog/vista-blog.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {EditCompanyComponent} from './components/admin/edit-company/edit-company.component';
import {MessagesComponent} from './components/admin/messages/messages.component';
import {MessagesAllComponent} from './components/admin/messages-all/messages-all.component';
import {CategoryComponent} from './components/admin/category/category.component';
import {CoutriesComponent} from './components/admin/coutries/coutries.component';
import {CitiesComponent} from './components/admin/cities/cities.component';

import {AddCategoryComponent} from './components/admin/category/add-category/add-category.component';
import {EditCategoryComponent} from './components/admin/category/edit-category/edit-category.component';
import {ViewCategoryComponent} from './components/admin/category/view-category/view-category.component';
 
import {AddCountryComponent} from './components/admin/coutries/add-country/add-country.component';

import {EditCountryComponent} from './components/admin/coutries/edit-country/edit-country.component';

import {AddCityComponent} from './components/admin/cities/add-city/add-city.component';
import {EditCityComponent} from './components/admin/cities/edit-city/edit-city.component';

import {PlansComponent} from './components/admin/plans/plans.component';

import {AddPlanComponent} from './components/admin/plans/add-plan/add-plan.component';

import {UpdatePlanComponent} from './components/admin/plans/update-plan/update-plan.component';

import {TypeDocumentComponent} from './components/admin/type-document/type-document.component';
import {AddTypeDocumentComponent} from './components/admin/type-document/add-type-document/add-type-document.component';
import {UpdateTypeDocumentComponent} from './components/admin/type-document/update-type-document/update-type-document.component';

import {TypeCompanyComponent} from './components/admin/type-company/type-company.component';
import {AddTypeCompanyComponent} from './components/admin/type-company/add-type-company/add-type-company.component';
import {UpdateTypeCompanyComponent} from './components/admin/type-company/update-type-company/update-type-company.component';

import {PromotionsComponent} from './components/admin/promotions/promotions.component';
import {AddPromotionComponent} from './components/admin/promotions/add-promotion/add-promotion.component';
import {EditPromotionComponent} from './components/admin/promotions/edit-promotion/edit-promotion.component';
import {ViewpromotionComponent} from './components/admin/promotions/viewpromotion/viewpromotion.component';

import {ProvidersComponent} from './components/admin/providers/providers.component';
import {AddProviderComponent} from './components/admin/providers/add-provider/add-provider.component';
import {UpdateProviderComponent} from './components/admin/providers/update-provider/update-provider.component';
import {ViewProviderComponent} from './components/admin/providers/view-provider/view-provider.component';

import { UsersComponent } from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { EditUserComponent } from './components/admin/users/edit-user/edit-user.component';
import { ViewUserComponent } from './components/admin/users/view-user/view-user.component';

import {CommentsComponent} from './components/admin/comments/comments.component';
import {AddCommentComponent} from './components/admin/comments/add-comment/add-comment.component';
import {EditCommentComponent} from './components/admin/comments/edit-comment/edit-comment.component';

import {PunctuationComponent} from './components/admin/punctuation/punctuation.component';
import {AddPunctuationComponent} from './components/admin/punctuation/add-punctuation/add-punctuation.component';
import {EditPunctuationComponent} from './components/admin/punctuation/edit-punctuation/edit-punctuation.component';

 

import {RoleComponent} from './components/admin/role/role.component';
import {AddRoleComponent} from './components/admin/role/add-role/add-role.component';
import {EditRoleComponent} from './components/admin/role/edit-role/edit-role.component';

import {PermissionsComponent} from './components/admin/permissions/permissions.component';
import {AddPermisoComponent} from './components/admin/permissions/add-permiso/add-permiso.component';
import {EditPermisoComponent} from './components/admin/permissions/edit-permiso/edit-permiso.component';
import { PerfilComponent } from './components/admin/perfil/perfil.component';


  
import { AuthGuard } from './guards/auth.guard';
import { ServicesComponent } from './components/admin/services/services.component';
import { AddServiceComponent } from './components/admin/services/add-service/add-service.component';
import { UpdateServiceComponent } from './components/admin/services/update-service/update-service.component';
import { TypeClientComponent } from './components/admin/type-client/type-client.component';
import { AddTypeClientComponent } from './components/admin/type-client/add-type-client/add-type-client.component';
import { UpdateTypeClientComponent } from './components/admin/type-client/update-type-client/update-type-client.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { OffersComponent } from './components/admin/offers/offers.component';
import { CompanyComponent } from './components/admin/company/company.component';


const routes: Routes = [
  // { path: 'ruta', component: Componente, canActivate: [ AuthGuard ] }, - proteger rutas
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'vista-blog', component: VistaBlogComponent },
  { path: 'politicas', component: PoliticasComponent },
  { path: 'preguntas', component: PreguntasComponent },
  {
    // path: 'categorias', component: CategoriasComponent
    path: 'categorias/:name', component: CategoriasComponent,
    // children: [
    //   { path:':name', component: CategoriasComponent,}
    // ]
  },
  {
    path: 'proveedor/:name', component: ProveedoresComponent,
    // children: [
    //   { path:':name', component: ProveedoresComponent,}
    // ]
  },
  // { path: 'details', component: DetailsComponent},
  { path: 'admin', canActivate: [ AuthGuard ],
    children:[

      { path: 'perfil', component: PerfilComponent },
      { path: 'empresa', component: CompanyComponent },
      { path: 'empresa/:id', component: EditCompanyComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'messages-all', component: MessagesAllComponent },
      
      { path:'', component:CategoryComponent },

      {
        path:'categorias',children:[
          { path:'', component: CategoryComponent },
          { path:'add-category', component:AddCategoryComponent },
          { path:'edit-category/:id', component:EditCategoryComponent },
          { path:'view-category/:id', component:ViewCategoryComponent }
        ]
      },

      {
        path:'paises',children:[
          { path:'', component: CoutriesComponent },
          { path:'add-country', component:AddCountryComponent },
          { path:'edit-country/:id', component:EditCountryComponent }
        ]
      },

      {
        path:'ciudades',children:[
          { path:'', component: CitiesComponent },
          { path:'add-city', component:AddCityComponent },
          { path:'edit-city/:id', component:EditCityComponent }
        ]
      },

      {
        path:'planes',children:[
          { path:'', component: PlansComponent },
          { path:'add-plan', component:AddPlanComponent },
          { path:'edit-plan/:id', component:UpdatePlanComponent }
        ]
      },

      {
        path:'servicios', children:[
          { path:'', component: ServicesComponent },
          { path:'add-services', component: AddServiceComponent },
          { path:'edit-services/:id', component: UpdateServiceComponent },
        ]
      },

      {
        path:'tipo-documento',children:[
          { path:'', component: TypeDocumentComponent },
          { path:'add-type-document', component:AddTypeDocumentComponent },
          { path:'edit-type-document/:id', component:UpdateTypeDocumentComponent }
        ]
      },

      {
        path:'type-company',children:[
          { path:'', component: TypeCompanyComponent },
          { path:'add-type-company', component: AddTypeCompanyComponent },
          {path:'edit-type-company/:id', component: UpdateTypeCompanyComponent }
        ]
      },

      {
        path:'type-client',children:[
          { path:'', component: TypeClientComponent },
          { path:'add-type-client', component: AddTypeClientComponent },
          { path:'edit-type-client/:id', component: UpdateTypeClientComponent }
        ]
      },

      {
        path:'promotions',children:[
          {path:'', component: PromotionsComponent},
          { path:'view-promotion/:id', component: ViewpromotionComponent },
          { path:'add-promotion', component: AddPromotionComponent },
          { path:'edit-promotion/:id',component: EditPromotionComponent }
        ]
      },

      { path: 'ofertas', component: OffersComponent },

      {
        path:'proveedores',children:[
          { path:'', component: ProvidersComponent },
          { path:'add-provider', component: AddProviderComponent },
          { path:'view-provider/:id', component: ViewProviderComponent },
          { path:'edit-provider/:id', component: UpdateProviderComponent }
        ]
      },

      {
        path:'usuarios',children:[
          { path:'', component: UsersComponent },
          { path:'add-user', component:AddUserComponent },
          { path:'edit-user/:id', component:EditUserComponent },
          { path:'view-user/:id', component:ViewUserComponent }
        ]
      },

      {
        path:'comentarios',children:[
          
          { path:'', component: CommentsComponent },
          { path:'add-comment', component:AddCommentComponent },
          { path:'edit-comment/:id', component:EditCommentComponent },

        ]
      },

      {
        path:'permisos',children:[
          
          { path:'', component: PermissionsComponent },
          { path:'add-permiso', component:AddPermisoComponent },
          { path:'edit-permiso/:id', component:EditPermisoComponent },

        ]
      },

      {
        path:'roles',children:[
          
          { path:'', component: RoleComponent },
          { path:'add-role', component:AddRoleComponent },
          { path:'edit-role/:id', component:EditRoleComponent },

        ]
      },

      {
        path:'puntuaciones',children:[
          
          { path:'', component: PunctuationComponent },
          { path:'add-puntuacion', component:AddPunctuationComponent },
          { path:'edit-puntuacion/:id', component:EditPunctuationComponent },

        ]
      },
      
    ],

    },
    

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
