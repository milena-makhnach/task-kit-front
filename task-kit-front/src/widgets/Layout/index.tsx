import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

import styles from './layout.module.css';

type layoutProps = {
	children: ReactNode;
};

export const Layout: FC<layoutProps> = ({ children }) => {
	return <Box className={styles.layout}>{children}</Box>;
};
