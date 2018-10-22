import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Activity } from '../_models';
import { ActivityService } from '../_services';

@Component({
  selector: 'app-root',
  templateUrl: 'activity.component.html',
  //styleUrls: ['activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: Activity[];
  activity = new Activity('','',0);
	
  error = '';
  success = '';

  constructor(private activityService: ActivityService) {
	   //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
	  this.getActivities();
  }

  getActivities(): void {
    this.activityService.getAll().subscribe(
      (res: Activity[]) => {
        this.activities = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addActivity(f) {
    this.resetErrors();

    this.activityService.store(this.activity)
      .subscribe(
        (res: Activity[]) => {
          // Update
          this.activities = res;

          // Inform the user
          this.success = 'Activity Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  updateActivity(name, description, id) {
    this.resetErrors();
    this.activityService.update({ name: name.value, description: description.value, id: +id })
      .subscribe(
        (res) => {
          this.activities = res;
          this.success = 'Activity Update Successful';
        },
        (err) => this.error = err
      );
  }

  deleteActivity(id) {
    this.resetErrors();

    this.activityService.delete(+id)
      .subscribe(
        (res: Activity[]) => {
          this.activities = res;
          this.success = 'Deleted successfully';
        },
        (err) => this.error = err
      );
  }
	
  	private resetErrors(){
    	this.success = '';
    	this.error   = '';
	}

}