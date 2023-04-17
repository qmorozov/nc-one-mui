import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Oops, something went wrong.</h1>
      <Link href="/">
        <Button variant="outlined">Go to main page</Button>
      </Link>
    </div>
  );
};

export default NotFound;
