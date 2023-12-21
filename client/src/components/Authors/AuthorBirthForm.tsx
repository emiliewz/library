import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Author } from '../../app/type';
import { EDIT_BORN_YEAR } from '../../queries';

const AuthorBirthForm = ({ authors }: { authors: Author[] }) => {
  const [name, setName] = useState<string>('');
  const [born, setBorn] = useState<number>(2000);

  const [editBirthYear, { data, loading, error }] = useMutation(EDIT_BORN_YEAR);

  useEffect(() => {
    if (data && data.editAuthor === null) {
      console.log('Author not found');
    }
  }, [data]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    born && editBirthYear({ variables: { name, born } });
  };

  if (loading) return 'Submitting...';
  if (error) {
    console.log(error.graphQLErrors.map(e => e.message).join('\n'));
    return `Submission error! ${error.message}`;
  }

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