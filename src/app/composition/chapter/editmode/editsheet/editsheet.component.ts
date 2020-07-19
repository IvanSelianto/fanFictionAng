import {Component, OnInit} from '@angular/core';
import {CompositionService} from '../../../../_services/composition.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editsheet',
  templateUrl: './editsheet.component.html',
  styleUrls: ['./editsheet.component.css']
})
export class EditsheetComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet, private compositionService: CompositionService, private router: Router) {
  }


  ngOnInit() {
  }


  deleteImage() {
    if (
      this.compositionService.chapter !== undefined && (this.router.url === '/composition/' + this.compositionService.compositionId + '/chapter/' + this.compositionService.chapter.id + '/editmode')
    ) {
      this.compositionService.deleteImage('add-image-icon-edit');
    } else {
      this.compositionService.deleteImage('add-image-icon');
    }
    this.bottomSheet.ngOnDestroy();

  }

  editImage() {
    if (
      this.compositionService.chapter !== undefined && (this.router.url === '/composition/'
      + this.compositionService.compositionId
      + '/chapter/' +
      this.compositionService.chapter.id +
      '/editmode')
    ) {
      this.compositionService.callLoadImage('loadImage-edit');
    }else {
      this.compositionService.callLoadImage('loadImage');
    }
    this.bottomSheet.ngOnDestroy();

  }

}
