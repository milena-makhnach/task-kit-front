import { Chip } from '../Chip/Chip';
import styles from './TaskCard.module.css';
import Box from '@mui/material/Box/Box';
import { FC, useState } from 'react';

import userIcon from '../../../assets/icons/user.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import labelIcon from '../../../assets/icons/label.svg';
import checkIcon from '../../../assets/icons/check.svg';
import timeIcon from '../../../assets/icons/clock.svg';
import attachIcon from '../../../assets/icons/attach.svg';
import coverIcon from '../../../assets/icons/window.svg';
import boardIcon from '../../../assets/icons/tab.svg';
import removeIcon from '../../../assets/icons/delete.svg';
import CloseIcon from '@mui/icons-material/Close';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LabelPopoverButton } from '../LabelPopover/ui/LabelPopoverButton';
import { LabelPopover } from '../LabelPopover/LabelPopover';
import { MembersPopover } from '../MembersPopover/MembersPopover';
import { FilePopover } from '../FilePopover/FilePopover';
import { DatePopover } from '../DatePopover/DatePopover';
import { api } from '@/shared/api/base-query';
import { useQuery } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';

type TaskCardType = {
	closeTask: React.Dispatch<React.SetStateAction<boolean>>;
	columnName: string;
	taskId: number;
};

const taskSideBarItems = [
	{ id: 1, img: userIcon, text: 'Участники', item: <MembersPopover /> },
	// { id: 2, img: labelIcon, text: 'Метки', item: <LabelPopover /> },
	{ id: 2, img: timeIcon, text: 'Даты', item: <DatePopover /> },
	{ id: 3, img: attachIcon, text: 'Вложение', item: <FilePopover /> },
	{ id: 4, img: coverIcon, text: 'Обложка', item: <LabelPopover /> },
	{ id: 5, img: removeIcon, text: 'Удалить', item: <LabelPopover /> },
];

const getTask = async ({ queryKey }: { queryKey: any }) => {
	const [_, { task_id, board_id }] = queryKey;

	const { data } = await api.get(`/board/${board_id}/task/${task_id}`);

	return data;
};

export const TaskCard: FC<TaskCardType> = ({
	closeTask,
	columnName,
	taskId,
}) => {
	const { id } = useParams();

	const [value, setValue] = useState('');

	const { data } = useQuery({
		queryFn: getTask,
		queryKey: ['task', { task_id: taskId, board_id: id }],
	});

	return (
		<Box className={styles.taskWrapper}>
			<Box className={styles.task}>
				<IconButton
					onClick={() => closeTask(false)}
					sx={{
						position: 'absolute',
						right: '3%',
						top: '3%',
					}}>
					<CloseIcon />
				</IconButton>
				<Box className={styles.leftSide}>
					<Box className={styles.taskHeader}>
						<Box className={styles.taskname}>
							<p className={styles.title}>{data?.name}</p>
							<p>в колонке: {columnName}</p>
						</Box>
					</Box>
					<Box className={styles.descript}>
						<p className={styles.title}>Описание</p>
						<ReactQuill
							className={styles.textEditor}
							theme='snow'
							value={value}
							onChange={setValue}
						/>
						<Box className={styles.btnWrapper}>
							<button>Сохранить</button>
							<button>Отмена</button>
						</Box>
					</Box>
					<Box className={styles.comment}>
						<p className={styles.title}>Действия</p>
						<div className={styles.commentWrapper}>
							<img src={userIcon} alt='user' />
							<textarea placeholder='Напишите коментарий...' />
						</div>
					</Box>
				</Box>
				<Box className={styles.rightSide}>
					<p>Добавить на карточку</p>
					{taskSideBarItems.map((el) => (
						<LabelPopoverButton
							key={el.id}
							img={el.img}
							text={el.text}
							item={el.item}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
};
