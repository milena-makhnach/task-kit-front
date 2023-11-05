import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import styles from './navbar.module.css';

type navbarProps = {
	children?: ReactNode;
};

export const Navbar: FC<navbarProps> = ({ children }) => {
	return (
		<nav className={styles.navbar}>
			<List sx={{ paddingTop: 0, paddingLeft: 0 }}>
				<ListItem className={`${styles.navbarLi} ${styles.active}`}>
					<Link to='/home'>Доски</Link>
				</ListItem>
			</List>
			{children}
		</nav>
	);
};
