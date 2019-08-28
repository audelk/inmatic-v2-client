import { Component, OnInit,ViewEncapsulation ,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TrainingvideoService } from './trainingvideo.service';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-trainingvideo',
  templateUrl: './trainingvideo.component.html',
  styleUrls: ['./trainingvideo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class TrainingvideoComponent implements OnInit {
  videos: any;
  isLoading = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private  _router: Router,
    private _trainingvideoSvc: TrainingvideoService,
        
  ) { 
    this._unsubscribeAll = new Subject();
    this._trainingvideoSvc.getList().then(res => {
        this.videos = res;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

}
