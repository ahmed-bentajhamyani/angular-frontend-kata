import { createAction, props } from "@ngrx/store";

export const addToCart = createAction('[Item] Add to cart', props<{ itemId: number }>());
export const removeFromCart = createAction('[Item] Remove from cart', props<{ itemId: number }>());
export const deleteItemFromCart = createAction('[Item] Delete item from cart', props<{ itemId: number }>());
export const deleteAll = createAction('[Item] Delete all');
