import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../shared/models/user.model';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Dialog } from '../shared/models/dialog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: User[] = [];
  selectedUser = <User> {};
  headers: any = [
    {column: "username", name: "Username"},
    {column: "email", name: "Email Address"},
    {column: "phoneNumber", name: "Phone No"},
    {column: "skillsets", name: "Skills"},
    {column: "hobby", name: "Hobby"}
  ];
  columnsToDisplay: string[] = Object.keys(this.headers).map(val => this.headers[val].column);
  userForm = this.formBuilder.group({
    username: new FormControl("",Validators.required),
    email: new FormControl("",Validators.compose([
      Validators.required,
      Validators.email
    ])),
    phoneNumber: new FormControl("",Validators.required),
    skills: new FormArray([]),
    skillsets: new FormControl(""),
    hobby: new FormControl("",Validators.required),
  })
  isEditMode: boolean = false;

  constructor(private userService: UserService, 
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe((data: User[]) => {
        this.userList = data;
    })
  }

  onCreateUser(){
    this.router.navigate(['user','create']);
  }

  onSelectUser(user: User){
    if(this.isEditMode == false){
      this.selectedUser = user;
      this.updateUserSkills();
    }
  }

  updateUserSkills(){
    this.userForm.controls['skills'].reset();

      for(let idx in this.selectedUser.skills){
        this.userForm.controls['skills'].value.push(new FormControl(this.selectedUser.skills[idx],Validators.required));
      };
  }

  onDeleteUser(){
    const dialogParams: Dialog ={
      type: 'warn'
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '200px',
      data: {
        params: dialogParams
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true && this.selectedUser._id){
        this.userService.deleteUser(this.selectedUser._id).toPromise().then(()=>{
          this.refreshUserList();
        });
      }
    });
  }

  onEditUser(){
    this.isEditMode = true;
  }

  onUpdateUser(){
    const user: User={
      _id: this.selectedUser._id,
      username: this.userForm.controls['username'].value,
      email: this.userForm.controls['email'].value,
      phone: {
        callingCode: '60',
        number: this.userForm.controls['phoneNumber'].value,
      },
      skills: this.userForm.controls['skills'].value.map(function(control: FormControl){return control.value}),
      hobby: this.userForm.controls['hobby'].value
    }
    this.userService.updateUser(user).subscribe((data)=>{

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
          this.refreshUserList();
        }
      });
    });
  }

  onCancelEdit(){
    this.isEditMode = false;
  }

  refreshUserList(){
    this.userService.getUserList().subscribe((data: User[]) => {
        this.userList = data;
        this.selectedUser = <User> {};
    })
  }

  addNewUserSkill() {
    this.userForm.controls['skills'].value.push(new FormControl("",Validators.required));
  }

  removeUserSkill(idx: number){
    this.userForm.controls['skills'].value.splice(idx);
  }

}
