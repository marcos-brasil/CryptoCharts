import * as yup from 'yup';

export let singUpFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required to login.'),
  password: yup
    .string()
    .required('Password is required to login.')
    .min(4, 'Password must be longer then 4 characters.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password must match')
    .required('Password is required to login.')
    .min(4, 'Password must be longer then 4 characters.'),
});

export let signInFormSchema = yup.object().shape({
  email: yup.string().email().required('Email is required to login.'),
  password: yup
    .string()
    .required('Password is required to login.')
    .min(4, 'Password must be longer then 4 characters.'),
});
