import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import ContactFilter from "../ContactFilter/ContactFilter";

import { setFilter } from '../../redux/filter/filter-slice';

import { getFilter } from '../../redux/filter/filter-selectors';
import { getFilteredContacts } from "../../redux/contacts/contacts-selectors";

import { fetchAllContacts, fetchDeleteContact } from '../../redux/contacts/contacts-operations';

const Phonebook = () => {
    const dispatch = useDispatch();

    const filter = useSelector(getFilter);
    const filteredContacts = useSelector(getFilteredContacts);

    useEffect(() => {
        dispatch(fetchAllContacts());
    }, [dispatch]);


    const handleDeleteContact = (id) => {
        dispatch(fetchDeleteContact(id));
    };

    const handleFilter = ({ target }) => dispatch(setFilter(target.value));

    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm />
            <h1>Contacts</h1>
            <ContactFilter value={filter} handleChange={handleFilter} />
            <ContactList removeContact={handleDeleteContact} filteredContacts={filteredContacts} />
        </div>
    );
};

export default Phonebook;