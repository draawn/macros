import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';

import { Food } from './../shared/entities/food';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  selectedFood: Food;

  results: Array<Food>;
  searchQuery: string;

  constructor(private http: HttpClient) { }

  search(queries: Observable<any>): Observable<any> {
    return queries.pipe(
      switchMap(query => this.searchEntries(query.term, query.pageSize, query.offset))
    );
  }

  searchSuggestions(queries: Observable<string>): Observable<any> {
    return queries.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => this.searchEntries(query, 5, 0))
    );
  }

  searchEntries(term: string, max: number, offset: number): Observable<any> {
    if (term) {
      return this.http
        .post('food/search', { term: term, max: max, offset: offset }, { withCredentials: true })
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    } else {
      return of([]);
    }
  }
}
