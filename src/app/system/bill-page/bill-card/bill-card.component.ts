import {Component, Input, OnInit} from '@angular/core';

import {BillModel} from '../../shared/model/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: BillModel;
  @Input() currency: any;
  dolar: number;
  evro: number;
  somoni: number;

  constructor() {
  }

  ngOnInit() {
    const {Valute} = this.currency;
    this.dolar = Valute['USD']['Value'] * this.bill.value;
    this.evro = Valute['EUR']['Value'] * this.bill.value;
    this.somoni = Valute['TJS']['Value'] * this.bill.value;
  }

}
