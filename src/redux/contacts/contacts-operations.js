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
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.addContact(data);
            return result;
        }
        catch ({ response }) {
            return rejectWithValue(response.data);
        }
    },
    {
        condition: ({ name }, { getState }) => {
            const { contacts } = getState();
            const normalizedName = name.toLowerCase();
            const result = contacts.find(({ name }) => {
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
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteContact(id);
            return id;
        }
        catch ({ response }) {
            return rejectWithValue(response.data);
        }
    },
);