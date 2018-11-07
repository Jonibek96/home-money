import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoryModel} from '../../shared/model/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {MessageModel} from '../../../shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryModel[] = [];
  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();
  currentCategoryId = 1;
  currentCategory: CategoryModel;
  message: MessageModel;
  sub1: Subscription;

  constructor(private service: CategoryService) {
  }

  ngOnInit() {
    this.message = new MessageModel('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity < 0) capacity *= -1;
    const category = new CategoryModel(name, capacity, +this.currentCategoryId);
    this.sub1 = this.service.updateCategory(category)
      .subscribe((category: CategoryModel) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована.';
        window.setTimeout(() => this.message.text = '', 3000);
      });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
}
