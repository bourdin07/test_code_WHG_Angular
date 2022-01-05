import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  @Input() columns;
  @Input() service;
  @Input() dataGetter;
  @Input() sortBy;
  @Input() sortOrder;
  @Input() params;

  objectKeys = Object.keys;
  pageIndex = 1;
  pageSize = 25;
  total = 0;
  data = [];
  loading = true;
  filterValues = {};

  constructor() {}

  ngOnInit() {
    this.initFilters();
    this.searchData();
  }

  initFilters() {
    for (let key of Object.keys(this.columns)) {
      this.filterValues[key] = {value: '', type: this.columns[key].type, join: this.columns[key].joinKey};
      if (this.columns[key].filters) {
        if (this.columns[key].filters.type === 'range') {
          this.filterValues[key].value = {min: '', max: ''};
        } else {
          if (this.columns[key].filters.value) {
            this.filterValues[key].value = this.columns[key].filters.value;
          }
        }
      }
    }
  }

  sort(sort: { key: string; value: string }): void {
    this.sortBy = sort.key;
    this.sortOrder = sort.value === 'ascend' ? 'asc' : 'desc';
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;

    let f = {};
    for (let key of Object.keys(this.filterValues)) {
      if (this.filterValues[key].value) {
        f[key] = this.filterValues[key];
      }
    }
    if (this.params !== undefined) {
      for (let key of Object.keys(this.params)) {
        if (this.params[key].value && f[key] == undefined) {
          f[key] = this.params[key];
        }
      }
    }
    
    this.service[this.dataGetter](JSON.stringify(f), this.sortBy, this.sortOrder, this.pageIndex, this.pageSize)
      .subscribe((results: any) => {
        this.loading = false;
        this.total = results.total;
        this.data = results.data;
      })
    ;
  }

  filterChange(key, value: string[], reset: boolean = false): void {
    let dataKey = key;
    let keyParts = dataKey.split('.');

    if (keyParts.length === 2 && ['min', 'max'].indexOf(keyParts[1]) > -1) {
      dataKey = keyParts[0];
      this.filterValues[dataKey].value[keyParts[1]] = value;
    } else {
      this.filterValues[dataKey].value = value;
    }

    if (reset) {
      this.searchData(true);
    }
  }

  resetFilters(key = null): void {
    if (key === null) {
      this.initFilters();
    } else {
      this.filterValues[key].value = '';
      if (this.columns[key].filters.type === 'range') {
        this.filterValues[key].value = {min: '', max: ''};
      }
    }
    this.searchData(true);
  }

  resetSortAndFilters(): void {
    this.sortBy = '';
    this.sortOrder = '';
    this.resetFilters();
    this.searchData(true);
  }
}
