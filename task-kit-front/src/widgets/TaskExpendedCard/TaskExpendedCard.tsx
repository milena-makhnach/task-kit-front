import styles from './TaskExpendedCard.module.css';
import Box from '@mui/material/Box/Box';
import { FC, useEffect, useState } from 'react';

import userIcon from '@/assets/icons/user.svg';
import timeIcon from '@/assets/icons/clock.svg';
import attachIcon from '@/assets/icons/attach.svg';
import coverIcon from '@/assets/icons/window.svg';
import removeIcon from '@/assets/icons/delete.svg';
import labelIcon from '@/assets/icons/label.svg';
import CloseIcon from '@mui/icons-material/Close';

import { LabelPopoverButton } from '@/widgets/TaskPopovers/LabelPopover/ui/LabelPopoverButton';
import { MembersPopover } from '@/widgets/TaskPopovers/MembersPopover/MembersPopover';
import { FilePopover } from '../TaskPopovers/FilePopover/FilePopover';
import { DatePopover } from '../TaskPopovers/DatePopover/DatePopover';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, removeTask, updateTask } from '@/shared/api/task';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { TaskResponse } from '@/shared/types/task';
import { CoverPopover } from '@/widgets/TaskPopovers/CoverPopover';
import { LabelPopover } from '@/widgets/TaskPopovers/LabelPopover/LabelPopover';
import { TaskCardDeadline } from './ui/TaskCardDeadline';
import { TaskCover } from './ui/TaskCover';
import { TaskAttach } from './ui/TaskAttach';
import { TaskLabels } from './ui/TaskLabels';
import { TaskDescription } from './ui/TaskDescription';
import { TaskComments } from './ui/TaskComments';

type TaskCardType = {
	closeTask: React.Dispatch<React.SetStateAction<boolean>>;
	columnName: string;
	taskId: number;
};

const taskSideBarItems = [
	{ id: 1, img: userIcon, text: 'Участники', item: MembersPopover },
	{ id: 2, img: timeIcon, text: 'Даты', item: DatePopover },
	{ id: 3, img: attachIcon, text: 'Вложение', item: FilePopover },
	{ id: 4, img: coverIcon, text: 'Обложка', item: CoverPopover },
	{ id: 5, img: labelIcon, text: 'Метки', item: LabelPopover },
];

export const TaskExpendedCard: FC<TaskCardType> = ({
	closeTask,
	columnName,
	taskId,
}) => {
	const { id, board_id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [task, setTask] = useState<TaskResponse | null>(null);
	const [taskName, setTaskName] = useState<string>('');

	const { data, isFetching } = useQuery({
		queryFn: getTask,
		queryKey: ['task', { task_id: `${taskId}`, board_id: id as string }],
	});

	const { mutate } = useMutation({
		mutationFn: updateTask,
		mutationKey: ['tasks'],
	});

	const { mutate: removeTaskMutation } = useMutation({
		mutationFn: removeTask,
		mutationKey: ['task'],
		onSuccess: () => {
			closeTask(false);
			navigate(-1);
			queryClient.invalidateQueries({
				queryKey: ['columns', { board_id }],
			});
		},
	});

	const handleUpdateTaskDesc = (desc: string) => {
		mutate({ id: `${taskId}`, description: desc });
	};

	const handleUpdateTaskData = (id: number, data: any) => {
		mutate({ ...data, id: String(id) });
		setTask((prev) => ({ ...prev, ...data }));
	};

	useEffect(() => {
		if (data) {
			if (!isApiError(data)) {
				setTask(data);
				setTaskName(data.name);
			}
		}
	}, [isFetching, data]);

	return (
		<Box className={styles.taskWrapper}>
			<Box className={styles.task}>
				{task?.bg_color && <TaskCover bg_color={task.bg_color} />}
				<Box className={styles.taskHeader}>
					<Box className={styles.taskname}>
						<Box className={styles.taskCover}>
							<Box className={styles.taskCoverIconWrapper}>
								<img src={coverIcon} alt='Cover icon.' />
							</Box>
							<input
								className={styles.input}
								placeholder='Заголовок задания'
								value={taskName}
								onChange={(e) => setTaskName(e.target.value)}
								onBlur={() =>
									handleUpdateTaskData(taskId, {
										name: taskName,
									})
								}
							/>
						</Box>
						<Typography
							sx={{ fontSize: '12px' }}
							component='p'
							fontWeight={400}>
							В колонке:{' '}
							<Typography
								sx={{ fontSize: '12px' }}
								fontWeight={500}
								component='span'>
								{columnName}
							</Typography>
						</Typography>
					</Box>
					<IconButton
						onClick={() => {
							closeTask(false);
							navigate(-1);
						}}
						sx={{
							position: 'absolute',
							right: '5px',
							top: '5px',
							width: '35px',
							height: '35px',
						}}>
						<CloseIcon sx={{ width: '25px', height: '25px' }} />
					</IconButton>
				</Box>
				<Box className={styles.taskContent}>
					<Box className={styles.leftSide}>
						<Box
							sx={{
								margin: '10px 0 10px 40px',
								display: 'flex',
								gap: '10px',
								flexWrap: 'wrap',
							}}>
							<TaskCardDeadline
								deadline={task?.deadline || null}
								completed={!!task?.completed}
								onChange={(completed) => {
									mutate({
										id: String(taskId),
										completed,
									});
								}}
							/>

							<TaskLabels labels={task?.labels || []} />
						</Box>
						<TaskDescription
							desc={task?.description || null}
							updateTaskDesc={handleUpdateTaskDesc}
						/>
						{!!task?.files.length && (
							<TaskAttach files={task?.files} />
						)}
						<TaskComments prevComments={task?.comments || []} />
					</Box>
					<Box className={styles.rightSide}>
						<Typography sx={{ fontSize: '12px' }} fontWeight={500}>
							Добавить на карточку
						</Typography>
						{taskSideBarItems.map((el) => (
							<LabelPopoverButton
								key={el.id}
								img={el.img}
								text={el.text}
								Item={el.item}
							/>
						))}

						<Button
							onClick={() => {
								removeTaskMutation(taskId);
							}}
							sx={{
								background: 'var(--bg-base-btn)',
								color: '#000',
								textTransform: 'none',
								justifyContent: 'flex-start',
								gap: '5px',
								width: '170px',
								fontSize: '14px',
								'&:hover': {
									background: 'var(--bg-base-btn-hover)',
								},
							}}>
							<img
								src={removeIcon}
								alt='remove'
								style={{
									width: '20px',
									height: '20px',
									color: '#ffff',
								}}
							/>
							Удалить
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
