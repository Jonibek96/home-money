import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlaningPageComponent} from './planing-page/planing-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {SystemComponent} from './system.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {BillCardComponent} from './bill-page/bill-card/bill-card.component';
import {CarrencyCardComponent} from './bill-page/carrency-card/carrency-card.component';
import {BillService} from './shared/services/bill.service';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {AddEventComponent} from './records-page/add-event/add-event.component';
import {AddCategoryComponent} from './records-page/add-category/add-category.component';
import {EditCategoryComponent} from './records-page/edit-category/edit-category.component';
import {CategoryService} from './shared/services/category.service';
import {EventsService} from './shared/services/events.service';
import {HistoryCardComponent} from './history-page/history-card/history-card.component';
import {HistoryEventsComponent} from './history-page/history-events/history-events.component';
import {HostoryDetailComponent} from './history-page/hostory-detail/hostory-detail.component';
import {HistoryFilterComponent} from './history-page/history-filter/history-filter.component';
import {FilterPipe} from './shared/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlaningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    BillCardComponent,
    CarrencyCardComponent,
    MomentPipe,
    FilterPipe,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    HistoryCardComponent,
    HistoryEventsComponent,
    HostoryDetailComponent,
    HistoryFilterComponent
  ],
  providers: [BillService, CategoryService, EventsService]
})
export class SystemModule {

}
