import {Component, OnInit} from '@angular/core';

import {CategoryModel} from '../shared/model/category.model';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories: CategoryModel[] = [];
  isLoaded = false;

  constructor(private service: CategoryService) {
  }

  ngOnInit() {
    this.service.getCategory()
      .subscribe((categoty: CategoryModel[]) => {
        this.categories = categoty;
        this.isLoaded = true;
      });
  }

  onCategoryAdd(categoty: CategoryModel) {
    this.categories.push(categoty);
  }

  onCategoryWasEdited(category: CategoryModel) {
    const idx = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

}
