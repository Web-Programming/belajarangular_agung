import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
     <article >
      <img class="listing-photo" [src]="baseUrl + housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h1 class="section-heading">Apply to live here</h1>
        <form [formGroup]="applyForm" (submit)="submitApplyForm()">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName" placeholder="Input first name">
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" placeholder="Input last name">
          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email" placeholder="Input email">
          <button type="submit" class="primary">Apply</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = 0;
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined
  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  
  })
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  

  constructor(){
    this.housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(this.housingLocationId).then(location => {
      this.housingLocation = location;
    })
    console.table(this.housingLocation)
  }

  submitApplyForm() {
    if (this.applyForm.valid) {
      this.housingService
        .submitApplication(
          this.applyForm.value.firstName ?? '',
          this.applyForm.value.lastName ?? '',
          this.applyForm.value.email ?? ''
        )
        .then(() => {
          alert('Application submitted successfully!');
          this.applyForm.reset();
        })
        .catch((error) => {
          console.error('Error:', error);
          alert(`Failed to submit application: ${error.message}`);
        });
    } else {
      alert('Please fill in all fields.');
    }
  }
}