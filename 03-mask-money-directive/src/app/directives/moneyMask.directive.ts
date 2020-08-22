import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[cepMask]'
})
export class CepMaskDirective {

    // used to update when using ngModel
    @Output()
    onCepChange = new EventEmitter<string>();

    @HostListener('input', ['$event'])
    input(event) {
        const input = (event.target as HTMLInputElement);
        let value = input.value;

        value = value.replace(/[^0-9]+/g, '');

        if (value.length > 5) {
            value = `${value.substr(0, 5)}-${value.substr(5, 3)}`
        }

        input.value = value;
        this.onCepChange.emit(value);
    }

}
