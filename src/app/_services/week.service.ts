import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Week } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
	baseUrl = 'http://activities.arrowheaddaycamp.com/api';
	weeks: Week[];
	
	constructor(private http: HttpClient) { }

  	getAll(): Observable<Week[]> {
    	return this.http.get(`${this.baseUrl}/weeks/list`).pipe(
      	map((res) => {
        	this.weeks = res['data'];
        	return this.weeks;
    	}),
    	catchError(this.handleError));
  	}
	
	/*store(bunk: Bunk): Observable<Bunk[]> {
    	return this.http.post(`${this.baseUrl}/bunks/store`, { data: bunk })
      	.pipe(map((res) => {
        	this.bunks.push(res['data']);
        	return this.bunks;
      	}),
      	catchError(this.handleError));
  	}*/

  	update(week: Week): Observable<Week[]> {
    	return this.http.put(`${this.baseUrl}/weeks/update`, { data: week })
      	.pipe(map((res) => {
        	const theWeek = this.weeks.find((item) => {
          		return +item['id'] === +week['id'];
        	});
        	if (theWeek) {
          		theWeek['name'] = week['name'];
				theWeek['start'] = week['start'];
				theWeek['end'] = week['end'];
        	}
        	return this.weeks;
      	}),
      	catchError(this.handleError));
  	}
	
	/*delete(id: number): Observable<Bunk[]> {
    	const params = new HttpParams()
      	.set('id', id.toString());

    	return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      	.pipe(map(res => {
        	const filteredBunks = this.bunks.filter((bunk) => {
          		return +bunk['id'] !== +id;
        	});
        	return this.bunks = filteredBunks;
      	}),
      	catchError(this.handleError));
  	}*/

  	private handleError(error: HttpErrorResponse) {
    	console.log(error);
    	return throwError('Error! something went wrong.');
  	}
}