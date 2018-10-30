import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	baseUrl = 'http://activities.arrowheaddaycamp.com/api';
	users: User[];
	
    constructor(private http: HttpClient) { }
	
	/*getAll() {
        return this.http.get<User[]>(`/users`);
    }*/
	
	getAll() {
		return this.http.get<User[]>(`${this.baseUrl}/users/list`).pipe(map((res) => {
        	this.users = res['data'];
        	return this.users;
    	}),
    	catchError(this.handleError));
  	}
	
	getCounselors() {
		return this.http.get<User[]>(`${this.baseUrl}/users/counselors`).pipe(map((res) => {
        	this.users = res['data'];
        	return this.users;
    	}),
    	catchError(this.handleError));
  	}	
	
    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    /*register(user: User) {
        return this.http.post(`/users/register`, user);
    }*/
	
	//register(user: User): Observable<User[]> {
	register(user: User) {
		return this.http.post(`${this.baseUrl}/users/register`, { data: user }).pipe(map((res) => {
        	//this.users.push(res['data']);
        	//return this.users;
			return true;
      	}),
      	catchError(this.handleError));
  	}
	
    update(user: User) {
        return this.http.put(`${this.baseUrl}/users/` + user.id, user);
    }

    /*delete(id: number) {
        return this.http.delete(`${this.baseUrl}/users/` + id);
    }*/
	
	
	//delete(id: number): Observable<Bunk[]> {
	delete(id: number) {
    	const params = new HttpParams()
      	.set('id', id.toString());

    	return this.http.delete(`${this.baseUrl}/users/delete`, { params: params })
      	.pipe(map(res => {
        	const filteredUsers = this.users.filter((user) => {
          		return +user['id'] !== +id;
        	});
        	return this.users = filteredUsers;
      	}),
      	catchError(this.handleError));
  	}
	
	
	
	private handleError(error: HttpErrorResponse) {
    	console.log(error);
    	return throwError('Error! something went wrong.');
  	}
}