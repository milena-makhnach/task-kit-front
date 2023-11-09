import styles from './Chip.module.css';
import { Box } from '@mui/material';

type ChipType = {
    img: string,
    text: string,
}

export const Chip = ({img, text}: ChipType) => {


    return (
        <Box className={styles.chip}>
            {img && <img alt='' src={img} />}
            <p>{text}</p>
        </Box>
    )
}