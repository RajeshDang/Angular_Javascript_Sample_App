import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IEnrollee } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public enrollees!: Observable<IEnrollee[]>;

  constructor(private _router: Router, private _api: ApiService) {}

  ngOnInit(): void {
    this.getAllEnrollees();
  }

  getAllEnrollees(): void {
    this.enrollees = this._api.getEnrollees();
  }

  editEnrollee(id: string): void {
    this._router.navigate([`details/${id}`]);
  }
}
