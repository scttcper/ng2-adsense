import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'ng2-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  version = VERSION;
}
