import React, { ReactElement, useState, useEffect } from 'react';

import { LoadingContainerProps } from './LoadingContainer.types';

const LoadingContainer = (props: LoadingContainerProps): null | ReactElement => {
  const { children } = props;

  const [show, setShow] = useState(false);

  useEffect(() => {
    const tid = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(tid);
  }, []);

  if (!show) {
    return null;
  }

  return <>{children}</>;
};

export { LoadingContainer };
