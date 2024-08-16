// middleware/localStorageMiddleware.js

const localStorageMiddleware = store => next => action => {
    const result = next(action);
  
    // Save state to localStoragec
    console.log(result)
    const state = store.getState();
    localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
  
    return result;
  };
  
  export default localStorageMiddleware;
  