import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '@/shared/store/store';

type privateRouteProps = {
	children: ReactNode;
};

export const PrivateRoute: FC<privateRouteProps> = ({ children }) => {
	const { isAuth } = useSelector((state: RootState) => state.user);

	return <>{isAuth ? children : <Navigate to='/' />}</>;
};
