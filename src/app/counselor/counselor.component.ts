import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Counselor } from '../_models';
import { CounselorService } from '../_services';

@Component({
  selector: 'app-root',
  //templateUrl: 'group.component.html',
  //styleUrls: ['group.component.css']
})
export class CounselorComponent implements OnInit {
  counselors: Counselor[];
  counselor = new Counselor();	
  	
  error = '';
  success = '';

  constructor(private counselorService: CounselorService) {
  }

  ngOnInit() {
	this.getCounselors();  
  }

  getCounselors(): void {
    this.counselorService.getCounselor().subscribe(
      (res: Counselor[]) => {
        this.counselors = res;
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