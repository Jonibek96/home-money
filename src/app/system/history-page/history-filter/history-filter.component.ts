import {Component, EventEmitter, Input, Output} from '@angular/core';

import {CategoryModel} from '../../shared/model/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApplay = new EventEmitter<any>();
  @Input() categories: CategoryModel[] = [];
  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  constructor() {
  }

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedCategories = [];
    this.selectedTypes = [];
    this.onFilterCancel.emit();
  }

  handleChange({checked, value}) {
    if (checked) {
      this.selectedTypes.indexOf(value) === -1 ? this.selectedTypes.push(value) : null;
    } else {
      this.selectedTypes = this.selectedTypes.filter(i => i !== value);
    }
  }

  handleChangecategory({checked, value}) {
    if (checked) {
      this.selectedCategories.indexOf(value) === -1 ? this.selectedCategories.push(value) : null;
    } else {
      this.selectedCategories = this.selectedCategories.filter(i => i !== value);
    }
  }

  applayFilter() {
    this.onFilterApplay.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
