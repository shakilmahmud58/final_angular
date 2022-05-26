import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.css']
})
export class ShowimageComponent implements OnInit {

  constructor( @Inject (MAT_DIALOG_DATA) public data: string,
  public dialogRef: MatDialogRef<ShowimageComponent>) {

   }

  ngOnInit(): void {
  }
  deletedialog(){
    this.dialogRef.close();
  }
}
