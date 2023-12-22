import { Alert } from 'react-bootstrap';
import { Info } from '../app/type';

const Notification = ({ info }: { info: Info }) => {

  if (!info.message) return null;

  return (
    <Alert variant={info.type === 'error' ? 'warning' : 'info'}>
      {info.message}
    </Alert >
  );
};

export default Notification;
