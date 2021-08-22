import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../shared/models/user.model';
import { FormBuilder, Validator, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
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
  userSkills: FormArray = new FormArray([]);
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
    skills: new FormArray([new FormControl("",Validators.required)]),
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

  onSelectUser(user: User){
    if(this.isEditMode == false){
      this.selectedUser = user;

      const skillsArray = new FormArray([]);
      for(let idx in user.skills){
        skillsArray.push(new FormControl(user.skills[idx]))
      };

      this.userSkills = skillsArray;
    }
      
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
      if(result == true){
        this.userService.deleteUser(this.selectedUser._id).toPromise().then(()=>{
          this.refreshUserList();
        });
      }
    });
  }

  onEditUser(){
    this.isEditMode = true;
  }

  onSaveUser(){

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
    this.userSkills.push(new FormControl(''));
    console.log(this.userForm.get('skills'));
  }

  removeUserSkill(idx: number){
    this.userSkills.removeAt(idx);
  }

}
