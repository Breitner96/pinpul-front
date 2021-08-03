import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

// import { ListUserComponent } from './components/user/list-user/list-user.component';
// import { AddUserComponent } from './components/user/add-user/add-user.component';
// import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
 
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DetailsComponent } from './components/details/details.component';
import { BreadcumbsComponent } from './components/shared/breadcumbs/breadcumbs.component';

import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SliderCarouselModule } from 'slider-carousel';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { CoutriesComponent } from './components/admin/coutries/coutries.component';
import { CitiesComponent } from './components/admin/cities/cities.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/admin/category/edit-category/edit-category.component';

import { AddCountryComponent } from './components/admin/coutries/add-country/add-country.component';
import { EditCountryComponent } from './components/admin/coutries/edit-country/edit-country.component';
import { EditCityComponent } from './components/admin/cities/edit-city/edit-city.component';
import { AddCityComponent } from './components/admin/cities/add-city/add-city.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { AddPlanComponent } from './components/admin/plans/add-plan/add-plan.component';
import { UpdatePlanComponent } from './components/admin/plans/update-plan/update-plan.component';
import { TypeDocumentComponent } from './components/admin/type-document/type-document.component';
import { AddTypeDocumentComponent } from './components/admin/type-document/add-type-document/add-type-document.component';
import { UpdateTypeDocumentComponent } from './components/admin/type-document/update-type-document/update-type-document.component';
import { TypeCompanyComponent } from './components/admin/type-company/type-company.component';
import { AddTypeCompanyComponent } from './components/admin/type-company/add-type-company/add-type-company.component';
import { UpdateTypeCompanyComponent } from './components/admin/type-company/update-type-company/update-type-company.component';
import { PromotionsComponent } from './components/admin/promotions/promotions.component';
import { AddPromotionComponent } from './components/admin/promotions/add-promotion/add-promotion.component';
import { EditPromotionComponent } from './components/admin/promotions/edit-promotion/edit-promotion.component';
import { ViewpromotionComponent } from './components/admin/promotions/viewpromotion/viewpromotion.component';
import { ProvidersComponent } from './components/admin/providers/providers.component';
import { AddProviderComponent } from './components/admin/providers/add-provider/add-provider.component';
import { UpdateProviderComponent } from './components/admin/providers/update-provider/update-provider.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { EditUserComponent } from './components/admin/users/edit-user/edit-user.component';
import { ViewUserComponent } from './components/admin/users/view-user/view-user.component';
import { ViewProviderComponent } from './components/admin/providers/view-provider/view-provider.component';
import { CommentsComponent } from './components/admin/comments/comments.component';
import { AddCommentComponent } from './components/admin/comments/add-comment/add-comment.component';
import { EditCommentComponent } from './components/admin/comments/edit-comment/edit-comment.component';

import { ServicesComponent } from './components/admin/services/services.component';
import { AddServiceComponent } from './components/admin/services/add-service/add-service.component';
import { UpdateServiceComponent } from './components/admin/services/update-service/update-service.component';
import { TypeClientComponent } from './components/admin/type-client/type-client.component';
import { AddTypeClientComponent } from './components/admin/type-client/add-type-client/add-type-client.component';
import { UpdateTypeClientComponent } from './components/admin/type-client/update-type-client/update-type-client.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { PermissionsComponent } from './components/admin/permissions/permissions.component';
import { AddPermisoComponent } from './components/admin/permissions/add-permiso/add-permiso.component';
import { EditPermisoComponent } from './components/admin/permissions/edit-permiso/edit-permiso.component';
import { RoleComponent } from './components/admin/role/role.component';
import { EditRoleComponent } from './components/admin/role/edit-role/edit-role.component';
import { AddRoleComponent } from './components/admin/role/add-role/add-role.component';
import { ViewCategoryComponent } from './components/admin/category/view-category/view-category.component';
import { PunctuationComponent } from './components/admin/punctuation/punctuation.component';
import { AddPunctuationComponent } from './components/admin/punctuation/add-punctuation/add-punctuation.component';
import { EditPunctuationComponent } from './components/admin/punctuation/edit-punctuation/edit-punctuation.component';
import { FooterdashComponent } from './components/admin/footerdash/footerdash.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/admin/perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './components/admin/offers/offers.component';
import { CompanyComponent } from './components/admin/company/company.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BlogComponent } from './components/blog/blog.component';
import { VistaBlogComponent } from './components/vista-blog/vista-blog.component';
import { EditCompanyComponent } from './components/admin/edit-company/edit-company.component';
import { MessagesComponent } from './components/admin/messages/messages.component';
import { MessagesAllComponent } from './components/admin/messages-all/messages-all.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { CategoriasPopularesComponent } from './components/categorias-populares/categorias-populares.component';
import { ProveedoresPopularesComponent } from './components/proveedores-populares/proveedores-populares.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ListBlogComponent } from './components/admin/blog/list-blog/list-blog.component';
import { CreateBlogComponent } from './components/admin/blog/create-blog/create-blog.component';
import { EditBlogComponent } from './components/admin/blog/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    LoginComponent,
    CategoriasComponent,
    DetailsComponent,
    BreadcumbsComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    CategoryComponent,
    CoutriesComponent,
    CitiesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddCountryComponent,
    EditCountryComponent,
    EditCityComponent,
    AddCityComponent,
    PlansComponent,
    AddPlanComponent,
    UpdatePlanComponent,
    TypeDocumentComponent,
    AddTypeDocumentComponent,
    UpdateTypeDocumentComponent,
    TypeCompanyComponent,
    AddTypeCompanyComponent,
    UpdateTypeCompanyComponent,
    PromotionsComponent,
    AddPromotionComponent,
    EditPromotionComponent,
    ViewpromotionComponent,
    ProvidersComponent,
    AddProviderComponent,
    UpdateProviderComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
    ViewProviderComponent,
    CommentsComponent,
    AddCommentComponent,
    EditCommentComponent,
    ServicesComponent,
    AddServiceComponent,
    UpdateServiceComponent,
    TypeClientComponent,
    AddTypeClientComponent,
    UpdateTypeClientComponent,
    ProveedoresComponent,
    PermissionsComponent,
    AddPermisoComponent,
    EditPermisoComponent,
    RoleComponent,
    EditRoleComponent,
    AddRoleComponent,
    ViewCategoryComponent,
    PunctuationComponent,
    AddPunctuationComponent,
    EditPunctuationComponent,
    FooterdashComponent,
    RegistroComponent,
    PerfilComponent,
    OffersComponent,
    CompanyComponent,
    BlogComponent,
    VistaBlogComponent,
    EditCompanyComponent,
    MessagesComponent,
    MessagesAllComponent,
    PoliticasComponent,
    PreguntasComponent,
    CategoriasPopularesComponent,
    ProveedoresPopularesComponent,
    NosotrosComponent,
    ListBlogComponent,
    CreateBlogComponent,
    EditBlogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SliderCarouselModule,
    NgxSpinnerModule,
    GoogleChartsModule,
    NgSelectModule,
    RecaptchaV3Module,
    EditorModule
  ],
  providers: [
    RecaptchaV3Module,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Lf3ntYbAAAAAPCNU0DgOF5VCGR6C6sBZdzyQx6Z' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
