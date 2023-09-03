import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

let collapsibleContentIdSequence = 0;
export type BrnCollapsibleState = 'open' | 'closed';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'brn-collapsible',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.data-state]': 'state()',
    '[attr.disabled]': 'collapsibleDisabled()',
  },
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BrnCollapsibleComponent {
  private _cdr = inject(ChangeDetectorRef);
  state = signal<BrnCollapsibleState>('closed');
  contentId = signal('brn-collapsible-content-' + collapsibleContentIdSequence++);

  private _disabled = signal<true | undefined>(undefined);
  @Input()
  set disabled(value: BooleanInput) {
    this._disabled.set(coerceBooleanProperty(value) ? true : undefined);
  }
  collapsibleDisabled = this._disabled.asReadonly();

  // create an input for default state
  @Input()
  set defaultState(value: BrnCollapsibleState) {
    this.state.set(value);
  }

  public toggle() {
    this.state.set(this.state() === 'closed' ? 'open' : 'closed');
    this._cdr.detectChanges();
  }
}
