import React, { useState } from 'react';
import { useField } from '../utils';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS } from '../queries';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const title = useField('text');
  const author = useField('text');
  const published = useField('number');
  const genre = useField('');
  const [genres, setGenres] = useState<string[]>([]);
  const navigate = useNavigate();

  const [createBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
    onError: (error) => {
      let messages = error.graphQLErrors.map(e => e.message).join('\n');
      console.log((error));

      if (error.graphQLErrors[0]?.extensions) {
        messages += error.graphQLErrors[0].extensions?.error?.message;
      }
      console.log(messages);
    },
    onCompleted: () => {
      navigate('/books');
    },
    update: (cache, response) => {
      cache.updateQuery({ query: GET_ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data?.addBook),
        };
      });
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createBook({
      variables: {
        title: title.field.value,
        author: author.field.value,
        published: Number(published.field.value),
        genres
      }
    });

    title.setValue('');
    author.setValue('');
    published.setValue('');
    genre.setValue('');
    setGenres([]);
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

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

        <Button variant='primary' type='submit'>create book</Button>
      </Form >
    </div>
  );
};

export default NewBook;