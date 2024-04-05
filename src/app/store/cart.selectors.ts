import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { CartState } from "./cart.reducers";

export const selectFeature = (state: AppState) => state.cart;

export const selectCartProducts = createSelector(selectFeature, (state: CartState) => state.cartProducts);
export const selectCartQuantity = createSelector(selectFeature, (state: CartState) => state.cartQuantity);
