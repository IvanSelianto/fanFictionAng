import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {Chapter, CompositionService} from '../../../_services/composition.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Output('readChapter') showReadChapter: EventEmitter<any> = new EventEmitter();
  isExpanded = true;
  showSubmenu = true;
  isShowing = false;
  compositionId: number;
  compositionName: string;
  chapters: Array<Chapter>;
  @Output() chapter: Chapter;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  constructor(private actrouter: ActivatedRoute, private  compositionService: CompositionService, private  router: Router) {
  }

  ngOnInit() {
    if (this.compositionService.compositionId) {
      this.compositionId = this.compositionService.compositionId;
      this.compositionService.getComposition(this.compositionId).subscribe(composition => this.compositionName = composition.title);
      this.compositionService.getChaptersByCompositionId(this.compositionId).subscribe(chapters => {
          this.chapters = chapters;
          this.compositionService.chapters = this.chapters;
        }
      );
    }
  }

  public dropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.chapters,
      event.previousIndex,
      event.currentIndex
    );
    this.compositionService.saveChapters(this.chapters).subscribe(() => this.ngOnInit());
  }

  public readChapter(chapterId) {
    this.chapter = this.chapters.find(chapter => chapter.id === chapterId);
    this.compositionService.chapter = this.chapter;
    this.showReadChapter.emit();
  }

  public addChapter() {
    this.compositionService.imgUrl = null;
    this.router.navigateByUrl('/composition/' + this.compositionId + '/chapter');
  }

}
