import { useForm } from 'react-hook-form';
import { registerUser, logoutUser } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import useAuthStore from '@/utils/store';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success('Registration successful!');
      await logoutUser();
      clearUser();
      router.push('/auth/login');
    } catch (error) {
      toast.error('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ... (rest of the form input fields) ... */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register('first_name', { required: 'First name is required' })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register('last_name', { required: 'Last name is required' })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="re_password"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              type="password"
              id="re_password"
              {...register('re_password', {
                required: 'Please re-enter your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.re_password && (
              <p className="text-red-500 text-sm">
                {errors.re_password.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;