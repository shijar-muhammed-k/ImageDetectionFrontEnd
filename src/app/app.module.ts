import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ReportListComponent } from './admin/report-list/report-list.component';
import { ContactListComponent } from './admin/contact-list/contact-list.component';
import { CheckComponent } from './user/check/check.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptor/http-config.interceptor';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PreviewImageComponent } from './shared/preview-image/preview-image.component';
import { ReplyMessageComponent } from './shared/reply-message/reply-message.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    ReportListComponent,
    ContactListComponent,
    CheckComponent,
    ContactUsComponent,
    ProfileComponent,
    LoginComponent,
    PreviewImageComponent,
    ReplyMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
