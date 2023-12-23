import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Author, NotifyProp } from '../../app/type';
import { EDIT_BORN_YEAR } from '../../queries';
import { getErrorMsg, useField } from '../../app/utils';

type PropsType = {
  authors: Author[]
  notifyWith: NotifyProp
};

const AuthorBirthForm = ({ notifyWith, authors }: PropsType) => {
  const [name, setName] = useState<string>('');
  const bornYear = useField('number');

  const [editBirthYear, { loading }] = useMutation(EDIT_BORN_YEAR, {
    onError: (error) => notifyWith(getErrorMsg(error)),
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
    editBirthYear({ variables: { name, born: Number(bornYear.field.value) } });
    bornYear.setValue('');
  };

  if (loading) return null;

  return (
    <>
      <h4 className='my-3'>Edit Author's birthyear</h4>
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
          <Form.Control {...bornYear.field} />
        </Form.Group>

        <Button variant='outline-primary' type='submit'>update author</Button>
      </Form>
    </>
  );
};

export default AuthorBirthForm;