import * as api from "../../shared/services/contact-api";

import * as actions from "./contacts-actions";

export const fetchAllContacts = () => {
    const func = async (dispatch) => {
        try {
            dispatch(actions.fetchAllContactsLoading()); //запрос пішов
            const data = await api.getAllContacts();
            dispatch(actions.fetchAllContactsSuccess(data)); // запрос прийшов
        }
        catch ({ response }) {
            dispatch(actions.fetchAllContactsError(response.data.message)); // відповідь з помилкою
        }
    };

    return func;
};

const isDublicate = (contacts, { name }) => {
    const normalizedName = name.toLowerCase();

    const result = contacts.find(({ name }) => {
        return (name.toLowerCase() === normalizedName);
    });

    return Boolean(result);
};

export const fetchAddContact = (data) => {
    const func = async (dispatch, getState) => {
        try {
            const { contacts } = getState();
            if (isDublicate(contacts.items, data)) {
                alert(`${data.name} contact is already ixist`);
                return false;
            }
            dispatch(actions.fetchAddAllContactsLoading()); //запрос пішов
            const result = await api.addContact(data);
            dispatch(actions.fetchAddAllContactsSuccess(result)); // запрос прийш
        }
        catch ({ response }) {
            dispatch(actions.fetchAddAllContactsError(response.data.message)); // відповідь з помилкою
        }
    };

    return func;
};

export const fetchDeleteContact = (id) => {
    const func = async (dispatch) => {
        try {
            dispatch(actions.fetchDeleteContactsLoading());
            await api.deleteContact(id);
            dispatch(actions.fetchDeleteContactsSuccess(id));
        }
        catch ({ response }) {
            dispatch(actions.fetchDeleteContactsError(response.data.message)); // відповідь з помилкою
        }
    };

    return func;
};