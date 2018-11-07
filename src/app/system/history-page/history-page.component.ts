import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';
import {CategoryService} from '../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {CategoryModel} from '../shared/model/category.model';
import {EventModel} from '../shared/model/event-model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];
  filteredEvents: EventModel[] = [];
  isLoaded = false;
  chartData = [];
  isFilterVisible = false;

  constructor(private categoryService: CategoryService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoryService.getCategory(),
      this.eventService.getEvents(),
    ).subscribe((data: [CategoryModel[], EventModel[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.setOriginal();
      this.calculateChart();
      this.isLoaded = true;
    });
  }

  calculateChart(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catevent = this.filteredEvents.filter((e: any) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catevent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
private setOriginal(){
    this.filteredEvents = this.events.slice();
}
  private toggleFilter(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilter(true);
  }

  onFilterApplay(filterData) {
    this.toggleFilter(false);
    this.setOriginal();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.filteredEvents = this.filteredEvents
      .filter((e)=>{
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) =>{
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e)=>{
        const momentData = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentData.isBetween(startPeriod, endPeriod);
      })
      this.calculateChart();
  }

  onFilterCancel() {
    this.toggleFilter(false);
    this.calculateChart();
    this.setOriginal();
  }
}
