import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing } from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, BunkService, ActivityService, WeekService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { UserComponent } from './user';
import { BunkComponent } from './bunk';
//import { GroupComponent } from './group';
//import { CounslorComponent } from './counselor';
import { ActivityComponent } from './activity';
import { WeekComponent } from './week';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
		FormsModule,
        routing,
		NgbModule,
		//MaterialModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent, 
        RegisterComponent,
		UserComponent,
		BunkComponent,
		//GroupComponent,
		//CounselorComponent,
		ActivityComponent,
		WeekComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
		BunkService,
		//GroupService,
		//CounselorService,
		ActivityService,
		WeekService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }