import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule
    ,MatSelectModule,MatListModule,MatSliderModule, MatCardModule, MatRadioModule, MatSidenavModule, MatSortModule,MatPaginatorModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FormsModule } from '@angular/forms';

import { InboxComponent} from 'app/client/inbox/inbox.component';
import { InboxService } from 'app/client/inbox/inbox.service';
import { ChatService } from 'app/client/contacts/contact-detail/chat/chat.service';
import { ChatComponent } from 'app/client/contacts/contact-detail/chat/chat.component';
import { ChatStartComponent } from 'app/client/contacts/contact-detail/chat/chat-start/chat-start.component';
import { ChatViewComponent } from 'app/client/contacts/contact-detail/chat/chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/left/left.component';
import { ChatRightSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/right/right.component';
import { ChatContactSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/right/contact/contact.component';
import { ApiTokenService } from 'app/services/token.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InboxDetailComponent } from './inbox-detail/inbox-detail.component';
import { InboxListComponent } from './inbox-list/inbox-list.component';
const routes: Routes = [
    {
        path     : '',
        component: InboxComponent,
        resolve  : {
            contacts: ContactsService
        }
    },
    {
        path: ':ID2/detail',
        component: ContactDetailComponent,
        children: [],
        resolve: {
            chat: ChatService
        }
    }
];

@NgModule({
    declarations   : [
        InboxComponent,
        ContactsContactListComponent,        
        ContactsMainSidebarComponent,
        ContactDetailComponent,
        ChatComponent,
        ChatStartComponent,
        ChatViewComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent,
        ContactDialogComponent,
        SidebarComponent,
        InboxDetailComponent,
        InboxListComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        MatListModule,
        MatSliderModule,
        MatCardModule, 
        MatRadioModule, 
        MatSidenavModule,
        MatSortModule,
        FormsModule,
        MatPaginatorModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers      : [
        ContactsService,
        ChatService,
        ApiTokenService
    ],
    entryComponents: [ 
        ContactDialogComponent       
    ]
})
export class InboxModule
{
}
