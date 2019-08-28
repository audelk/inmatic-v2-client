

import { NgModule,PipeTransform,Pipe } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatProgressBarModule, MatRippleModule, MatSidenavModule, MatToolbarModule, MatTooltipModule,MatCardTitleGroup,MatCardTitle
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { TrainingvideoComponent } from './trainingvideo.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseMaterialColorPickerModule } from '@fuse/components';
import { TrainingvideoService } from './trainingvideo.service';


const routes: Routes = [
  {
      path     : '',
      component: TrainingvideoComponent,       
  }
  
];
import { DomSanitizer} from '@angular/platform-browser';
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@NgModule({
  declarations: [TrainingvideoComponent,SafePipe],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,MatCardModule,
   
    NgxDnDModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseMaterialColorPickerModule
  ],
  providers      : [
    TrainingvideoService,
    
],   
})
export class TrainingvideoModule { }
