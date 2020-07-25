import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CompositionService} from '../../../_services/composition.service';
import {EditsheetComponent} from './editsheet/editsheet.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ChapterComponent} from '../chapter.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {TokenStorageService} from '../../../_services/token-storage.service';

declare var tinymce: any;

@Component({
  selector: 'app-editmode',
  templateUrl: './editmode.component.html',
  styleUrls: ['./editmode.component.css']
})
export class EditmodeComponent implements OnInit {

  public message: string;
  name: string;
  text: string;
  chapter: {
    id: number,
    name: string,
    text: string,
    imgUrl: any,
    chapterNumber: number,
    compositionId: number
  };

  constructor(public  compositionService: CompositionService, private activatedRoute: ActivatedRoute, private bottomSheet: MatBottomSheet
    , private chapterComponent: ChapterComponent, private router: Router, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorageService.getUser() === null) {
      this.router.navigateByUrl('/login');
    } else if (this.compositionService.chapter === undefined) {

      this.router.navigateByUrl('composition/' +
        this.chapterComponent.compositionId + '/chapter');
    } else {
      this.compositionService.imgUrl = null;
      this.chapter = this.compositionService.chapter;
      this.text = this.chapter.text;
      this.name = this.chapter.name;
      tinymce.remove();

      tinymce.init({
        skin: false,

        content_css: 'CUSTOM',
        selector: '#textAreaChapterEditMode',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount '
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
      });
      tinymce.activeEditor.setContent(this.chapter.text);
      if (this.chapter.imgUrl !== null) {
        (document.getElementsByClassName('add-image-icon-edit')[0] as HTMLElement).hidden = true;
        this.compositionService.imgUrl = this.chapter.imgUrl;
      }
    }
  }

  loadImage(files: FileList) {
    (document.getElementsByClassName('add-image-icon-edit')[0] as HTMLElement).hidden = true;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.chapter.imgUrl = reader.result;
      this.compositionService.imgUrl = reader.result;

    };
  }

  openBottomSheet() {
    this.bottomSheet.open(EditsheetComponent);
  }

  callLoadImage() {
    (document.getElementsByClassName('loadImage-edit')[0] as HTMLElement)
      .click();
  }

  onSubmit() {
    this.chapter.text = tinymce.activeEditor.getContent();
    this.chapter.name = this.name;
    this.chapter.chapterNumber = this.compositionService.findChapter(this.chapter.id).chapterNumber;
    this.chapter.compositionId = this.chapterComponent.compositionId;
    this.compositionService.saveChapter(this.chapter).subscribe(() => {
      this.compositionService.chapters
        [this.compositionService.chapters.indexOf(this.compositionService.findChapter(this.chapter.id))] = this.chapter;
      this.router.navigate(['/composition/' + this.chapter.compositionId + '/chapter/' + this.chapter.id + '/readingmode']);
    });

  }
}
