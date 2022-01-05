import {Component, Input, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BrowserDatepickerComponent } from '@shared/components/LayoutComponents/Form/BrowserDatepicker/browser-datepicker.component';
import { interval } from 'rxjs';
import * as moment from 'moment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.scss']
})
export class AdvancedTableComponent implements OnInit {
  @Input() filters;
  @Input() displayedColumns;
  @Input() service;
  @Input() dataGetter;
  @Input() sortBy;
  @Input() sortOrder;
  @Input() params;
  @Input() messageNoResultat;
  @Input() disabledSearchButton;
  @Input() unfolded;
  @Input() sessionFiltersName;
  @Input() filterButtons = [];
  @Input() filterButtonTemplate = TemplateRef;
  @Input() pageSize = 25;
  @Input() interval = null;
  @Input() intervalCondition = null;
  @Input() moreData = null;
  @Input() reload = false;
  @Input() filtersSize = null;
  @ViewChildren(BrowserDatepickerComponent) datepickers !: QueryList<BrowserDatepickerComponent>;

  searchForm: FormGroup;
  pageIndex = 1;
  total = 0;
  data = [];
  @Input()
  loading = true;
  nbDossier: number = 0;
  nbDossierSuivi: number = 0;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  resetForm(): void {
    this.searchForm.reset();
    // Reset date fields : change field to text type, et value to empty string and set field to date type
    this.datepickers.forEach((datepicker) => {
      datepicker.type = 'text';
      datepicker.value = '';
      datepicker.type = 'date';
    });
    this.searchData(true);
  }

  ngOnChanges() {
    if (this.reload) {
      this.ngOnInit();
    }
  }   

  ngOnInit(): void {
    this.searchForm = this.fb.group({});
    if (this.filters != undefined) {
      for (const filter of this.filters) {
        if (filter.type === 'date_range') {
          this.searchForm.addControl(filter.id + '_start', new FormControl());
          this.searchForm.addControl(filter.id + '_end', new FormControl());
        } else {
          this.searchForm.addControl(filter.id, new FormControl());
        }
      }
    }
    if (this.params) {
      for (const param of this.params) {
        if (!this.searchForm.contains(param.id)) {
          this.searchForm.addControl(param.id, new FormControl());
        }
        this.searchForm.get(param.id).setValue(param.value);
      }
    }

    // Get filters from session
    if (this.sessionFiltersName && sessionStorage.getItem(this.sessionFiltersName)) {
      this.searchForm.setValue(JSON.parse(sessionStorage.getItem(this.sessionFiltersName)));
      if (sessionStorage.getItem('searchResults_' + this.sessionFiltersName)) {
        this.data = JSON.parse(sessionStorage.getItem('searchResults_' + this.sessionFiltersName));
        this.loading = false;
      } else {
        if (this.verifySetValueInForm()) {
          this.searchData(false, true);
        }
        this.loading = false;
      }
      return;
    }

    if (
      this.disabledSearchButton === undefined ||
      this.disabledSearchButton === false
    ) {
      this.searchData(false, true);
    } else {
      this.loading = false;
    }
  }

  sort(sort: { key: string; value: string }): void {
    this.sortBy = sort.key;
    this.sortOrder = sort.value === 'ascend' ? 'asc' : 'desc';
    this.searchData();
  }

