import { useForm } from 'react-hook-form';
import { changePassword } from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import useAuth from '@/utils/useAuth';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const newPassword = watch('new_password');
  const router = useRouter();
  const isAuthChecked = useAuth();

  const onSubmit = async (data) => {
    try {
      await changePassword({
        new_password: data.new_password,
        current_password: data.current_password,
      });
      toast.success('Password changed successfully!');
      router.push('/profile'); // Redirect after successful change
    } catch (error) {
      toast.error('Password change failed. Please check your details.');
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="current_password"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="current_password"
              {...register('current_password', {
                required: 'Current password is required',
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.current_password && (
              <p className="text-red-500 text-sm">
                {errors.current_password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="new_password"
              {...register('new_password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.new_password && (
              <p className="text-red-500 text-sm">
                {errors.new_password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="re_new_password"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter New Password
            </label>
            <input
              type="password"
              id="re_new_password"
              {...register('re_new_password', {
                required: 'Please re-enter your new password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.re_new_password && (
              <p className="text-red-500 text-sm">
                {errors.re_new_password.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;