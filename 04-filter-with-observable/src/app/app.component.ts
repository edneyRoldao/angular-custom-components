import { Component } from '@angular/core';

@Component({
    selector: 'root',
    template: `
        
        <div class="mt-4 container">
            <app-filter></app-filter>
            <app-list></app-list>
        </div>
        
    `
})
export class AppComponent {

}
