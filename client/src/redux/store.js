import { configureStore } from "@reduxjs/toolkit";
import { fileDetails } from "./reducers/details";

const store = configureStore({
    reducer: {
        details: fileDetails,
    }
});

export default store;

export const server = "http://localhost:4000";
// export const server = "https://airflex.onrender.com/api";