import { Button } from '@mui/material';
import styles from './LabelPopover.module.css';
import Box from '@mui/material/Box/Box';
import { LabelPopoverItem } from './ui/LabelPopoverItem';
import { FC } from 'react';

const labels = [
    { id: 1, color: '#4BCE98' },
    { id: 2, color: '#F5CD47' },
    { id: 3, color: '#FFA362' },
    { id: 4, color: '#F8716B' },
    { id: 5, color: '#9F8FF2' },
    {id: 6, color: '#579CFF'},
]
export const LabelPopover: FC = () => {
    return ( 
        <Box className={styles.container}>
            <p>Метки</p>
            <Box>
                <input type="text" />
            </Box>
            <Box>
                <p>метки</p>
                {labels.map(el => <LabelPopoverItem key={el.id} color={el.color} />)}
            </Box>
            <Button variant='contained'>Создать новую метку</Button>
        </Box>
    )
}