import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface LoadingProps {
  content?: string;
  inverted?: boolean;
}

const Loading: FC<LoadingProps> = ({
  content = 'Loading app...',
  inverted = true,
}) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default Loading;
