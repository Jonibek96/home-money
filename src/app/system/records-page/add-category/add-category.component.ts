import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoryService} from '../../shared/services/category.service';
import {CategoryModel} from '../../shared/model/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  @Output() categotyAdd = new EventEmitter<CategoryModel>();
  sub1: Subscription;

  constructor(private service: CategoryService) {
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) capacity *= -1;
    const category = new CategoryModel(name, capacity);
    this.sub1 = this.service.addCategory(category)
      .subscribe((category: CategoryModel) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.categotyAdd.emit(category);
      });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
}
