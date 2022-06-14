import PropTypes from 'prop-types';
import { ContactListItem } from './ContactListItem';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filterSlice';
import { CircleLoader } from 'components/Loaders/CircleLoader';

export function ContactList() {
  const { data: contacts, isLoading } = useGetContactsQuery();
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <CircleLoader className={'ListLoader'} />
      ) : (
        <ul>
          {filteredContacts.map(({ id, name, phone }) => (
            <ContactListItem key={id} id={id} name={name} number={phone} />
          ))}
        </ul>
      )}
    </>
  );
}

ContactList.propTypes = {
  contactsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
