import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { themePalette } from './shared/theme';
import { RootState, useAppDispatch } from './shared/store/store';
import { Layout } from './pages/Layout';
import { ProfilePage } from './pages/ProfilePage';
import { BoardPage } from './pages/BoardPage';
import { HomePage } from './pages/HomePage';
import { Signup } from './features/signup/ui/Signup';
import { Login } from './features/login/ui/Login';
import { TaskExpendedCard } from './widgets/TaskExpendedCard/TaskExpendedCard';
import { setTheme } from './shared/slices/theme';

export const Routing: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const user = useSelector((state: RootState) => state.user);

	const background = location.state && location.state.background;

	useEffect(() => {
		!user.isAuth && navigate('/login');
	}, []);

	useEffect(() => {
		if (!location.pathname.includes('board')) {
			dispatch(setTheme(themePalette.defaultPalette));
		}
	}, [location.pathname]);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<Signup />} />
				<Route path='/board/:board_id' element={<BoardPage />}>
					<Route index element={<BoardPage />} />
					{background && (
						<Route
							path={'/board/:board_id/task/:task_id'}
							//@ts-ignore
							element={<TaskExpendedCard />}
						/>
					)}
				</Route>
				<Route path='/profile' element={<ProfilePage />} />
			</Route>
		</Routes>
	);
};
