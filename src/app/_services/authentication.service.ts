import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	baseUrl = 'http://activities.arrowheaddaycamp.com/api';
	user: User[];
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
		return this.http.post<any>(`${this.baseUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(res => {
				// login successful if there's a jwt token in the response
				this.user = res['data'];
                
				//if (this.user && this.user.token) {
				if (this.user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                }
                return this.user;
            }),
    		catchError(this.handleError));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
		//this.router.navigate(['/login']);
    }
	
	private handleError(error: HttpErrorResponse) {
    	console.log(error);
    	return throwError('Error! something went wrong.');
  	}
}