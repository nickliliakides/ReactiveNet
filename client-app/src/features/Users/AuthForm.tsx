import { FC } from 'react';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header, Label } from 'semantic-ui-react';

import { useStore } from '../../app/stores/store';
import TextInput from '../../app/common/form/TextInput';
import {
  loginFormInitialValues,
  loginFormValidationSchema,
  registerFormInitialValues,
  registerFormValidationSchema,
} from '../../app/common/constants';
import { UserFormValues } from '../../app/models/user';
import ValidationErrors from '../errors/ValidationErrors';

const AuthForm: FC<{ isSignUp?: boolean }> = ({ isSignUp }) => {
  const {
    userStore: { login, register },
  } = useStore();

  const submitLogin = (
    values: UserFormValues & { error: Error | null },
    {
      setErrors,
      setSubmitting,
    }: FormikHelpers<UserFormValues & { error: null }>
  ) => {
    login(values)
      .catch(() => setErrors({ error: 'Invalid credentials' }))
      .finally(() => setSubmitting(false));
  };

  const submitRegister = (
    values: UserFormValues & { error: Error | null },
    {
      setErrors,
      setSubmitting,
    }: FormikHelpers<UserFormValues & { error: null }>
  ) => {
    register(values)
      .catch((error) => setErrors({ error }))
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={
        isSignUp ? registerFormInitialValues : loginFormInitialValues
      }
      onSubmit={!isSignUp ? submitLogin : submitRegister}
      validationSchema={
        isSignUp ? registerFormValidationSchema : loginFormValidationSchema
      }
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className='ui form error'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <Header
            as='h2'
            content={
              isSignUp ? 'Register to gain access' : 'Login to retrieve access'
            }
            color='teal'
            textAlign='center'
          />
          {isSignUp && (
            <>
              <TextInput placeholder='Username' name='username' required />
              <TextInput placeholder='Display name' name='displayName' />
            </>
          )}
          <TextInput placeholder='Email' name='email' type='email' required />
          <TextInput
            placeholder='Password'
            name='password'
            type='password'
            required
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content={isSignUp ? 'Sign up' : 'Login'}
            type='submit'
            fluid
          />
          <ErrorMessage
            name='error'
            render={() =>
              isSignUp ? (
                <ValidationErrors
                  errors={errors.error as unknown as string[]}
                />
              ) : (
                <Label
                  style={{ marginTop: 10 }}
                  basic
                  color='red'
                  content={errors.error}
                />
              )
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(AuthForm);
