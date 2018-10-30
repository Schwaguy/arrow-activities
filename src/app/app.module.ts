import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing } from './app.routing';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, BunkService, ActivityService, WeekService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UserComponent } from './user';
import { BunkComponent } from './bunk';
import { ActivityComponent } from './activity';
import { WeekComponent } from './week';
import { ModalComponent } from './modal/modal.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { AboutComponent } from './about/about.component';
import { ModalAboutComponent } from './modal-about/modal-about.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
		FormsModule,
        routing,
        NgbModule.forRoot(),
        //NgbModal, 
        //NgbActiveModal
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent, 
        RegisterComponent,
		UserComponent,
		BunkComponent,
		ActivityComponent,
		WeekComponent,
		ModalComponent,
		ModalUserComponent,
		AboutComponent,
		ModalAboutComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
		BunkService,
		ActivityService,
        WeekService,
        NgbActiveModal,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    entryComponents: [
        ModalAboutComponent,
        ModalUserComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }