import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CompositionService} from '../_services/composition.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

class User {
  email: string;
  role: string;
  username: string;
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {


  displayedColumns: string[] = ['settings', 'username', 'email', 'role'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: any = [];

  constructor(private token: TokenStorageService, private router: Router, private  userService: UserService) {
  }

  ngOnInit() {

    if (this.token.getUser() === null || this.token.getUser().roles[0] !== 'ROLE_ADMIN') {
      this.router.navigateByUrl('/home');
    } else {
      this.userService.getAllUsers().subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: User, filter: string): boolean => {
          return data.username.toLowerCase().includes(filter)
            || data.email.toLowerCase().includes(filter)
            || data.role.toLowerCase().includes(filter);
        };
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

  openProfile(userId: number) {
    this.router.navigateByUrl('profile/' + userId);
  }


  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => this.ngOnInit());
  }

  setUserRole(userId: number) {
    this.userService.setUserRole(userId).subscribe(() => {
      if (userId === this.token.getUser().id) {
        this.token.signOut();
        window.location.reload();
      } else {
        this.ngOnInit();
      }
    });
  }

  blockUser(userId: number) {
    this.userService.blockUser(userId).subscribe(() => {
      if (userId === this.token.getUser().id) {
        this.token.signOut();
        window.location.reload();
      } else {
        this.ngOnInit();
      }
    });
  }

  setAdminRole(userId: number) {
    this.userService.setAdminRole(userId).subscribe(() => this.ngOnInit());
  }

}
