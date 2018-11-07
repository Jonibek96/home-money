import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {UsersService} from '../../shared/services/users.service';
import {UserModel} from '../../shared/models/user.model';
import {MessageModel} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeSateTrigger} from '../../shared/animation/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeSateTrigger]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: MessageModel;

  constructor(private servise: UsersService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title) {
            title.setTitle('Вход в систему')
  }

  ngOnInit() {
    this.message = new MessageModel('danger', '');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Теперь вы можете зайти в систему',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работы в системой вам нужно залогиниться ',
            type: 'warning'
          });
        }
      });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showMessage(message: any) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.servise.getUserByEmail(formData.email)
      .subscribe((user: UserModel) => {
        if (user) {
          if (user.email === formData.email && user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.auth.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Парол не верный',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такого пользвателя не существует',
            type: 'danger'
          });
        }
      });
  }

}
