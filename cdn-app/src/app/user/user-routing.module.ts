import { Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
    {
        path: 'user',
        children: [
            { path: 'list', component: UserComponent },
            { path: 'create', component: UserCreateComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full'}
        ]
    }
];

