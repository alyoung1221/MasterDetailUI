import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 import { Friend } from '../friend';
 import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friend-search',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.css']
})

export class FriendSearchComponent implements OnInit {

  friends$: Observable<Friend[]>;
  private searchTerms = new Subject<string>();

  constructor(private friendService: FriendService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.friends$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
    
      // ignore new term if same as previous term
      distinctUntilChanged(),
    
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.friendService.searchFriends(term)),
    );
  }
}
