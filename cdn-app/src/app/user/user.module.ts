import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent, 
    UserCreateComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule { }
