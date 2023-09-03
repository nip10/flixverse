import { Directive, inject, signal } from '@angular/core';
import { BrnCollapsibleComponent } from './brn-collapsible.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'button[brnCollapsibleTrigger]',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.data-state]': 'state()',
    '[attr.disabled]': 'disabled()',
    '[attr.aria-expanded]': 'state() === "open"',
    '[attr.aria-controls]': 'ariaControls()',
    '(click)': 'toggleCollapsible()',
  },
})
export class BrnCollapsibleTriggerDirective {
  private _collapsible = inject(BrnCollapsibleComponent, { optional: true });
  state = this._collapsible?.state ?? signal(false).asReadonly();
  disabled = this._collapsible?.collapsibleDisabled ?? signal(undefined).asReadonly();
  ariaControls = this._collapsible?.contentId;
  constructor() {
    if (!this._collapsible) {
      throw Error('Collapsible trigger directive can only be used inside a brn-collapsible element.');
    }
  }

  toggleCollapsible() {
    this._collapsible?.toggle();
  }
}
