import { createReducer } from "@reduxjs/toolkit";


export const fileDetails = createReducer({}, (builder) => {
    builder
        .addCase('uploadImgRequest', (state) => {
            state.loading = true;
        })
        .addCase('uploadImgSuccess', (state, action) => {
            state.loading = false;
            state.id = action.payload;
        })
        .addCase('uploadImgFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('showImgRequest', (state) => {
            state.loading = true;
        })
        .addCase('showImgSuccess', (state, action) => {
            state.loading = false;
            state.url = action.payload;
        })
        .addCase('showImgFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('showMailRequest', (state) => {
            state.loading = true;
        })
        .addCase('showMailSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('Error', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('showMailFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('clearError', (state) => {
            state.error = null;
        })
        .addCase('clearMessage', (state) => {
            state.message = null;
        })
        .addCase('clearId', (state) => {
            state.id = null;
        })
        .addCase('clearUrl', (state, action) => {
            state.url = null;
        });
});