import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  mealTypes: Array<string>;
  readonly separatorKeysCodes: Array<number> = [ENTER, COMMA];

  constructor(
    public profileService: ProfileService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.mealTypes = this.profileService.user.mealTypes;
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if (value) {
      this.spinner.show();
      this.mealTypes.push(value);
      this.profileService.setMealTypes(this.mealTypes)
        .pipe(finalize(() => this.spinner.hide())).subscribe();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeType(type: string): void {
    this.spinner.show();
    const index = this.mealTypes.indexOf(type);

    if (index >= 0) {
      this.mealTypes.splice(index, 1);
      this.profileService.setMealTypes(this.mealTypes)
        .pipe(finalize(() => this.spinner.hide())).subscribe();
    }
  }
}
