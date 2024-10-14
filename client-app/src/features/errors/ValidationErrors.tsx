import { FC } from 'react';
import { Message } from 'semantic-ui-react';

const ValidationErrors: FC<{ errors: string[] }> = ({ errors }) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err) => (
            <Message.Item key={err}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationErrors;
