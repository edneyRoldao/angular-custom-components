export interface MaterialAutocompleteModel {
    initialValue?: any;
    placeholder: string;
    filterValue: string;
    displayField: string;
    source: { service: any, methodName: string };
}
