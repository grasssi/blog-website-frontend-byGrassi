import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { CategoryComponent } from './Category/categorycomponent';
import { CategoryComponentComponent } from './common/category-component/category-component.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ReverseArrayPipe } from './pipes/reverse-array.pipe';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SignupComponent } from './signup/signup.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    WriteBlogComponent,
    BlogComponent,
    AllBlogsComponent,
    ReverseArrayPipe,
    ProfileEditComponent,
    CategoryComponentComponent,
    CategoryComponent,
    FilterPipe
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
