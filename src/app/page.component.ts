import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Uses global values
 */
@Component({
  selector: 'ng2-page-1',
  template: `
  <p class="text-center">
    <strong>Current View: {{ title }}</strong>
  </p>
  <ng-adsense></ng-adsense>
  <ng-adsense></ng-adsense>
  `,
})
export class PageComponent {
  title = 'Page 1';
}

/**
 * Uses local ad values
 */
@Component({
  selector: 'ng2-page-2',
  template: `
  <p class="text-center">
    <strong>Current View: {{ title }}</strong>
  </p>
  <ng2-adsense
    [adClient]="'ca-pub-7640562161899788'"
    [adSlot]="2930227358" [width]="320" [height]="108">
  </ng2-adsense>
  <ng2-adsense
    [display]="'inline-block'"
    [width]="320" [height]="108">
  </ng2-adsense>
  `,
})
export class OtherPageComponent extends PageComponent {
  title = 'Page 2';
}

/**
 * Refreshes ads on params changes
 */
@Component({
  selector: 'ng2-page-3',
  template: `
  <p class="text-center">
    <strong>Current View: {{ title }}</strong>
  </p>
  <ng2-adsense *ngIf="!loading"></ng2-adsense>
  <ng2-adsense *ngIf="!loading"></ng2-adsense>
  `,
})
export class ReloadPageComponent implements OnInit {
  title = 'Page 3';
  loading = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.title = `Page ${params.id}`;
      this.loading = true;
      setTimeout(() => (this.loading = false), 200);
    });
  }
}
