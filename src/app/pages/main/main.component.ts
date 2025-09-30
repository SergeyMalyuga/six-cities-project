import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [HeaderComponent, CardComponent],
})
export class MainComponent {}
