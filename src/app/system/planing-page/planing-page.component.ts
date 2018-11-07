import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {EventsService} from '../shared/services/events.service';
import {CategoryService} from '../shared/services/category.service';
import {BillModel} from '../shared/model/bill.model';
import {CategoryModel} from '../shared/model/category.model';
import {EventModel} from '../shared/model/event-model';

@Component({
  selector: 'app-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  bill: BillModel;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  sub1: Subscription;

  constructor(private billSevice: BillService,
              private categoryService: CategoryService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billSevice.getBill(),
      this.categoryService.getCategory(),
      this.eventsService.getEvents()
    ).subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategotyCost(cat: CategoryModel): number {
    const catEvents = this.events.filter((e: any) => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getPercent(cat: CategoryModel): number {
    const percent = (100 * this.getCategotyCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: CategoryModel): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: CategoryModel): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
