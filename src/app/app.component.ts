import { Component, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';

import json from '../lib/package.json';

@Component({
  selector: 'ng2-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  version = VERSION;

  constructor(t: Title) {
    const current = t.getTitle();
    if (json) {
      t.setTitle(`${current}: v${json.version}`);
    }
  }
}
