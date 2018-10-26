import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Period } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
	baseUrl = 'http://activities.arrowheaddaycamp.com/api';
	periods: Period[];
	
	constructor(private http: HttpClient) { }

  	getAll(): Observable<Period[]> {
    	return this.http.get(`${this.baseUrl}/period/list`).pipe(
      	map((res) => {
        	this.periods = res['data'];
        	return this.periods;
    	}),
    	catchError(this.handleError));
  	}

  	private handleError(error: HttpErrorResponse) {
    	console.log(error);
    	return throwError('Error! something went wrong.');
  	}
}