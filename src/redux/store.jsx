import { configureStore } from "@reduxjs/toolkit";
import detailSlice from "./slice/detailSlice";

const store = configureStore({
    reducer: {
        detail: detailSlice
    }
});
// console.log('oncreate store: ', store.getState());

store.subscribe(() => {
    // console.log('store change : ', store.getState());
});

export default store;