import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatTabsModule, MatTooltipModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { AccountChatPanelComponent } from './account-chat-panel.component';
import { AccountInboxService } from '../account-inbox.service';

@NgModule({
    declarations: [
        AccountChatPanelComponent
    ],
    providers   : [      
        AccountInboxService
    ],
    imports     : [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,

        FuseSharedModule
    ],
    exports     : [
        AccountChatPanelComponent
    ]
})
export class AccountChatPanelModule
{
}
