import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Author, NotifyProp } from '../../app/type';
import { EDIT_BORN_YEAR } from '../../queries';

type PropsType = {
  authors: Author[]
  notifyWith: NotifyProp
};

const AuthorBirthForm = ({ notifyWith, authors }: PropsType) => {
  const [name, setName] = useState<string>('');
  const [born, setBorn] = useState<number>(2000);

  const [editBirthYear, { loading }] = useMutation(EDIT_BORN_YEAR, {
    onError: (error) => {
      notifyWith(error.graphQLErrors.map(e => e.message).join('\n'));
    },
    onCompleted: ({ editAuthor }) => {
      if (editAuthor) {
        notifyWith(`The author ${editAuthor.name}'s birth year has been updated successfully`);
      } else {
        notifyWith('Author not found');
      }
    }
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    born && editBirthYear({ variables: { name, born } });
  };

  if (loading) return null;

  return (
    <>
      <h2 className='my-3'>Set birthyear</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          aria-label='default select'
          onChange={({ target }) => setName(target.value)}
          defaultValue=''
        >
          <option value='' disabled>--Please choose an author--</option>
          {authors.map(a => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </Form.Select>

        <Form.Group>
          <Form.Label>born:</Form.Label>
          <Form.Control value={born} type='number' onChange={({ target }) => setBorn(Number(target.value))} />
        </Form.Group>

        <Button variant='outline-primary' type='submit'>update author</Button>
      </Form>
    </>
  );
};

export default AuthorBirthForm;