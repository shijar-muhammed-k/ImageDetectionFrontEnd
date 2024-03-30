import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent {

  constructor (
    public dialogRef: MatDialogRef<PreviewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {console.log(data)}

}
