import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ProductType } from '../../model/product-type';

export const CREATE_PRODUCTTYPE = 'Create_ProductType';

export class CreateProductType implements Action {
    readonly type = CREATE_PRODUCTTYPE;

    constructor(public payload: ProductType) { }
}


export type Actions = CreateProductType;
