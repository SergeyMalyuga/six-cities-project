import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIRoute, AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly APIRoute = APIRoute;
  protected readonly AppRoute = AppRoute;
}
