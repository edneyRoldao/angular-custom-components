import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {SickNote} from '@closecare/core-ts';

export interface PreviewContent {
  content: Observable<{ url: any; contentType: string; }>;
  sickNote: SickNote;
}
@Component({
  selector: 'app-pdf-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {

  loading = true;
  content;

  static open(dialog: MatDialog, data: PreviewContent) {
    return dialog.open(FilePreviewComponent, {
      backdropClass: 'backdrop_overlay',
      maxHeight: '90vh',
      maxWidth: '80vw',
      data: data
    });
  }

  constructor(public dialogRef: MatDialogRef<FilePreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PreviewContent) {
    data.content.subscribe(content => this.content = content);
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
