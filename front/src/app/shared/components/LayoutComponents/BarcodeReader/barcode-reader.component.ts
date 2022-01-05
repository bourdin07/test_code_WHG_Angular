import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { NzModalService } from "ng-zorro-antd/modal";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.component.html',
  styleUrls: ['./barcode-reader.component.scss'],
})
export class BarcodeReaderComponent {
  @Input() buttonLabel: string = 'Scanner un code barre';
  @Output() scanned = new EventEmitter();

  private barcodeValue: string = '';
  barcodeValueUpdate = new Subject<string>();
  private modal;

  constructor(private modalService: NzModalService) {
    this.barcodeValueUpdate.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      this.barcodeValue = value;
      this.scanned.emit(this.barcodeValue);
      this.closeModal();
    });
  }

  openModal(scanModal: TemplateRef<{}>) {
    this.modal = this.modalService.info({
      nzTitle: 'Veuillez scanner un code barre',
      nzContent: scanModal,
      nzOkText: 'Annuler',
      nzOkType: 'default',
      nzOnOk: () => {
        this.closeModal();
      }
    });
  }

  onblur(barcodeInput) {
    barcodeInput.focus();
  }

  closeModal() {
    this.barcodeValue = '';
    this.modal.destroy();
  }
}