  searchData(reset: boolean = false, firstCall: boolean = false): void {
    if (this.disabledSearchButton) {
      if (!this.verifySetValueInForm()) {
        this.createSearchNotification();
        this.data = [];
        return;
      }
    }
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;

    // Update filters from session
    if (this.sessionFiltersName) {
      sessionStorage.setItem(this.sessionFiltersName, JSON.stringify(this.searchForm.value));
    }

    // unfold filters if at least one searched value is setted
    Object.keys(this.searchForm.controls).forEach(key => {
      if (this.searchForm.get(key).value) { this.unfolded = true; }
    });

    let condition = true;
    if (this.intervalCondition === 'import_doctolib') {
      condition = false;
    }

    if (this.interval !== null && reset === false) {
      if (firstCall) {
        this.service[this.dataGetter](
          JSON.stringify(this.searchForm.value),
          this.sortBy,
          this.sortOrder,
          this.pageIndex,
          this.pageSize
        ).subscribe((results: any) => {
          this.loading = false;
          this.total = results.total;
          this.data = results.data;
          this.data.forEach(element => {
            if (element.statut === 'En attente') {
              condition = true;
            }
          });
          if (this.sessionFiltersName) {
            sessionStorage.setItem('searchResults_' + this.sessionFiltersName, JSON.stringify(results.data));
          }

          if (condition) {
            let intervalSubs = interval(this.interval).subscribe(e => {
              this.service[this.dataGetter](
                JSON.stringify(this.searchForm.value),
                this.sortBy,
                this.sortOrder,
                this.pageIndex,
                this.pageSize
              ).subscribe((results: any) => {
                this.loading = false;
                this.total = results.total;
                this.data = results.data;
                condition = false;
                this.data.forEach(element => {
                  if (element.statut === 'En attente') {
                    condition = true;
                  }
                });
                if (!condition) {
                  setTimeout(()=> intervalSubs.unsubscribe());
                }
                if (this.sessionFiltersName) {
                  sessionStorage.setItem('searchResults_' + this.sessionFiltersName, JSON.stringify(results.data));
                }
              });
            });
        
            this.router.events.subscribe((val) => {
              if (val instanceof NavigationEnd) {
                setTimeout(()=> intervalSubs.unsubscribe());
              }
            });
          }
        });
      }

    } else {
      this.service[this.dataGetter](
        JSON.stringify(this.searchForm.value),
        this.sortBy,
        this.sortOrder,
        this.pageIndex,
        this.pageSize
      ).subscribe((results: any) => {
        if (this.moreData === 'dossiers') {
          results.data.forEach(element => {
            this.nbDossier++;
            if (element.date_suivi_permis !== null) {
              this.nbDossierSuivi++;
            }
          });
        }
        this.loading = false;
        this.total = results.total;
        this.data = results.data;
        if (this.sessionFiltersName) {
          sessionStorage.setItem('searchResults_' + this.sessionFiltersName, JSON.stringify(results.data));
        }
      });
    }
  }

  verifySetValueInForm() {
    let filter: String = JSON.stringify(this.searchForm.getRawValue());
    filter = filter.slice(1, filter.length - 1);
    const filterArray = filter.split(',');
    for (const _champ of filterArray) {
      const champ = _champ.split(':')[1];
      if (
        champ !== 'null' &&
        champ.search(new RegExp('[a-z]|[A-Z]|[0-9]')) >= 0
      ) {
        // pour en tenir compte les listes de selection
        return true;
      }
    }
    return false;
  }

  createSearchNotification() {
    this.notification.info(
      'Recherche un client',
      'Veuillez choisir au moins un critère de recherche.'
    );
  }

  downloadImport = (request: (p: any) => any, filePath: any): void => {
    request(filePath);
  }

  method = (request: (p: any) => any, id: any): void => {
    request(id);
  }

  getTitleDownloadImport = (filePath: any): void => {
    const paths = filePath.split('/');
    return paths[paths.length - 1];
  }

  getMultipleKeys = (column: any, data: any): string => {
    let response = data;
    column['joinKeys'].forEach(
      key => {        
        response[key] != null ? response = response[key] : response = '';
      }
    )
    return response;
  }

  getConditionColor = (conditions: any, data: any): string => {
    let response = null;
    conditions.forEach(element => {
      switch (element.operator) {
        case '==':
          if (element.condition == data) {
            response = element.color;
          }
          break;
        default:
          break;
      }
    });
    return response;
  }

  getMinBetweenNow(date) {
    let now = moment(new Date());
    let then = moment(date);
    var diff = now.diff(then);

    return moment.utc(diff).format("mm");
  }
  
  displayAction = (request: (p: any) => any, condition: any): void => {
    return request(condition);
  }
}
