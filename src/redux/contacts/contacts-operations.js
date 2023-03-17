import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../shared/services/contact-api";

export const fetchAllContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkApi) => {
        try {
            const data = await api.getAllContacts();
            return data;
        }
        catch ({ response }) {
            return thunkApi.rejectWithValue(response.data);
        }
    },
);

export const fetchAddContact = createAsyncThunk(
    "contacts/addContact",
    async (data, thunkApi) => {
        try {
            const result = await api.addContact(data);
            return result;
        }
        catch ({ response }) {
            return thunkApi.rejectWithValue(response.data);
        }
    },
    {
        condition: ({ name }, { getState }) => {
            const { contacts } = getState();
            console.log(contacts)
            const normalizedName = name.toLowerCase();
            const result = contacts.items.find(({ name }) => {
                return (name.toLowerCase() === normalizedName);
            });
            if (result) {
                alert(`${name} is arleady ixist!`);
                return false;
            };
        },
    },
);

export const fetchDeleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkApi) => {
        try {
            await api.deleteContact(id);
            return id;
        }
        catch ({ response }) {
            return thunkApi.rejectWithValue(response.data);
        }
    },
);