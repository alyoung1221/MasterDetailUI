import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { MessageService } from './message.service';
import { Friend } from './friend';
import { FRIENDS} from './mock-friends';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private friendsUrl = 'api/friends';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET friends from the server */
  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.friendsUrl)
    .pipe(
      tap(_ => this.log('Fetched friends')),
      catchError(this.handleError<Friend[]>('getFriends', []))
    );
  }

  /** GET friend by id. Will 404 if id not found */
  getFriend(id: number): Observable<Friend> {
    const url = `${this.friendsUrl}/${id}`;
    return this.http.get<Friend>(url).pipe(
      tap(_ => this.log(`Fetched friend id=${id}`)),
      catchError(this.handleError<Friend>(`getFriend id=${id}`))
    );
  }

  /** POST: add a new friend to the server */
addFriend (friend: Friend): Observable<Friend> {
  return this.http.post<Friend>(this.friendsUrl, friend, this.httpOptions).pipe(
    tap((newFriend: Friend) => this.log(`Added friend id=${newFriend.id}`)),
    catchError(this.handleError<Friend>('addFriend'))
  );
}

/** DELETE: delete the friend from the server */
deleteFriend (friend: Friend | number): Observable<Friend> {
  const id = typeof friend === 'number' ? friend : friend.id;
  const url = `${this.friendsUrl}/${id}`;

  return this.http.delete<Friend>(url, this.httpOptions).pipe(
    tap(_ => this.log(`Deleted friend id=${id}`)),
    catchError(this.handleError<Friend>('deleteFriend'))
  );
}

/* GET friends whose name contains search term */
searchFriends(term: string): Observable<Friend[]> {
  if (!term.trim()) {
    // if not search term, return empty friend array.
    return of([]);
  }
  return this.http.get<Friend[]>(`${this.friendsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`Found friends matching "${term}"`) :
       this.log(`No friends matching "${term}"`)),
    catchError(this.handleError<Friend[]>('searchFriends', []))
  );
}

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

  /** Log a FriendService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`MessageService: ${message}`);
    }
}
