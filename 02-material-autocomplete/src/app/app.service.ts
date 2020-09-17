import {Injectable} from '@angular/core';
import {Animal} from './animal.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AppService {

    constructor(private http: HttpClient) {}

    getAnimals(filterValue = '', filterField = ''): Observable<Animal[]> {
        return this.http.get<Animal[]>(`http://localhost:3030/animais?field=${filterField}&value=${filterValue}`);
    }

}
