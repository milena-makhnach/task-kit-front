import styles from './DatePopover.module.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePopover = () => {
	const [value, onChange] = useState<Value>([new Date(2017, 0, 1), new Date(2017, 0, 2)]);

	return (
		<div>
			<Calendar defaultView='month' allowPartialRange  onChange={onChange} value={value} />
		</div>
	);
};
