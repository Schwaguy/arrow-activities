import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Period } from '../_models';
import { PeriodService } from '../_services';

@Component({
  selector: 'app-root',
})
export class PeriodComponent implements OnInit {
  periods: Period[];
  period = new Period('','','','',0,0,0,0,0);	
  	
  error = '';
  success = '';

  constructor(private periodService: PeriodService) {
  }

  ngOnInit() {
	this.getAll();  
  }

  getAll(): void {
    this.periodService.getAll().subscribe(
      (res: Period[]) => {
        this.periods = res;
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