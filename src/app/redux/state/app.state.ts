import { ProductType } from 'src/app/model/product-type';

export interface AppState {
    readonly productTypes: ProductType[];
}
