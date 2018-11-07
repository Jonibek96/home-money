import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserModel} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data: Date = new Date();
  user: UserModel;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

}
