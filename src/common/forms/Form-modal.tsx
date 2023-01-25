import { ErrorMessage, FastField, withFormik } from 'formik';
import React, { memo } from 'react';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const FormModal = (): any => {
  return (
    <form>
      <div className="box">
        <label htmlFor="login">Login:</label>
        <FastField name="login" placeholder="login" />
        <span className="msg-error">
          <ErrorMessage name="login" />
        </span>
      </div>

      <div className="box">
        <label htmlFor="password">Password:</label>
        <FastField name="password" type="password" />
        <span className="msg-error">
          <ErrorMessage name="password" />
        </span>
      </div>

      <button className="button" type="submit">
        Send
      </button>
    </form>
  );
};

const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ login: '', password: '' }),
  validationSchema: Schema,
  handleSubmit: (values) => {
    console.log(values);
  },
});

export default enhanceWithFormik(memo(FormModal));
