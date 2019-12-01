
import { ProductType } from '../../model/product-type';
import { CREATE_PRODUCTTYPE, Actions } from '../actions/product-type.actions';

const initialState1: ProductType = {
    descripcion: 'camisetas',
};

const initialState2: ProductType = {
    descripcion: 'vasos',
};

const initialState3: ProductType = {
    descripcion: 'comics',
};

const initialState4: ProductType = {
  descripcion: 'juguetes',
};

const initialState5: ProductType = {
  descripcion: 'accesorios',
};

export function reducer(
    state: ProductType[] = [initialState1, initialState2, initialState3, initialState4, initialState5],
    action: Actions) {

    switch (action.type) {
        case CREATE_PRODUCTTYPE:
            return [...state, action.payload];

        default:
            return state;
    }
}
