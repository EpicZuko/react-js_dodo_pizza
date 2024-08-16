import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    items: JSON.parse(localStorage.getItem('pizzaCart')) || [],
    counts: JSON.parse(localStorage.getItem('pizzaCounts')) || {},
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      state.counts[item.id] = (state.counts[item.id] || 0) + 1;
      const itemInCart = state.items.find(cartItem => cartItem.id === item.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('pizzaCounts', JSON.stringify(state.counts));
      localStorage.setItem('pizzaCart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      if (state.counts[itemId]) {
        state.counts[itemId] -= 1;
        if (state.counts[itemId] === 0) {
          delete state.counts[itemId];
          state.items = state.items.filter(item => item.id !== itemId);
        } else {
          const itemInCart = state.items.find(item => item.id === itemId);
          if (itemInCart) itemInCart.quantity = state.counts[itemId];
        }
        localStorage.setItem('pizzaCounts', JSON.stringify(state.counts));
        localStorage.setItem('pizzaCart', JSON.stringify(state.items));
      }
    },
  },
});

export const { addItem, removeItem } = cardSlice.actions;
export default cardSlice.reducer;
