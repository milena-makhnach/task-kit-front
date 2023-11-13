import { FC, useRef, useState } from 'react';
import Box from '@mui/material/Box/Box';

import { Navbar } from '@/widgets/Navbar';
import { Workspaces } from '@/widgets/Workspaces/index';

import styles from './home-page.module.css';

import { Board } from '../../shared/ui/Board/Board';
import { TaskCard } from '../../shared/ui/TaskCard/TaskCard';
import { LabelPopoverItem } from '../../shared/ui/LabelPopover/ui/LabelPopoverItem';
import { LabelPopover } from '../../shared/ui/LabelPopover/LabelPopover';
import { Button, Popover } from '@mui/material';
import { LabelPopoverButton } from '../../shared/ui/LabelPopover/ui/LabelPopoverButton';

export const HomePage: FC = () => {

	return (
		<Box className={styles.home}>
			<Navbar>
				<Box>dppdp</Box>
			</Navbar>
			<Box className={styles.content}>
				<Workspaces />				
			</Box>
		</Box>
	);
};
