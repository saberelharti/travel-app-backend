import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isNewUser$: Observable<boolean>;

  constructor(private authenticator: AuthService, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isNewUser$ = this.store.select(fromRoot.getIsNewUser);
  }
}
