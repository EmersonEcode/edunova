import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.sass'
})
export class DialogComponent {
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {message: string}) {}

}
