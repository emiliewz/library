import ReactDOM from 'react-dom/client';
import App from './app/App';
import { ApolloClient, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import { errorLink, getSplitLink } from './app/utils';
import { BrowserRouter as Router } from 'react-router-dom';

const client = new ApolloClient({
  link: from([errorLink, getSplitLink()]),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
