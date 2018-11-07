import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-carrency-card',
  templateUrl: './carrency-card.component.html',
  styleUrls: ['./carrency-card.component.scss']
})
export class CarrencyCardComponent {
  data: Date = new Date();
  @Input() currency: any;
  currencies: string[] = ['USD', 'EUR', 'TJS'];

}
