import { Container } from './Container';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Notification } from './Notification';
import { Filter } from './Filter';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { CircleLoader } from './Loaders/CircleLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const { data: contacts, isLoading } = useGetContactsQuery();

  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme={'colored'}
      />
      <Section tag={'h1'} title={'Phonebook'}>
        <ContactForm />
      </Section>

      <Section tag={'h2'} title={'Contacts'}>
        {isLoading ? (
          <CircleLoader className={'ListLoader'} />
        ) : (
          <>
            {contacts.length === 0 ? (
              <Notification message={'No contacts added'} />
            ) : (
              <>
                <Filter />
                <ContactList />
              </>
            )}
          </>
        )}
      </Section>
    </Container>
  );
}
