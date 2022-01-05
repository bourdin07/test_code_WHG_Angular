import { Component, Input} from '@angular/core'

@Component({
  selector: 'app-barcode-generator',
  templateUrl: './barcode-generator.component.html',
  styleUrls: ['./barcode-generator.component.scss'],
})
export class BarcodeGeneratorComponent {
  @Input() buttonLabel: string = 'Générer un code barre';
  @Input() titleLabel: string = 'Code barre';
  @Input() codeBarValue: string = '';

  visibleBarCodeModal = false;

  constructor() {
  }

  openCloseModal() {
    this.visibleBarCodeModal ? this.visibleBarCodeModal = false : this.visibleBarCodeModal = true;
  }

}
