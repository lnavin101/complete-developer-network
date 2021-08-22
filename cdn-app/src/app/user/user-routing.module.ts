import { Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
    {
        path: 'user',
        children: [
            { path: 'list', component: UserComponent },
            { path: 'create', component: UserCreateComponent },
            { path: 'edit/:id', component: UserEditComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full'}
        ]
    }
];

