import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ModalAboutComponent } from '../modal-about/modal-about.component';


@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html',
	//styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    title = 'app';

    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private modalService: NgbModal) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    open() {
        // const modalRef = this.modalService.open(ModalComponent);
        const modalRef = this.modalService.open(ModalAboutComponent);
        modalRef.componentInstance.title = 'About';
      }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}