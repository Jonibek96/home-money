import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlaningPageComponent} from './planing-page/planing-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {HostoryDetailComponent} from './history-page/hostory-detail/hostory-detail.component';
import {AuthGuard} from '../shared/services/auth.guard';

const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'planing', component: PlaningPageComponent},
      {path: 'records', component: RecordsPageComponent},
      {path: 'history/:id', component: HostoryDetailComponent}
    ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
