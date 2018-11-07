import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeSateTrigger} from '../shared/animation/fade.animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [fadeSateTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
