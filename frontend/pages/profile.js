import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getUser, updateUser, logoutUser } from '@/utils/api';
import useAuthStore from '@/utils/store';
import useAuth from '@/utils/useAuth';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const isAuthChecked = useAuth();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setValue('email', userData.email);
        setValue('first_name', userData.first_name);
        setValue('last_name', userData.last_name);
      } catch (error) {
        router.push('/auth/login');
      }
    };
    if (isAuthChecked) {
      fetchUser();
    }
  }, [isAuthChecked, setUser, router, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register('first_name', { required: 'First Name is required' })}
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
              {...register('last_name', { required: 'Last Name is required' })}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Profile
            </button>
          </div>
        </form>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default Profile;