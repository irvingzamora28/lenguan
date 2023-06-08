import React from "react";

interface LoginFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string[];
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onChange, errorMessage }) => {
  return (
    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm space-y-3">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
      </div>
      {errorMessage && (
        <div className="login__error">
          {errorMessage.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
