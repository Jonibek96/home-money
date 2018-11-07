import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {delay} from 'rxjs/internal/operators';

import {BillService} from '../shared/services/bill.service';
import {BillModel} from '../shared/model/bill.model';
import {UsersService} from '../../shared/services/users.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  currency: any;
  bill: BillModel;
  isLoaded = false;

  constructor(private service: BillService,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.service.getBill(),
      this.service.getCurrency()
    ).subscribe((data: [BillModel, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  onRefresh() {
    this.isLoaded = false;
    this.service.getCurrency()
      .pipe(
        delay(2000)
      )
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

}
