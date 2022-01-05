import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class AppValidators {
  static telValidator(num): any {
    if (!num.value || num.pristine) {
      return null;
    }

    const TEL_REGEX = new RegExp("^([0-9]{2}|\\+[0-9]{2} ?[0-9] ?)[0-9 ]* ?([-] ?[0-9]{4}|[0-9]{2})$");

    num.markAsTouched();

    if (TEL_REGEX.test(num.value)) {
      return null;
    }

    return { invalidTel: true };
  }

  static atLeastOneTel(
    telKey: string,
    telMobileKey: string,
    noTelKey: string = null
  ) {
    return (group: FormGroup): { [key: string]: any } => {
      let tel = group.controls[telKey];
      let telMobile = group.controls[telMobileKey];

      if (noTelKey !== null) {
        let noTel = group.controls[noTelKey];
        if (noTel.value) {
          return null;
        }
      }

      if (!tel.value && !telMobile.value) {
        tel.setErrors({ atLeastOne: true });
        telMobile.setErrors({ atLeastOne: true });
        return null;
      }

      if (this.telValidator(tel)) {
        telMobile.markAsDirty();
        telMobile.updateValueAndValidity();
        return null;
      }
      if (this.telValidator(telMobile)) {
        tel.markAsDirty();
        tel.updateValueAndValidity();
        return null;
      }
    };
  }

  static dateRange(startDateKey: string, endDateKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let startDate = group.controls[startDateKey];
      let endDate = group.controls[endDateKey];

      let realStartDate = null, realEndDate = null;
      if (startDate.value) {
        if (typeof(startDate.value) === 'string') {
          realStartDate = new Date(startDate.value.substr(0, 4) + '-' + startDate.value.substr(5, 2) + '-' + startDate.value.substr(8, 2));
        } else {
          realStartDate = new Date(startDate.value.getFullYear(), startDate.value.getMonth(), startDate.value.getDate());
        }
      }

      if (endDate.value) {
        if (typeof(endDate.value) === 'string') {
          realEndDate = new Date(endDate.value.substr(0, 4) + '-' + endDate.value.substr(5, 2) + '-' + endDate.value.substr(8, 2));
        } else {
          realEndDate = new Date(endDate.value.getFullYear(), endDate.value.getMonth(), endDate.value.getDate());
        }
      }

      if (realStartDate && realEndDate && realStartDate > realEndDate) {
        startDate.setErrors({ startDate: true });
        endDate.setErrors({ endDate: true });
        return null;
      }
    };
  }

  static dateStart(startDateKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let startDate = group.controls[startDateKey];
      let now = new Date();
      let comparator = new Date(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate());

      if (startDate.value != null) {
        let start = new Date(startDate.value.substring(0, 4)+"-"+startDate.value.substring(5, 7)+"-"+startDate.value.substring(8, 10));
        if (start < comparator) {
          startDate.setErrors({ startDateValue: true });
          return null;
        } else {
          return null;
        }
      }
    };
  }

  static dateEnd(endDateKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let endDate = group.controls[endDateKey];
      let now = new Date();
      let comparator = new Date(now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate());

      if (endDate.value != null) {
        let end = new Date(endDate.value.substring(0, 4)+"-"+endDate.value.substring(5, 7)+"-"+endDate.value.substring(8, 10));
        if (end > comparator) {
          endDate.setErrors({ endDateValue: true });
          return null;
        } else {
          return null;
        }
      }
    };
  }

  static ageRange(ageMinKey: string, ageMaxKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let ageMin = group.controls[ageMinKey];
      let ageMax = group.controls[ageMaxKey];

      if (ageMin.value && ageMax.value && ageMin.value >= ageMax.value) {
        ageMin.setErrors({ ageMin: true });
        ageMax.setErrors({ ageMax: true });
        return null;
      }
    };
  }

  static hourRange(hourMinKey: string, hourMaxKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let hourMin = group.controls[hourMinKey];
      let hourMax = group.controls[hourMaxKey];

      if (hourMin.value && hourMax.value && hourMin.value > hourMax.value) {
        hourMin.setErrors({ hourMin: true });
        hourMax.setErrors({ hourMax: true });
        return null;
      }
    };
  }

  static confirmPassword(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ confirmPassword: true });
        return null;
      }
    };
  }

  static cleNumSecu(numSecuKey: string, cleNumSecuKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let numSecu = group.controls[numSecuKey];
      let cleNumSecu = group.controls[cleNumSecuKey];

      if (numSecu.value && numSecu.value.length === 13) {
        if (!cleNumSecu.value || cleNumSecu.value.length !== 2) {
          numSecu.setErrors({ numsecu: true });
        } else {
          let errors = numSecu.errors;
          if (errors) {
            delete errors.numsecu;
            numSecu.setErrors(errors);
            numSecu.updateValueAndValidity();
          }
        }
        return null;
      }
    };
  }

  static requiredIfFieldNotEmpty(notEmptyFieldKey: string, requiredFieldKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let notEmptyField = group.controls[notEmptyFieldKey];
      let requiredField = group.controls[requiredFieldKey];

      if (notEmptyField.value && requiredField.value === '') {
        requiredField.setErrors({ required: true });
      }
      return null;
    };
  }


  static checkboxObligatory(checkboxKey): any {
    if (checkboxKey.value) {
      return null;
    } else {
      return { checkboxObligatory: true };
    }
  }
}
