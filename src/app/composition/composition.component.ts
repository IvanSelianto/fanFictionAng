import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompositionService} from '../_services/composition.service';

import {MatPaginator} from '@angular/material/paginator';
import {BehaviorSubject} from 'rxjs';
import {TokenStorageService} from '../_services/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../_services/user.service';

declare var SockJS;
declare var Stomp;

export class Comment {
  commentAuthor: any;
  composition: any;
  id: number;
  text: string;
}

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.css']
})
export class CompositionComponent implements OnInit {
  public stompClient;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  comments: Comment[];
  filteredComments: Comment[];
  composition: any;
  commentsAmount: number;
  compositionId: number;
  chapters: any[];
  tags: any[] = [];
  addedCommentText: string;
  compositionIds: any[] = [];

  constructor(public actrouter: ActivatedRoute, private router: Router, public compositionService: CompositionService,
              private tokenStorageService: TokenStorageService, private  userService: UserService) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'https://fanfictionback.herokuapp.com/api/test/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/message', (comments) => {
        if (comments) {
          this.comments.unshift(JSON.parse(comments.body));
          this.ngOnInit();
        }
      });
    });
  }

  ngOnInit(): void {
    this.actrouter.params.subscribe(data => {
      if (data.compositionId !== this.compositionId) {
        this.compositionService.getAllCompositions().subscribe(compositions => {
          for (const composition of compositions) {
            this.compositionIds.push(composition.id);
          }
          if (this.compositionIds.indexOf(Number(data.compositionId)) === -1) {
            this.router.navigateByUrl('home');
          } else {
            this.compositionId = data.compositionId;
            this.compositionService.compositionId = data.compositionId;
            this.ngOnInit();
            this.compositionService.getComposition(data.compositionId).subscribe(composition => this.composition = composition);
            this.compositionService.getChaptersByCompositionId(data.compositionId).subscribe(chapters => this.chapters = chapters);
          }
        });
      }
      if (this.compositionIds.indexOf(Number(data.compositionId)) !== -1) {
        this.compositionService.getCommentsByCompositionId(data.compositionId).subscribe(comments => {
          this.comments = comments;
          this.commentsAmount = this.comments.length;
          this.filteredComments = this.comments.slice(0, 4);
          new MatTableDataSource(this.comments).paginator = this.paginator;
        });
      }
    });

  }

  readChapter(chapter) {
    (document.getElementsByClassName('container')[0] as HTMLElement).hidden = true;
    this.compositionService.chapter = chapter;
    this.compositionService.chapters = this.chapters;
    this.router.navigateByUrl('/composition/' + this.compositionId + '/chapter/' + chapter.id + '/readingmode');
  }


  readFirstChapter() {
    if (this.chapters.length !== 0) {
      this.compositionService.chapters = this.chapters;
      this.compositionService.chapter = this.chapters[0];
      (document.getElementsByClassName('container')[0] as HTMLElement).hidden = true;
      this.router.navigateByUrl('/composition/' + this.compositionId + '/chapter/' + this.chapters[0].id + '/readingmode');
    }
  }

  formtags() {
    for (const genre of this.composition.compositionGenres) {
      this.tags.push(genre.genreName);
    }
    this.tags.push(this.composition.author.username);
    this.tags.push(this.composition.publicationDate.slice(0, 4));
    this.tags.push(this.chapters.length + ' Chapter(s)');
  }

  onPaginateChange(page) {
    this.filteredComments = this.comments.slice(page.pageIndex * page.pageSize, page.pageIndex * page.pageSize + page.pageSize);
    console.log(this.comments);
  }

  openCommentArea() {
    (document.getElementById('commentArea') as HTMLElement).hidden = false;
  }

  closeCommentArea() {
    (document.getElementById('commentArea') as HTMLElement).hidden = true;
    this.addedCommentText = '';
  }

  addComment() {

    if (this.tokenStorageService.getUser() === null) {
      this.router.navigateByUrl('/login');
    } else {
      if (this.addedCommentText.replace(/\s/g, '') !== '') {
        this.compositionService.addComment(this.addedCommentText, this.composition).subscribe(() => {
          this.addedCommentText = '';
          this.ngOnInit();
          (document.getElementById('commentArea') as HTMLElement).hidden = true;
        });
      }
    }
  }
}
