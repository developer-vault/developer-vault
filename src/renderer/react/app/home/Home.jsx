import React, { memo } from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import isAuthenticated from 'react/hoc/isAuthenticated';

const enhancer = compose(
  isAuthenticated,
  memo,
);

const Home = () => (
  <div>
    <h1>Home</h1>
    <ul>
      <li>
        <Link to="/nodes">
          Nodes management
        </Link>
      </li>
    </ul>
  </div>
);

Home.displayName = 'Home';

export default enhancer(Home);
