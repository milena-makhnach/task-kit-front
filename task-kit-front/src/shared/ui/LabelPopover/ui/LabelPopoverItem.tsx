import Box from '@mui/material/Box/Box';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './LabelPopoverItem.module.css'

import penIcon from '../../../../assets/icons/pen.svg'
import { Checkbox } from '@mui/material';

type LabelPopoverItemType = {
	color: string;
};
export const LabelPopoverItem: FC<LabelPopoverItemType> = ({
	color,
}) => {
    const [isInputActive, setIsInputActive] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef !== null && isInputActive) {
            inputRef.current?.focus()
        }
    }, [isInputActive])
	return (
		<Box className={styles.item}>
			<Checkbox />
			<input className={styles.mark} disabled={!isInputActive} ref={inputRef} style={{ background: color }} type='text' />
            <button onClick={() => setIsInputActive(true)}>
                <img alt='' src={penIcon}></img>
            </button>
		</Box>
	);
};
