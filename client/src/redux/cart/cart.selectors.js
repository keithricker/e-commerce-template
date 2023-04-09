import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectItemsCount = createSelector(
    [selectItems],
    cartItems => cartItems.reduce((total, item) => total + item.quantity, 0)
)

export const selectItemsTotal = createSelector(
    [selectItems],
    cartItems => cartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
)