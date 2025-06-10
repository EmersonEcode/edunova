import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { dataDialog } from 'src/app/models/dialog.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>
    <mat-dialog-actions align="center">
  <button mat-button class="dialog-btn-ok" mat-dialog-close>
    OK
  </button>
</mat-dialog-actions>
  `,
  styleUrl: "sucess-dialog.component.sass",
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: dataDialog) {}
}


