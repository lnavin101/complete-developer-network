import { Component, Inject, OnInit } from '@angular/core';
import { Dialog } from '../models/dialog.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private dialogType: any) { }

  defaultSuccessDialog: Dialog = {
    title: 'Success',
    message: 'Process Successfully done',
    type: 'success',
    isShowOK: true,
    isShowCancel: false
  }

  defaultErrorDialog: Dialog = {
    title: 'Error',
    message: 'Unexpected error occured. Please try again after sometime',
    type: 'error',
    isShowOK: true,
    isShowCancel: false
  }

  defaultWarnDialog: Dialog = {
    title: 'Warning',
    message: 'Are You Sure?',
    type: 'warn',
    isShowOK: true,
    isShowCancel: true
  }

  useDialog = <Dialog> {};

  ngOnInit(): void {
    if(!this.dialogType.params.type)
      this.useDialog = this.defaultSuccessDialog;

    else{
      switch(this.dialogType.params.type){
        case 'success':
          this.useDialog = this.defaultSuccessDialog;
          break;

        case 'error':
          this.useDialog = this.defaultErrorDialog;
          break;

        case 'warn': 
          this.useDialog = this.defaultWarnDialog;
          break
        
        default:
          break;
      }
    }
      
  }

}
