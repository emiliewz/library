import { FormEvent, FormEventHandler } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getErrorMsg, useField } from '../app/utils';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../queries';
import { NotifyProp } from '../app/type';

const RegisterForm = ({ notifyWith }: { notifyWith: NotifyProp }) => {
  const name = useField('text');
  const username = useField('text');
  const password = useField('password');
  const favoriteGenre = useField('text');
  const navigate = useNavigate();

  const [createUser, { loading }] = useMutation(REGISTER_USER, {
    onError: (error) => notifyWith(getErrorMsg(error)),
    onCompleted: (data) => {
      if (data.createUser) {
        notifyWith('Your registration was successful! Please log in.');
        navigate('/login');
      }
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser({
      variables: {
        name: name.field.value,
        username: username.field.value,
        password: password.field.value,
        favoriteGenre: favoriteGenre.field.value
      }
    });
  };

  if (loading) return null;

  return (
    <div>
      <h2>Register the application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            {...username.field}
          />

          <Form.Label>name:</Form.Label>
          <Form.Control
            id='name'
            {...name.field}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            {...password.field}
          />

          <Form.Label>favoriteGenre:</Form.Label>
          <Form.Control
            id='favoriteGenre'
            {...favoriteGenre.field}
          />

          <Button id='register-button' type='submit' variant='outline-primary'>
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RegisterForm;

