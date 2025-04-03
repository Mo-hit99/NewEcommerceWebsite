import {createSlice} from '@reduxjs/toolkit';
const recalcTotals = (state) => {
    state.cartTotalQuantity = state.cartItems.reduce(
      (prev, curr) => prev + curr.quantity,
      0
    );
    state.cartTotalAmount = state.cartItems.reduce(
      (prev, curr) => prev + curr.product.price * curr.quantity,
      0
    );
  };
  
  const localCartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems:  localCartItems,
        cartTotalQuantity: localCartItems.reduce((total,item)=> total + item.quantity,0),
        cartTotalAmount: localCartItems.reduce((total,item)=> total + item.product.price * item.quantity,0),
        redirectToLogin: false,
    },
    reducers: {
        addToCart (state,action){
            const {productId,quantity,product,selectedSize} = action.payload;
            const token = localStorage.getItem("token");
            if(!token){
                state.redirectToLogin = true;
            }else{
                state.redirectToLogin = false;
                const indexProductId = state.cartItems.findIndex((item)=> item.productId === productId);
                if(indexProductId >= 0){
                    state.cartItems[indexProductId].quantity += quantity;
                }else{
                    state.cartItems.push({productId,quantity,product,selectedSize});
                }
                state.cartTotalQuantity = state.cartItems.reduce(
                    (prev, curr) => prev + curr.quantity,
                    0
                  );
                state.cartTotalAmount = state.cartItems.reduce((prev,curr)=> prev + curr.product.price * curr.quantity,0)
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            }
        },
        removeToCart(state,action){
            const productId = action.payload;
            const nextCartItems = state.cartItems.filter((item)=> item.productId !== productId);
            state.cartItems = nextCartItems;
            state.cartTotalQuantity  = state.cartItems.reduce((prev,curr)=> prev + curr.quantity,0)
            state.cartTotalAmount = state.cartItems.reduce((prev,curr)=> prev + curr.product.price * curr.quantity,0)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))

        },
        updateQuantityItems(state,action){
            const productId = action.payload
            const itemIndex = state.cartItems.findIndex((cartItem)=> cartItem.productId === productId);
            if(itemIndex >= 0){
                state.cartItems[itemIndex].quantity++;
                recalcTotals(state)
            }
            state.cartTotalQuantity = state.cartItems.reduce((prev,curr)=> prev + curr.quantity,0)
            state.cartTotalAmount = state.cartItems.reduce((prev,curr)=> prev + curr.product.price * curr.quantity,0)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },

        subtractQuantityItems(state,action){
            const productId = action.payload
            const itemIndex = state.cartItems.findIndex((cartItem)=> cartItem.productId === productId);
            if(itemIndex >=0 && state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity--;
                recalcTotals(state)
            }
            state.cartTotalQuantity = state.cartItems.reduce((prev,curr)=> prev + curr.quantity,0)
            state.cartTotalAmount = state.cartItems.reduce((prev,curr)=> prev + curr.product.price * curr.quantity,0)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        },
        clearCart(state){
            state.redirectToLogin=false
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        }
    }
})

export const {addToCart,removeToCart,updateQuantityItems,subtractQuantityItems,clearCart} = cartSlice.actions;
export default cartSlice.reducer;