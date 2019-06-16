import {Injectable} from '@angular/core';
import {AuthData} from '../models/auth-data.model';
import * as fromRoot from '../reducers';
import * as UI from '../reducers/ui/ui.actions';
import * as Auth from '../reducers/auth/auth.actions';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {UiService} from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UiService,
              private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/admin']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/auth']);
      }
    });
  }

  register(authData: AuthData, agencyName: string) {
    this.store.dispatch(new UI.StartLoading());
    console.log(agencyName);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(userCredential => {
        return this.afAuth.auth.currentUser.updateProfile({displayName: agencyName});
      })
      .then(userUpdated => {
        return this.afAuth.auth.currentUser.sendEmailVerification();

      })
      .then(emailVerificationSent => {
        console.log(emailVerificationSent);
        this.uiService.showSnackbar('Veuillez consulter votre boite email pour valider votre inscription.', null, 5000);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        console.log(error);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        console.log(error);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  setNewUser() {
    this.store.dispatch(new Auth.SetNewUser());
  }

  setOldUser() {
    this.store.dispatch(new Auth.SetOldUser());
  }
}
