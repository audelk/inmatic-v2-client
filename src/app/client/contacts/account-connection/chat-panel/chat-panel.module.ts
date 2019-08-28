import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatTabsModule, MatTooltipModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ChatPanelComponent } from './chat-panel.component';
import { AccountConnectionService } from '../account-connection.service';

@NgModule({
    declarations: [
        ChatPanelComponent
    ],
    providers   : [      
        AccountConnectionService
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
        ChatPanelComponent
    ]
})
export class ChatPanelModule
{
}
