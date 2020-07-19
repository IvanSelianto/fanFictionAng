import {Component, OnInit, ViewChild} from '@angular/core';
import {Chapter, CompositionService} from '../../_services/composition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {TokenStorageService} from '../../_services/token-storage.service';
import {EditsheetComponent} from './editmode/editsheet/editsheet.component';
import {EditmodeComponent} from './editmode/editmode.component';

declare var tinymce: any;

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  @ViewChild(SidenavComponent) sidenavComponent: SidenavComponent;
  public message: string;
  compositionId: number;
  form: any = {};
  chapter: Chapter;
  composition: any;


  constructor(public compositionService: CompositionService, public activatedRoute: ActivatedRoute,
              private router: Router, private tokenStorageService: TokenStorageService, private bottomSheet: MatBottomSheet) {
  }


  ngOnInit() {
    if (this.compositionService.compositionId) {
      this.compositionService.getComposition(this.compositionService.compositionId).subscribe(composition => {
        this.composition = composition;
        if (this.tokenStorageService.getUser() === null) {
          this.router.navigateByUrl('login');
        } else if (this.tokenStorageService.getUser().username !== this.composition.author.username) {
          this.router.navigateByUrl('home');
        } else {
          this.compositionId = this.compositionService.compositionId;
        }

      });
    } else {
      this.router.navigateByUrl('home');

    }
  }

  loadImage(files) {
    (document.getElementsByClassName('add-image-icon')[0] as HTMLElement).hidden = true;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.compositionService.imgUrl = reader.result;
    };
  }

  openBottomSheet() {
    this.bottomSheet.open(EditsheetComponent);
  }


  callLoadImage() {
    (document.getElementsByClassName('loadImage')[0] as HTMLElement)
      .click();
  }

  onSubmit() {
    this.form.imgUrl = this.compositionService.imgUrl;
    this.form.compositionId = this.compositionId;
    this.form.chapterNumber = this.sidenavComponent.chapters.length + 1;

    this.form.text = tinymce.activeEditor.getContent();
    this.compositionService.saveChapter(this.form).subscribe(() => {
      this.sidenavComponent.ngOnInit();
      this.form = {};
      this.compositionService.imgUrl = null;
      (document.getElementsByClassName('add-image-icon')[0] as HTMLElement).hidden = false;

      tinymce.activeEditor.setContent('');
    });
  }

  readChapter() {
    this.chapter = this.sidenavComponent.chapter;
    this.compositionService.chapter = this.chapter;
    (document.getElementsByClassName('left')[0] as HTMLElement).hidden = true;
    this.router.navigate(['/composition/' + this.compositionId + '/chapter/' + this.chapter.id + '/readingmode']);

  }
}

