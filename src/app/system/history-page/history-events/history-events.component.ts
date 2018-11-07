import {Component, Input, OnInit} from '@angular/core';

import {CategoryModel} from '../../shared/model/category.model';
import {EventModel} from '../../shared/model/event-model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: CategoryModel[] = [];
  @Input() events: EventModel[] = [];
  data = new Date();
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find((c) => c.id === e.category).name;
    });
  }

  getEventClass(e: any) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCritery(fiald: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[fiald];
    this.searchField = fiald;
  }

}
