import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ModalUserComponent } from '../modal-user/modal-user.component';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
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
        const modalRef = this.modalService.open(ModalUserComponent);
        modalRef.componentInstance.title = 'User';
      }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}