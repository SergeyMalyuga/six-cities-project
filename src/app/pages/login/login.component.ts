import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {Router} from '@angular/router';
import {selectAuthStatus} from '../../store/app/selectors/app.selectors';
import {filter, take} from 'rxjs';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {loadOffers} from '../../store/offer/actions/offer.actions';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store<AppState> = inject(Store<AppState>);
  private router: Router = inject(Router);

  public formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')]],
  });

  public onSubmit(){
    if(this.formGroup.valid) {
      const {email, password} = this.formGroup.value;
      this.store.dispatch(login({email, password}))
      this.store.select(selectAuthStatus).pipe(filter(status => status === AuthorizationStatus.AUTH),
        take(1)).subscribe(() => {
          this.store.dispatch(loadOffers());
          this.router.navigate([AppRoute.MAIN]);
      })
    }
  }
}
