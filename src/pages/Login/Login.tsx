import React from 'react';
import { useForm } from 'react-hook-form';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../../store/slices/authSlice';
import { RootState } from '../../store/store';
import styles from './Login.module.scss';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    dispatch(loginStart());
    try {
      const user = { id: '1', name: 'Vlad Nasulin', email: data.email };
      dispatch(loginSuccess(user));
    } catch (err: any) {
      dispatch(loginFailure(err.message ?? 'Login failed'));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form
        className={styles.loginForm}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="on"
      >
        <h2>Login</h2>
        <label>
          Email
          <input
            type="email"
            autoComplete="username"
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,10}$/,
                message: 'Некорректный email',
              },
            })}
          />
        </label>
        {errors.email && (
          <div className={styles.passwordError}>{errors.email.message}</div>
        )}
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
              validate: (value) =>
                /[A-Za-z]/.test(value) && /\d/.test(value)
                  ? true
                  : 'Пароль должен содержать буквы и цифры',
            })}
          />
        </label>
        {errors.password && (
          <div className={styles.passwordError}>{errors.password.message}</div>
        )}
        {error && <div className={styles.error}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
