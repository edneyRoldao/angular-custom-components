import {Injectable} from "@angular/core";
import {Animal} from "./animal.model";
import {Observable, of} from "rxjs/index";

@Injectable()
export class AppService {

    getAnimals(filterValue?: string, filterField?: string): Observable<Animal[]> {
        if (filterField && filterValue) {
            const filteredList = LIST.filter((animal: Animal) => {
                return animal[filterField].toLowerCase().includes(filterValue.toLowerCase())
            });

            return of(filteredList);
        }

        return of(LIST);
    }
}

const LIST: Animal[] = [
    { name: 'draco', lastName: 'Potter'},
    { name: 'Thor', lastName: 'Asgard'},
    { name: 'Iron', lastName: 'Man'},
    { name: 'Doctor', lastName: 'Strange'},
    { name: 'Spider', lastName: 'Man'}
];
