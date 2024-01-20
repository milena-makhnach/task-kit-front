import Box from '@mui/material/Box/Box';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import styles from './LabelPopoverItem.module.css';

import { Checkbox } from '@mui/material';
import { LabelType } from '@/shared/types/label';
import { LabelEditPopover } from './LabelEditPopover';

type LabelPopoverItemPropsType = {
	isAdded: boolean;
	label: LabelType;
	handleSetLabel: (id: number, added: boolean) => void;
};

export const LabelPopoverItem: FC<LabelPopoverItemPropsType> = ({
	label,
	isAdded,
	handleSetLabel,
}) => {
	const [checked, setChecked] = useState<boolean>(isAdded);

	const handleUpdateLabel = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		handleSetLabel(label.id, checked);
	};

	useEffect(() => {
		setChecked(isAdded);
	}, [isAdded]);

	return (
		<label htmlFor={`${label.color}-${label.id}`} className={styles.item}>
			<Checkbox
				id={`${label.color}-${label.id}`}
				color='secondary'
				checked={checked}
				onChange={handleUpdateLabel}
			/>
			<Box sx={{ background: label.color }} className={styles.mark}>
				{label.name || ''}
			</Box>
			<LabelEditPopover label={label} />
		</label>
	);
};
