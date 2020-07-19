import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileComponent} from '../profile.component';


@Component({
  selector: 'app-inplaceediting',
  templateUrl: './inplaceediting.component.html',
  styleUrls: ['./inplaceediting.component.css']
})
export class InplaceeditingComponent implements OnInit {
  @Input() data: any;
  @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();
  editMode = false;


  constructor(public profile: ProfileComponent) {
  }

  ngOnInit() {

  }

  onFocusOut(data) {
    if (data.trim() !== '') {
      this.focusOut.emit(this.data);
      this.editMode = false;
    }
  }


}
