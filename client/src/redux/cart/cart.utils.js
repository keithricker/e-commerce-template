export const addItemToCart = (cartItems, cartItemToAdd) => {
   const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

   if (existingCartItem) {
      return cartItems.map(
         cartItem => {
            return cartItem.id === cartItemToAdd.id ? {
               ...cartItem, quantity: cartItem.quantity +1
            } : cartItem
         }
       );
    }
    return [ ...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const reduceItemQuantity = (cartItems, cartItemToReduce) => {
   const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToReduce.id);
   if (existingCartItem.quantity === 1) {
      return cartItems.filter(item => item.id !== cartItemToReduce.id);
   }
   return cartItems.map(item =>
      item.id === cartItemToReduce.id 
      ? { ...item, quantity: item.quantity -1 }
      : item
    );
}