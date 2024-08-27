import { IProduct } from "@/types/productType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: IProduct[];
  loading: boolean;
  type: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  type: "collection",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
        const existingProduct = state.products.find(
          (product) => product._id === action.payload._id
        );
  
        if (!existingProduct) {
          state.products.push(action.payload);
        }
      },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, clearProducts } =
  productSlice.actions;

export default productSlice.reducer;
