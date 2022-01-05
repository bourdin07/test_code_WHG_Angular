import { Component, Input, OnInit } from "@angular/core";
import { FileService } from "@app/services/file.service";

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ["./file-download.component.scss"],
})
export class FileDownloadComponent implements OnInit {
  @Input() filename: string = '';
  @Input() clientFilename: string = '';

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  download() {
    if (this.filename) {
      this.fileService.download(this.filename, 'typebilan_activite').subscribe(response => {
        let objectUrl = window.URL.createObjectURL(new Blob([response]));
        let anchor = document.createElement('a');
        anchor.href = objectUrl;
        anchor.download = this.clientFilename;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      });
    }
  }
}