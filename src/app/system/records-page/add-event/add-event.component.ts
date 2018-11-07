import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {mergeMap} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs';

import {EventsService} from '../../shared/services/events.service';
import {EventModel} from '../../shared/model/event-model';
import {BillService} from '../../shared/services/bill.service';
import {CategoryModel} from '../../shared/model/category.model';
import {BillModel} from '../../shared/model/bill.model';
import {MessageModel} from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryModel[] = [];
  type = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  message: MessageModel;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private service: EventsService,
              private billservice: BillService) {
  }

  ngOnInit() {
    this.message = new MessageModel('danger', '');
  }


  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 3000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount < 0) amount *= -1;
    const event = new EventModel(type, amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), description);
    this.sub1 = this.billservice.getBill()
      .subscribe((bill: BillModel) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`На счету недастаточно средств. Вам нехватает${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
        this.sub2 = this.billservice.updateBill({value, currency: bill.currency}).pipe(
          mergeMap(() => this.service.addEvent(event))
        ).subscribe(() => {
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          });
        });

      });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }
}
