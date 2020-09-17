import {debounceTime} from 'rxjs/operators';

export interface MaterialAutocompleteModel {
    filterFieldName: string;
    displayField: string;
    source: { service: any, methodName: string };
    initialValue?: any;
    placeholder?: string;
    debounceTime?: number;
    notCallServiceWhenEmpty?: boolean;
    appearance?: 'outline' | 'legacy' | 'standard' | 'fill';
}
