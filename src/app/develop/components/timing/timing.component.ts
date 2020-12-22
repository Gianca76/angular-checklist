import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { ChecklistSelectors } from '../../../checklist/state/checklist.selectors';

@Component({
  selector: 'app-timing',
  constructor() {}
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent implements OnInit {

  items$: Observable<any>;
  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.items$ = this.store.pipe(select(ChecklistSelectors.getItemsFromSelectedCategory));
  }

}
