import { Login } from '@/features/login/ui/Login';
import { Signup } from '@/features/signup/ui/Signup';
import { HomePage } from '@/pages/HomePage';
import { RouteObject } from 'react-router-dom';
import { PrivateRoute } from '../ui/PrivateRoute';

export const routerConfig: RouteObject[] = [
	{ path: '/', element: <Login /> },
	{ path: '/signup', element: <Signup /> },
	{
		path: '/home',
		element: (
			<PrivateRoute>
				<HomePage />
			</PrivateRoute>
		),
	},
];
