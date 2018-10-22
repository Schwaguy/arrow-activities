import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Activity } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
	baseUrl = 'http://activities.arrowheaddaycamp.com/api';
	activities: Activity[];
	
	constructor(private http: HttpClient) { }

  	getAll(): Observable<Activity[]> {
    	return this.http.get(`${this.baseUrl}/activity/list`).pipe(
      	map((res) => {
        	this.activities = res['data'];
        	return this.activities;
    	}),
    	catchError(this.handleError));
  	}
	
	store(activity: Activity): Observable<Activity[]> {
    	return this.http.post(`${this.baseUrl}/activity/store`, { data: activity })
      	.pipe(map((res) => {
        	this.activities.push(res['data']);
        	return this.activities;
      	}),
      	catchError(this.handleError));
  	}

  	update(activity: Activity): Observable<Activity[]> {
    	return this.http.put(`${this.baseUrl}/activity/update`, { data: activity })
      	.pipe(map((res) => {
        	const theActivity = this.activities.find((item) => {
          		return +item['id'] === +activity['id'];
        	});
        	if (theActivity) {
          		theActivity['name'] = activity['name'];
				theActivity['description'] = activity['description'];
        	}
        	return this.activities;
      	}),
      	catchError(this.handleError));
  	}

  	delete(id: number): Observable<Activity[]> {
    	const params = new HttpParams()
      	.set('id', id.toString());

    	return this.http.delete(`${this.baseUrl}/activity/delete`, { params: params })
      	.pipe(map(res => {
        	const filteredActivities = this.activities.filter((activity) => {
          		return +activity['id'] !== +id;
        	});
        	return this.activities = filteredActivities;
      	}),
      	catchError(this.handleError));
  	}

  	private handleError(error: HttpErrorResponse) {
    	console.log(error);
    	return throwError('Error! something went wrong.');
  	}
}