import { Component } from '@angular/core';
import {ApiAuthService} from 'app/services/auth.service';
@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    /**
     * Constructor
     */
    websiteSettings:any={}
    constructor(
        public auth: ApiAuthService,
    )
    {
        this.websiteSettings=auth.getWebsiteSettings();
    }
}
