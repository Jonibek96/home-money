import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base.api';
import {BillModel} from '../model/bill.model';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<any> {
    return this.get('bill');
  }

  updateBill(bill: BillModel): Observable<any> {
    return this.post('bill', bill);
  }

  getCurrency(base: string = 'AUD'): Observable<any> {
    return this.http.get(`https://www.cbr-xml-daily.ru/daily_json.js?${base}`);
  }
}
