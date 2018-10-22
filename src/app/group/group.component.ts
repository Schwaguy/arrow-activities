import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Group } from '../_models';
import { GroupService } from '../_services';

@Component({
  selector: 'app-root',
  //templateUrl: 'group.component.html',
  //styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit {
  groups: Group[];
  group = new Group('','',0,0);	
  	
  error = '';
  success = '';

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
	this.getGroups();  
  }

  getGroups(): void {
    this.groupService.getGroups().subscribe(
      (res: Group[]) => {
        this.groups = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}