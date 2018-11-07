import {Component, HostBinding} from '@angular/core';
import {fadeSateTrigger} from '../shared/animation/fade.animation';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  animations: [fadeSateTrigger]
})
export class SystemComponent {
  @HostBinding('@fade') a = true;
}
