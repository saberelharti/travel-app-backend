import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authenticator: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.registerForm = new FormGroup({
      agencyName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onRegister() {
    this.authenticator.register({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }, this.registerForm.value.agencyName);
  }

  onOldUser() {
    this.authenticator.setOldUser();
  }
}
