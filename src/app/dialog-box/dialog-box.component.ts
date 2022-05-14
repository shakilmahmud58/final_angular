import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor( @Inject (MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DialogBoxComponent>) {

  }


  ngOnInit(): void {
  }
  closedialog(){
    this.dialogRef.close({delete:false});
  }
  deletedialog(){
    this.dialogRef.close({delete:true});
  }

}
