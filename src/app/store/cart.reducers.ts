import { createReducer, on } from "@ngrx/store";
import * as CartActions from "./cart.actions";
import { CartItem } from "../models/cart-item.model";

export interface CartState {
    cartProducts: CartItem[],
    cartQuantity: number,
}

export const initialState: CartState = {
    cartProducts: JSON.parse(localStorage.getItem("CartProducts")!) || [],
    cartQuantity: (JSON.parse(localStorage.getItem("CartProducts")!) as CartItem[])?.reduce((quantity: number, item: CartItem) => item.quantity + quantity, 0) || 0,
}

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addToCart, (state: any, { itemId }) => {
        const existingItem = state.cartProducts?.find((item: CartItem) => item.id === itemId);

        if (!existingItem) {
            const newCartProduct = { id: itemId, quantity: 1 };
            const newCartProducts = [...state.cartProducts, newCartProduct];
            const newCartQuantity = state.cartQuantity + 1;
            setLocalStorage(newCartProducts);
            return { ...state, cartProducts: newCartProducts, cartQuantity: newCartQuantity };
        } else {
            const newCartProducts = state.cartProducts.map((cartProduct: CartItem) => {
                if (cartProduct.id === existingItem.id) {
                    return { ...cartProduct, quantity: cartProduct.quantity + 1 };
                }
                else return cartProduct;
            });
            const newCartQuantity = state.cartQuantity + 1;
            setLocalStorage(newCartProducts);
            return { ...state, cartProducts: newCartProducts, cartQuantity: newCartQuantity };
        }
    }),
    on(CartActions.removeFromCart, (state: any, { itemId }) => {
        const existingItem = state.cartProducts?.find((item: CartItem) => item.id === itemId);

        if (!existingItem) {
            return { ...state };
        } else {
            const newCartProducts = state.cartProducts.map((cartProduct: CartItem) => {
                if (cartProduct.id === existingItem.id) {
                    return { ...cartProduct, quantity: cartProduct.quantity - 1 };
                }
                else return cartProduct;
            });
            const newCartQuantity = state.cartQuantity - 1;
            setLocalStorage(newCartProducts);
            return { ...state, cartProducts: newCartProducts, cartQuantity: newCartQuantity };
        }
    }),
    on(CartActions.deleteItemFromCart, (state: any, { itemId }) => {
        const existingItem = state.cartProducts?.find((item: CartItem) => item.id === itemId);

        if (!existingItem) {
            return { ...state };
        } else {
            const newCartQuantity = state.cartQuantity - existingItem.quantity;
            const newCartProducts = state.cartProducts.filter((cartProduct: CartItem) => cartProduct.id !== existingItem.id);
            setLocalStorage(newCartProducts);
            return { ...state, cartProducts: newCartProducts, cartQuantity: newCartQuantity };
        }
    }),
    on(CartActions.deleteAll, (state: any) => {
        const newCartProducts: CartItem[] = []
        const newCartQuantity = 0;
        setLocalStorage(newCartProducts);
        return { ...state, cartProducts: newCartProducts, cartQuantity: newCartQuantity };
    }),
)

function setLocalStorage(cartProducts: CartItem[]) {
    localStorage.setItem("CartProducts", JSON.stringify(cartProducts));
}