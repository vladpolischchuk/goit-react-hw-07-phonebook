import { createSlice } from "@reduxjs/toolkit";

import {
    fetchAllContactsLoading,
    fetchAllContactsSuccess,
    fetchAllContactsError,
    fetchAddAllContactsLoading,
    fetchAddAllContactsSuccess,
    fetchAddAllContactsError,
    fetchDeleteContactsLoading,
    fetchDeleteContactsSuccess,
    fetchDeleteContactsError
} from "./contacts-actions";

const initialState = {
    items: [],
    loading: false,
    error: null,
};



const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: {
        [fetchAllContactsLoading]: (store) => {
            store.loading = true;
        },
        [fetchAllContactsSuccess]: (store, { payload }) => {
            store.loading = false;
            store.items = payload;
        },
        [fetchAllContactsError]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
        [fetchAddAllContactsLoading]: (store) => {
            store.loading = true;
        },
        [fetchAddAllContactsSuccess]: (store, { payload }) => {
            store.loading = false;
            store.itemd.push(payload);
        },
        [fetchAddAllContactsError]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
        [fetchDeleteContactsLoading]: (store) => {
            store.loading = true;
        },
        [fetchDeleteContactsSuccess]: (store, { payload }) => {
            store.loading = false;
            const index = store.items.findIndex(item => item.id === payload);
            store.items.splice(index, 1);
        },
        [fetchDeleteContactsError]: (store, { payload }) => {
            store.loading = false;
            store.error = payload;
        },
    }
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;