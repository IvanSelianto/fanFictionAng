import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'https://fanfictionback.herokuapp.com/api/fanfic/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export class Chapter {
  compositionId: number;
  name: string;
  text: string;
  imgUrl: string;
  id: number;
  chapterNumber: number;
}

@Injectable({
  providedIn: 'root'
})

export class CompositionService {
  chapters: Array<Chapter>;
  compositionId: number;
  chapter: Chapter;
  imgUrl: any;

  constructor(private http: HttpClient) {
  }

  getAllCompositions(): Observable<any> {
    return this.http.get(API_URL + 'allcompositions');
  }

  getGenres(): Observable<any> {
    return this.http.get(API_URL + 'allGenres');
  }

  saveComposition(composition): Observable<any> {
    return this.http.post(API_URL + 'savecomposition', {
      title: composition.title,
      description: composition.description,
      compositionGenres: composition.compositionGenres,
      compositionId: composition.compositionId
    }, httpOptions);
  }

  getComposition(compositionId: number): Observable<any> {
    return this.http.get(API_URL + 'getcomposition/' + compositionId);
  }

  getChaptersByCompositionId(compositionId: number): Observable<any> {
    return this.http.get(API_URL + 'getchapters/' + compositionId);
  }

  saveChapter(chapter): Observable<any> {
    return this.http.post(API_URL + 'savechapter', {
      compositionId: chapter.compositionId,
      name: chapter.name,
      text: chapter.text,
      imgUrl: chapter.imgUrl,
      id: chapter.id,
      chapterNumber: chapter.chapterNumber
    }, httpOptions);
  }

  deleteChapter(chapter): Observable<any> {
    return this.http.post(API_URL + 'deletechapter', {
      id: chapter.id,
      name: chapter.name,
      text: chapter.text,
      imgUrl: chapter.imgUrl,
      composition: chapter.composition
    }, httpOptions);

  }

  deleteComposition(compositionId): Observable<any> {
    return this.http.delete(API_URL + 'deletecomposition/' + compositionId);
  }

  saveChapters(chapters: Chapter[]) {
    return this.http.post(API_URL + 'savechapters', chapters, httpOptions);
  }


  public findChapter(chapterId) {
    return this.chapters.find(chapter => chapter.id === chapterId);

  }


  callLoadImage(className: string) {
    (document.getElementsByClassName(className)[0] as HTMLElement)
      .click();
  }

  deleteImage(className: string) {
    if (this.chapter !== undefined) {
      this.chapter.imgUrl = null;
    }
    this.imgUrl = null;
    (document.getElementsByClassName(className)[0] as HTMLElement).hidden = false;
  }

  getCompositionsForCurrentUser() {
    return this.http.get(API_URL + 'getcompositionsforcurrentuser');

  }

  getCommentsByCompositionId(compositionId): Observable<any> {
    return this.http.get(API_URL + 'getcommentsbycompositionid/ ' + compositionId);
  }

  addComment(text: string, compositionDTO: any): Observable<any> {
    return this.http.post(API_URL + 'addcomment',
      {
        text,
        compositionDTO
      }
      , httpOptions);
  }

  search(searchRequest: string): any {
    if (!searchRequest.trim()) {
      return of([]);
    }
    return this.http.get(API_URL + 'search/' + searchRequest);
  }

  exportToPdf(compositionId: number): Observable<Blob> {
    return this.http.get(API_URL + 'exporttopdf/' + compositionId, {responseType: 'blob'});
  }
}


