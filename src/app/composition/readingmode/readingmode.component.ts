import {AfterViewInit, Component, DoCheck, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Chapter, CompositionService} from '../../_services/composition.service';
import {Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {CompositionComponent} from '../composition.component';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-readingmode',
  templateUrl: './readingmode.component.html',
  styleUrls: ['./readingmode.component.css'],
})
export class ReadingmodeComponent implements OnInit, DoCheck, AfterViewInit {

  chapter: Chapter;
  hiddenChapterOptions = false;

  constructor(public compositionService: CompositionService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    if (this.compositionService.chapter === undefined) {
      this.router.navigate(['/composition/' + this.compositionService.compositionId]);
    } else {
      this.chapter = this.compositionService.chapter;
      this.compositionService.getComposition(this.compositionService.compositionId).subscribe(composition => {
        if (this.tokenStorageService.getUser() != null
          && this.tokenStorageService.getUser().username === composition.author.username) {
          this.hiddenChapterOptions = true;
        }
      });
    }
  }

  ngDoCheck(): void {
    if (this.chapter !== this.compositionService.chapter) {
      (document.getElementById(String(this.chapter.chapterNumber)) as HTMLElement).style.fontSize = '16px';
      this.chapter = this.compositionService.chapter;
      (document.getElementById(String(this.chapter.chapterNumber)) as HTMLElement).style.fontSize = '32px';

    }
  }

  edit() {
    this.router.navigate(['/composition/' + this.compositionService.compositionId + '/chapter/' + this.chapter.id + '/editmode']);
  }

  delete() {
    this.compositionService.deleteChapter(this.chapter).subscribe(() => {
      this.router.navigateByUrl('composition/' + this.compositionService.compositionId);
    });
  }

  goOnPage(chapterIndex, count) {
    if ((chapterIndex > 0 && count === -1)
      || (chapterIndex === 0 && count === 1 && this.compositionService.chapters.length > 1)
      || (chapterIndex < this.compositionService.chapters.length - 1 && count === 1)) {

      const currentChapter = this.compositionService.chapters.find(chapter =>
        this.compositionService.chapters.indexOf(chapter) === chapterIndex + count);
      this.compositionService.chapter = currentChapter;
      this.router.navigateByUrl('/composition/' + this.compositionService.compositionId + '/chapter/' +
        currentChapter.id
        + '/readingmode');
    }
  }

  clickPage(chapter) {
    this.compositionService.chapter = chapter;
    this.router.navigateByUrl('composition/' +
      this.compositionService.compositionId + '/chapter/' + chapter.id + '/readingmode');
  }

  ngAfterViewInit() {
    if (this.chapter !== undefined) {
      (document.getElementById(String(this.chapter.chapterNumber)) as HTMLElement).style.fontSize = '32px';
    }
  }

}


@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(v: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}
