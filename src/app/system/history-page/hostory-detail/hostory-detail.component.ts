import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoryService} from '../../shared/services/category.service';
import {mergeMap} from 'rxjs/internal/operators';
import {EventModel} from '../../shared/model/event-model';
import {CategoryModel} from '../../shared/model/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-hostory-detail',
  templateUrl: './hostory-detail.component.html',
  styleUrls: ['./hostory-detail.component.scss']
})
export class HostoryDetailComponent implements OnInit, OnDestroy {
  events: EventModel;
  category: CategoryModel;
  isLoaded = false;
  sub1: Subscription;
  constructor(private router: ActivatedRoute,
              private eventService: EventsService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.sub1 = this.router.params.pipe(
      mergeMap((params: Params) => this.eventService.getEventById(params['id'])),
      mergeMap((event: EventModel)=> {
        this.events = event;
        return this.categoryService.getCategoryById(event.category);
      })
    ).subscribe((category: CategoryModel)=>{
      this.category = category;
      this.isLoaded = true;
    })
  }

  ngOnDestroy(){
    if (this.sub1) this.sub1.unsubscribe();
  }

}
