import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { IEnrollee } from 'src/app/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public enrolleeForm: FormGroup = new FormGroup({});
  private _id!: string | null;
  private _subscriber!: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _api: ApiService
  ) {
    this.enrolleeForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('id');
    if (this._id) {
      this.getEnrolleeDetails(this._id);
    } else {
      this._router.navigate(['..']);
    }
  }

  ngOnDestroy(): void {
    this._subscriber.unsubscribe();
  }

  getEnrolleeDetails(id: string): void {
    this._subscriber = this._api.getEnrollee(id).subscribe(
      (response: IEnrollee) => {
        this.enrolleeForm.patchValue(response);
      },
      (error) => {
        this._toastr.error(error, 'Error');
        this._router.navigate(['..']);
      }
    );
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this._api.updateEnrollee(form.value).subscribe(
        (response: IEnrollee) => {
          this._toastr.success(
            `${response.name} details updated successfully!`,
            'Success'
          );
          this._router.navigate(['..']);
        },
        (error) => {
          this._toastr.error(error, 'Error');
          this._router.navigate(['..']);
        }
      );
    }
  }
}
