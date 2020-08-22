export interface Product {
    id: number;
    description: string;
    soldDate?: {
      month: number,
      year: number,
      quinzena: 1 | 2
    };
}
