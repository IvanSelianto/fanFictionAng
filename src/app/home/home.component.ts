import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../_services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {CompositionService} from '../_services/composition.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  content: string;
  compositions: any;
  filteredCompositions: any[] = [];
  compositionsAmount: number;

  constructor(private userService: UserService, private router: Router, private  compositionService: CompositionService) {
  }

  ngOnInit() {
    this.compositionService.getAllCompositions().subscribe(
      data => {
        this.compositions = data;
        this.compositions.paginator = this.paginator;
        this.filteredCompositions = this.compositions.slice(0, 4);
        this.compositionsAmount = this.compositions.length;
      }
    );
  }

  onPaginateChange(data) {
    this.filteredCompositions = this.compositions.slice(data.pageIndex * data.pageSize, data.pageIndex * data.pageSize + data.pageSize);
  }

  showMore(compositionId: string) {
    if ((document.getElementById(compositionId) as HTMLElement).style.whiteSpace === 'pre-wrap') {
      (document.getElementById(compositionId) as HTMLElement).style.whiteSpace = 'nowrap';
    } else {
      (document.getElementById(compositionId) as HTMLElement).style.whiteSpace = 'pre-wrap';
    }

  }

  readComposition(compositionId) {
    this.router.navigateByUrl('/composition/' + compositionId);
  }
}
