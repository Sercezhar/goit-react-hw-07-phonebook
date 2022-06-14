import { useState } from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';
import { toast } from 'react-toastify';
import { DotsLoader } from 'components/Loaders/DotsLoader/';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  function resetState() {
    setName('');
    setPhone('');
  }

  function handleInputChange(event) {
    const { name, value } = event.currentTarget;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'phone') {
      setPhone(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newContact = {
      name,
      phone,
    };

    const alreadyInContacts = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    try {
      if (alreadyInContacts) {
        toast.error(`${newContact.name.toUpperCase()} is already in contacts.`);
      } else {
        await addContact(newContact);
        toast.success(`${newContact.name.toUpperCase()} is added to contacts.`);
      }
    } catch (error) {
      console.log(error);
    }

    resetState();
  }

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <label className={styles.Label}>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="name"
          value={name}
          autoComplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </label>

      <label className={styles.Label}>
        <input
          className={styles.Input}
          type="tel"
          name="phone"
          placeholder="number"
          value={phone}
          autoComplete="off"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </label>

      <button type="submit" className={styles.SubmitBtn}>
        {isLoading ? <DotsLoader /> : 'Add contact'}
      </button>
    </form>
  );
}
