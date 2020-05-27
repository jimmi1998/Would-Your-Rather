import React from 'react';
import { Link } from 'react-router-dom';


const PageNotFound = () => (
  <div><h2>Oops, Page not found</h2>
    <Link to='/'>Go back home</Link>
  </div>
);

export default PageNotFound;
