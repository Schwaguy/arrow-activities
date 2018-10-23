import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatFormFieldModule, 
	MatInputModule, 
	MatButtonModule, 
	MatNativeDateModule, 
	MatDatepickerModule, 
    BrowserAnimationsModule
  ],
  exports: [
    MatFormFieldModule, 
	MatInputModule, 
	MatButtonModule, 
	MatNativeDateModule, 
	MatDatepickerModule, 
    BrowserAnimationsModule
  ],
  providers: [ MatDatepickerModule ],
})

export class MaterialModule {}