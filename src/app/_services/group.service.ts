import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Group } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
	baseUrl = 'http://activities.arrowheaddaycamp.com/api';
	groups: Group[];
	
	constructor(private http: HttpClient) { }

  	getAll(): Observable<Group[]> {
    	return this.http.get(`${this.baseUrl}/bunks/groups`).pipe(
      	map((res) => {
        	this.groups = res['data'];
        	return this.groups;
    	}),
    	catchError(this.handleError));
  	}

  	private handleError(error: HttpErrorResponse) {
    	console.log(error);
    	return throwError('Error! something went wrong.');
  	}
}