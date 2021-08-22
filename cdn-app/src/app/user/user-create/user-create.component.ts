import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user.model';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Dialog } from '../../shared/models/dialog.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm = this.formBuilder.group({
    username: new FormControl("",Validators.required),
    email: new FormControl("",Validators.compose([
      Validators.required,
      Validators.email
    ])),
    phoneNumber: new FormControl("",Validators.required),
    skills: new FormArray([]),
    hobby: new FormControl("",Validators.required),
  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.userForm.controls['skills'].value.push(new FormControl("",Validators.required));
  }

  onSaveUser(){
    const user: User={
      username: this.userForm.controls['username'].value,
      email: this.userForm.controls['email'].value,
      phone: {
        callingCode: '60',
        number: this.userForm.controls['phoneNumber'].value,
      },
      skills: this.userForm.controls['skills'].value.map(function(control: FormControl){return control.value}),
      hobby: this.userForm.controls['hobby'].value
    }
    this.userService.createUser(user).subscribe((data)=>{

      const dialogParams: Dialog ={
        type: 'success'
      }
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        height: '200px',
        data: {
          params: dialogParams
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.router.navigate(['user','list']);
        }
      });
    });
  }

  onCancelCreateUser(){
    this.router.navigate(['user','list']);
  }

  addNewUserSkill() {
    this.userForm.controls['skills'].value.push(new FormControl("",Validators.required));
  }

  removeUserSkill(idx: number){
    this.userForm.controls['skills'].value.splice(idx);
  }

  skillsValid(){

    var filteredControl = this.userForm.controls['skills'].value.filter(function(control: FormControl){ return control.invalid == true;})

    if(filteredControl.length > 0)
     return false;

    else
      return true;

  }

}
