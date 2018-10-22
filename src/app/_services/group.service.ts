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

  	getGroups(): Observable<Group[]> {
    	return this.http.get(`${this.baseUrl}/bunks/groups`).pipe(
      	map((res) => {
        	this.groups = res['data'];
        	return this.groups;
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
  	}

  	update(bunk: Bunk): Observable<Bunk[]> {
    	return this.http.put(`${this.baseUrl}/bunks/update`, { data: bunk })
      	.pipe(map((res) => {
        	const theBunk = this.bunks.find((item) => {
          		return +item['id'] === +bunk['id'];
        	});
        	if (theBunk) {
          		theBunk['name'] = bunk['name'];
				theBunk['groupID'] = +bunk['groupID'];
        	}
        	return this.bunks;
      	}),
      	catchError(this.handleError));
  	}

  	delete(id: number): Observable<Bunk[]> {
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