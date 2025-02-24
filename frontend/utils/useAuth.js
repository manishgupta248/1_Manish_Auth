import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from './store';
import Cookie from 'js-cookie';

const useAuth = () => {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isAuthChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setAuthChecked(true);
        } else {
            const accessToken = Cookie.get('accessToken');
            if (accessToken) {
                setAuthChecked(true);
            } else {
                router.push('/auth/login');
            }
        }
    }, [isAuthenticated, router]);

    return isAuthChecked;
};

export default useAuth;
