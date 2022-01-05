import { Component, OnInit, Input, TemplateRef } from '@angular/core'
import { LogChangesService } from "@app/services/log-changes.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "@app/services/auth.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() entite;
  @Input() id;
  @Input() idParent;
  @Input() type;
  @Input() titleButton;

  isAdmin: boolean;
  changes: any[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;

  constructor(private authService: AuthService, private logChangesService: LogChangesService, private modalService: NzModalService) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  showChanges(templatechanges: TemplateRef<{}>) {
    this.searchData();
    this.modalService.info({
      nzTitle: 'Historique',
      nzContent: templatechanges,
      nzWidth: '60%'
    });
  }

  searchData(): void {
    this.logChangesService.get(this.entite, this.id, this.idParent, this.pageIndex, this.pageSize).subscribe(result => {
      this.changes = result.data;
      this.total = result.total;
    });
  }
}
