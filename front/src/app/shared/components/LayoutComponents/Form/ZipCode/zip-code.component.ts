import { Component, EventEmitter, forwardRef, HostBinding, Input, Output} from '@angular/core'
import {CodePostalService} from '@app/services/code-postal.service';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZipCodeComponent),
      multi: true,
    }
  ],
})
export class ZipCodeComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  @Input()
  id = '';

  @Input() form: FormGroup;
  @Input() villeKey = '';
  @Output() cpEvent = new EventEmitter();

  cp: any[] = [];
  @Input()
  cpInput: string;

  value = '';
  private propagateChange = (_: any) => { };

  constructor(private codePostalService: CodePostalService) {

  }

  selectCodePostal() {
    const ville = this.form.get(this.villeKey);

    if (this.villeKey && ville) {
      const zipcode_regex = new RegExp('^[0-9]{5}$');

      if (this.cpInput && zipcode_regex.test(this.cpInput)) {
        this.codePostalService.getVilles(this.cpInput).subscribe((results: any) => {
          this.cp = results;
          if (results.length === 1) {
            ville.setValue(results[0].libelle_acheminement);
          } else {
            ville.setValue('');
          }
          this.cpEvent.emit(this.cp);
        });
      }
    }
    this.propagateChange(this.cpInput);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }
}
