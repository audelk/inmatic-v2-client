import { NgModule } from '@angular/core';

import { AnalyticsModule } from 'app/client/analytics/analytics.module';
import { RouterModule, Routes } from '@angular/router';
import { ContactsService } from 'app/client/contacts/contacts.service';
import { AuthGuard } from 'app/guard/auth.guard';
import { MatSnackBarModule } from '@angular/material';

const routes: Routes = [
    {
        path: 'analytics',
        loadChildren: './analytics/analytics.module#AnalyticsModule',
        canActivate: [AuthGuard]
    },

    {
        path: 'downloads',
        loadChildren: 'app/client/downloads/downloads.module#DownloadsModule',
        canActivate: [AuthGuard]
    },

    {
        path: 'inbox',
        loadChildren: 'app/client/contacts/contacts.module#ContactsModule',
        canActivate: [AuthGuard],

    },
    {
        path: 'training',
        loadChildren: 'app/client/trainingvideo/trainingvideo.module#TrainingvideoModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'analytics',
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        MatSnackBarModule,
    ],
    providers: [

        AuthGuard
    ]
})
export class ClientModule {

}