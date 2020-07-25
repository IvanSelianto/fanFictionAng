import {Component, OnInit, Output, ViewChild} from '@angular/core';

import {TokenStorageService} from '../_services/token-storage.service';
import {CompositionService} from '../_services/composition.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AppComponent} from '../app.component';

export class Composition {
  title: string;
  description: string;
  chaptersAmount: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {


  currentUser: any;
  displayedColumns: string[] = ['settings', 'title', 'description', 'chaptersAmount'];
  dataSource: MatTableDataSource<Composition>;
  errorMessage: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private token: TokenStorageService, private compositionService: CompositionService, private router: Router,
              private  userService: UserService, private  activatedRouter: ActivatedRoute, private appComponent: AppComponent) {
  }

  ngOnInit() {
    if (this.token.getUser().roles[0] === 'ROLE_ADMIN') {
      this.activatedRouter.params.subscribe(data => {
        this.userService. getUserById(data.userId).subscribe((user) => {
            if (this.token.getUser().id !== user['id']) {
              this.token.saveToken(user['accessToken']);
              this.token.saveUser(user);
              this.appComponent.ngOnInit();
              this.ngOnInit();
            }
          }
        );

      });
    }
    if (this.token.getUser().roles[0] === 'ROLE_UNDEFINED_USER') {
      this.token.signOut();
      this.appComponent.ngOnInit();
    }


    if (this.token.getUser() === null) {
      this.router.navigateByUrl('/login');
    } else {
      this.currentUser = this.token.getUser();
      this.compositionService.getCompositionsForCurrentUser().subscribe(compositions => {
        this.currentUser.compositions = compositions;
        this.dataSource = new MatTableDataSource(this.currentUser.compositions);
        this.dataSource.filterPredicate = (data: Composition, filter: string): boolean => {
          return data.description.toLowerCase().includes(filter)
            || data.title.toLowerCase().includes(filter)
            || data.chaptersAmount.toString().includes(filter);
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  readComposition(composition) {
    this.router.navigateByUrl('composition/' + composition.compositionId);
  }

  addComposition() {
    this.router.navigateByUrl('/newcomposition');
  }

  deleteComposition(compositionId: number) {
    this.compositionService.deleteComposition(compositionId).subscribe(() => {
      this.compositionService.compositionId = null;
      this.ngOnInit();
    });
  }

  editUsername(editedName: string) {
    if (editedName != null) {
      this.currentUser.username = editedName;
      this.userService.editUsername(this.currentUser.id, editedName).subscribe(data => {
        this.errorMessage = null;
        this.token.saveToken(data['accessToken']);
        this.token.saveUser(this.currentUser);
        this.appComponent.ngOnInit();
      }, err => {
        this.errorMessage = err.error;
        this.ngOnInit();
      });
    }
  }

  addChapter(compositionId: number) {
    this.compositionService.compositionId = compositionId;
    this.compositionService.imgUrl = null;
    this.router.navigateByUrl('composition/' + compositionId + '/chapter');
  }

  editComposition(composition) {
    this.router.navigateByUrl('newcomposition/' + composition.compositionId);
  }
}
