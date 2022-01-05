import {Component, EventEmitter, forwardRef, HostBinding, Input, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: "app-browser-datepicker",
  templateUrl: "./browser-datepicker.component.html",
  styleUrls: ["./browser-datepicker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrowserDatepickerComponent),
      multi: true,
    }
  ],
})
export class BrowserDatepickerComponent implements ControlValueAccessor {
  @HostBinding('attr.placeholder')
  @Input()
  placeholder = 'Sélectionner une date';

  @HostBinding('attr.id')
  @Input()
  id = '';

  @HostBinding('attr.min')
  @Input()
  min = '';

  @HostBinding('attr.max')
  @Input()
  max = '9999-12-12';

  type = 'date';

  @Input()
  isDisabled;

  @Input()
  value: string = '';
  private propagateChange = (_: any) => { };

  @Output() onSelectValue = new EventEmitter<string>();

  constructor() {}

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(value: any): void {
    if (value) {
      if (typeof value === 'object') value = value.toISOString();
      value = value.substring(0, 10);
      this.value = value.substring(0, 10);
    }
  }

  onChange(event) {
    const value = event.target.value;
    if (value) {
      this.value = value;
      if (this.min && this.value < this.min) {
        this.value = '';
      }
      if (this.max && this.value > this.max) {
        this.value = '';
      }
      this.onSelectValue.emit(this.value);
      this.propagateChange(this.value);
    }
    else {
      this.value = null;
      this.onSelectValue.emit(this.value);
      this.propagateChange(this.value);
    }
  }
}
