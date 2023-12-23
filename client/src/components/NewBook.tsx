import React, { useState } from 'react';
import { getErrorMsg, useField } from '../app/utils';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS, GET_LOGGEDIN_USER } from '../queries';
import { useNavigate } from 'react-router-dom';
import { NotifyProp } from '../app/type';

const NewBook = ({ notifyWith }: { notifyWith: NotifyProp }) => {
  const title = useField('text');
  const author = useField('text');
  const published = useField('number');
  const genre = useField('');
  const [genres, setGenres] = useState<string[]>([]);
  const navigate = useNavigate();

  const [createBook, { loading }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
    onError: (error) => notifyWith(getErrorMsg(error)),
    onCompleted: () => {
      notifyWith(`Book ${title.field.value} by ${author.field.value} added successfully.`);
      navigate('/');
    },
    update: (cache, { data }) => {
      cache.updateQuery({ query: GET_ALL_BOOKS, variables: { genre: null } }, (cachedBooks) => {
        if (cachedBooks) {
          let allBooks = cachedBooks?.allBooks;
          const newBook = data?.addBook;
          if (newBook) {
            allBooks = allBooks?.concat(newBook);
          }
          return { allBooks };
        }
      });
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createBook({
      variables: {
        title: title.field.value,
        author: author.field.value,
        published: published.field.value ? Number(published.field.value) : new Date().getFullYear(),
        genres
      }
    });
  };

  const loggInuser = useQuery(GET_LOGGEDIN_USER);
  const user = loggInuser.data?.getLoggedInUser;

  if (loading || !user) return null;

  return (
    <div>
      <Form className='my-3' onSubmit={handleSubmit}>

        <Form.Group className='mb-3'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            placeholder='title'
            {...title.field}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            placeholder='author'
            {...author.field}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Published:</Form.Label>
          <Form.Control
            placeholder='published'
            {...published.field}
          />
        </Form.Group>

        <InputGroup className='mb-3'>
          <Form.Control
            placeholder='genre'
            {...genre.field}
          />
          <Button variant='outline-info' onClick={() => {
            setGenres(v => v.concat(genre.field.value));
            genre.setValue('');
          }}>
            add genre
          </Button>
        </InputGroup>

        <div className='mb-3'>
          genres: {genres.join(' ')}
        </div>

        <Button variant='outline-primary' type='submit'>create book</Button>
      </Form >
    </div>
  );
};

export default NewBook;