import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Bunk } from '../_models';
//import { Group } from '../_models';
import { BunkService } from '../_services';

import { Group } from '../_models';
import { GroupService } from '../_services';

import { Counselor } from '../_models';
import { CounselorService } from '../_services';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-root',
  templateUrl: 'bunk.component.html',
  styleUrls: ['bunk.component.css']
})
export class BunkComponent implements OnInit {
	
  currentUser: User;
  users: User[] = [];
	
  bunks: Bunk[];
  bunk = new Bunk('',0,0);
	
  groups: Group[];
  group = new Group('','',0,0);	
  
  counselors: Counselor[];
  counselor = new Counselor();
  
  error = '';
  success = '';

  constructor(private bunkService: BunkService, private userService: UserService, private counselorService: CounselorService,  private groupService: GroupService) {
	   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
	  this.getBunks();
	  //this.getGroups();
	  this.loadGroups()
	  this.loadCounselors();
  }

  getBunks(): void {
    this.bunkService.getAll().subscribe(
      (res: Bunk[]) => {
        this.bunks = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  /*getGroups(): void {
    this.bunkService.getGroups().subscribe(
      (res: Group[]) => {
        this.groups = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }*/
  
  addBunk(f) {
    this.resetErrors();
    this.bunkService.store(this.bunk)
      .subscribe(
        (res: Bunk[]) => {
          // Update the list of bunks
          this.bunks = res;

          // Inform the user
          this.success = 'Bunk Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  updateBunk(name, groupID, counselor, id) {
    this.resetErrors();
    this.bunkService.update({ name: name.value, groupID: groupID.value, counselor: counselor.value, id: +id })
      .subscribe(
        (res) => {
          this.bunks = res;
          this.success = 'Bunk Update Successful';
        },
        (err) => this.error = err
      );
  }

  deleteBunk(id) {
    this.resetErrors();

    this.bunkService.delete(+id)
      .subscribe(
        (res: Bunk[]) => {
          this.bunks = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }
  
  private loadGroups() {
      this.groupService.getAll().pipe(first()).subscribe(groups => { 
        this.groups = groups; 
      });
  }

	private loadCounselors() {
        this.counselorService.getCounselor().pipe(first()).subscribe(counselors => { 
            this.counselors = counselors;  
        });
  }

  private resetErrors(){
    	this.success = '';
    	this.error   = '';
	}

}