import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiTokenService} from './token.service';
import * as Constants from '../app.const';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ApiAuthService {

    private loggedIn = new BehaviorSubject < boolean > (this.token.loggedIn());

    authStatus = this.loggedIn.asObservable();
    changeAuthStatus(value: boolean) {
        this.loggedIn.next(value);
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient,
        private token: ApiTokenService,
        public router: Router) {
    }

    public authenticate(user: User) {
        return this.http
            .post(Constants.API_URL + '/api/login', user, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    public logout() {
        this.token.remove();
        this.changeAuthStatus(false);
        this.router.navigate(['/auth/login']);
    }
    public register(user: User) {
        return this.http
            .post(Constants.API_URL + '/api/user/register', user, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    public sendPasswordResetLink(data) {
        return this.http
            .post(Constants.API_URL + '/api/sendPasswordResetLink', data, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    public changePassword(user) {
        return this.http
            .post(Constants.API_URL + '/api/changePassword', user, this.httpOptions)
            .pipe(
                map((response: Response) => response)
            );
    }
    private jwt() {
        if (this.token.get()) {
            const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
            return {headers: headers};
        }
    }
    public getLogoUrl(){
        var logos = {      
        };
        var logo = logos[window.location.host] || "assets/images/logos/fuse.png";
        return logo;
    }
    public getWebsiteSettings(){
        var websites={
            
            
        }

        var website = websites[window.location.host] || {
            logo :'assets/images/logos/fuse.png',
            title:'My LinkedSolution App',
            email:'support@mylinkedsolution.com',
            background:'assets/images/backgrounds/dark-material-bg.jpg',
            favicon:'favicon.ico',
            config: {
                colorTheme      : 'theme-default',
                layout          : {
                    style    : 'horizontal-layout-1',
                    width    : 'fullwidth',
                    navbar   : {
                        primaryBackground  : 'fuse-navy-700',
                        secondaryBackground: 'fuse-navy-900',
                        folded             : false,
                        hidden             : false,
                        position           : 'left',
                        variant            : 'vertical-style-1'
                    },
                    toolbar  : {
                        customBackgroundColor: false,
                        background           : 'fuse-white-500',
                        hidden               : false,
                        position             : 'below'
                    },
                    footer   : {
                        customBackgroundColor: true,
                        background           : 'fuse-navy-900',
                        hidden               : false,
                        position             : 'below-fixed'
                    },
                    sidepanel: {
                        hidden  : false,
                        position: 'right'
                    }
                },
                customScrollbars: true
            }
        
        }
        return website;
    }
}
