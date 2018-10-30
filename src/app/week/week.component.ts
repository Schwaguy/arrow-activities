import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Week } from '../_models';
import { WeekService } from '../_services';

@Component({
  selector: 'app-week',
  templateUrl: 'week.component.html',
  //styleUrls: ['group.component.css']
})
export class WeekComponent implements OnInit {
  weeks: Week[];
  week = new Week('',new Date().toISOString().substring(0, 10),new Date().toISOString().substring(0, 10),0);	
  	
  error = '';
  success = '';

  constructor(private weekService: WeekService) {
  }

  ngOnInit() {
	this.getAll();  
  }

  getAll(): void {
    this.weekService.getAll().subscribe(
      (res: Week[]) => {
        this.weeks = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
	
  updateWeek(name, startDate, endDate, id) {
    this.resetErrors();
    this.weekService.update({ name: name.value, startDate: startDate.value, endDate: endDate.value, id: +id })
      .subscribe(
        (res) => {
          this.weeks = res;
          this.success = 'Week Update Successful';
        },
        (err) => this.error = err
      );
  }	
	
  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}