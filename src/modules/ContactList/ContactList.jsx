import PropTypes from 'prop-types';

import css from './ContactList.module.css';

const ContactList = ({ removeContact, filteredContacts }) => {
    const contactsList = filteredContacts.map(({ id, name, phone }) => <li key={id} className={css.list__item}>{name}: {phone}
        <button onClick={() => removeContact(id)} type="button" className={css.button__delete}>Delete</button></li>);

    return (
        <ol className={css.list}>
            {contactsList}
        </ol>)
};

export default ContactList;

ContactList.defaultProps = {
    filteredContacts: []
}

ContactList.propTypes = {
    removeContact: PropTypes.func.isRequired,
    filteredContacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }))
}