import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule
    , MatSelectModule, MatListModule, MatSliderModule, MatCardModule, MatRadioModule, MatSidenavModule, MatSortModule, MatPaginatorModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FormsModule } from '@angular/forms';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { ContactsComponent } from 'app/client/contacts/contacts.component';
import { ContactsService } from 'app/client/contacts/contacts.service';
import { ContactsContactListComponent } from 'app/client/contacts/contact-list/contact-list.component';
import { ContactsMainSidebarComponent } from 'app/client/contacts/sidebars/main/main.component';
import { ChatService } from 'app/client/contacts/contact-detail/chat/chat.service';
import { ChatComponent } from 'app/client/contacts/contact-detail/chat/chat.component';
import { ChatStartComponent } from 'app/client/contacts/contact-detail/chat/chat-start/chat-start.component';
import { ChatViewComponent } from 'app/client/contacts/contact-detail/chat/chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/left/left.component';
import { ChatRightSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/right/right.component';
import { ChatContactSidenavComponent } from 'app/client/contacts/contact-detail/chat/sidenavs/right/contact/contact.component';
import { AccountInboxComponent } from 'app/client/contacts/account-inbox/account-inbox.component';

import { AccountInboxService } from 'app/client/contacts/account-inbox/account-inbox.service';
import { ApiTokenService } from 'app/services/token.service';
import { AccountInboxListComponent } from './account-inbox/account-inbox-list/account-inbox-list.component';
import { AccountChatPanelModule } from './account-inbox/account-chat-panel/account-chat-panel.module';
import { DatePipe } from '@angular/common';
const routes: Routes = [
    {
        path: '',
        component: AccountInboxComponent,

    },

];

@NgModule({
    declarations: [
        AccountSidebarComponent,
        ContactsComponent,
        ContactsContactListComponent,
        ContactsMainSidebarComponent,
        ChatComponent,
        ChatStartComponent,
        ChatViewComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent,

        AccountInboxComponent,
        AccountInboxListComponent
    ],
    imports: [
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
        FuseSidebarModule,

        AccountChatPanelModule,
    ],
    providers: [
        ContactsService,
        ChatService,
        ApiTokenService,
        AccountInboxService, DatePipe
    ],
    entryComponents: [

    ]
})
export class ContactsModule {
}
