import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectStateService {
  toggleFavorite(item): Observable<any> {
    console.log('Toggle Favorite: ', item);
    return of(item);
  }
}
