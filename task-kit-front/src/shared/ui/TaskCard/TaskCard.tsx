import { Chip } from '../Chip/Chip';
import styles from './TaskCard.module.css';
import Box from '@mui/material/Box/Box';
import { FC, useEffect, useState } from 'react';

import userIcon from '../../../assets/icons/user.svg';
import timeIcon from '../../../assets/icons/clock.svg';
import attachIcon from '../../../assets/icons/attach.svg';
import coverIcon from '../../../assets/icons/window.svg';
import removeIcon from '../../../assets/icons/delete.svg';
import CloseIcon from '@mui/icons-material/Close';

// import ReactQuill from 'react-quill';
import { LabelPopoverButton } from '../LabelPopover/ui/LabelPopoverButton';
import { LabelPopover } from '../LabelPopover/LabelPopover';
import { MembersPopover } from '../MembersPopover/MembersPopover';
import { FilePopover } from '../FilePopover/FilePopover';
import { DatePopover } from '../DatePopover/DatePopover';
import { api } from '@/shared/api/base-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import { UploadedFile } from '@/widgets/UploadedFile';
import { getTask, removeTask, updateTask } from '@/shared/api/task';
import { isApiError } from '@/shared/type-guards/query-error-guard';
import { createComment } from '@/shared/api/comment';
import { TaskResponse } from '@/shared/types/task';

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
	// { id: 4, img: coverIcon, text: 'Обложка', item: <LabelPopover /> },
	// { id: 5, img: removeIcon, text: 'Удалить', item: <LabelPopover /> },
];

export const TaskCard: FC<TaskCardType> = ({
	closeTask,
	columnName,
	taskId,
}) => {
	const { id, board_id } = useParams();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const user = useSelector((state: RootState) => state.user);

	const [task, setTask] = useState<TaskResponse | null>(null);
	const [value, setValue] = useState('');
	const [isTextEditorOpen, setIsTextEdittorOpen] = useState<boolean>(false);
	const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
	const [comment, setComment] = useState<string>('');
	const [comments, setComments] = useState<any>([]);

	const { data, isSuccess } = useQuery({
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

	const { mutate: createCommentMutation } = useMutation({
		mutationFn: createComment,
		mutationKey: ['tasks'],
		onSuccess: (res) => {
			setComments((prev: any) => [...prev, res]);
		},
	});

	const handleUpdateTaskDesc = () => {
		mutate({ id: `${taskId}`, description: value });
		setIsTextEdittorOpen(false);
	};

	const handleCreateComment = () => {
		if (comment) {
			createCommentMutation({
				task_id: taskId,
				user_id: user.id as number,
				text: comment,
			});

			setIsCommentOpen(false);
		}
	};

	useEffect(() => {
		if (isSuccess && data) {
			if (!isApiError(data)) {
				setValue(data.description || '');
				setComments(data.comments);
				setTask(data);
			}
		}
	}, [isSuccess, data]);

	return (
		<Box className={styles.taskWrapper}>
			<Box className={styles.task}>
				<IconButton
					onClick={() => {
						closeTask(false);
						navigate(-1);
					}}
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
							<Typography
								className={styles.title}
								fontWeight={600}>
								{task?.name}
							</Typography>
							<p>
								В колонке:{' '}
								<Typography component='span' fontWeight={600}>
									{columnName}
								</Typography>
							</p>
						</Box>
					</Box>
					<Box>
						{task?.deadline && (
							<Box
								sx={{
									padding: '10px',
									borderRadius: '4px',
									fontWeight: 500,
									width: 'max-content',
									background: '#e6e6e8',
								}}>
								{new Date(task.deadline).getDate()}
							</Box>
						)}
					</Box>
					<Box className={styles.descript}>
						<Typography
							fontWeight={500}
							mb={1}
							className={styles.title}>
							Описание
						</Typography>

						{isTextEditorOpen ? (
							<>
								{/* <ReactQuill
									className={styles.textEditor}
									theme='snow'
									value={value}
									onChange={setValue}
								/> */}
								<Box className={styles.btnWrapper}>
									<Button onClick={handleUpdateTaskDesc}>
										Сохранить
									</Button>
									<Button
										onClick={() => {
											setIsTextEdittorOpen(false);
											setValue(task?.description || '');
										}}>
										Отмена
									</Button>
								</Box>
							</>
						) : (
							<button
								onClick={() => setIsTextEdittorOpen(true)}
								className={`${styles.openEditorBtn} ${
									!isTextEditorOpen && value
										? styles.filledWithText
										: ''
								}`}>
								{value ? (
									<span
										dangerouslySetInnerHTML={{
											__html: value,
										}}
									/>
								) : (
									'Добавить более подробное описание...'
								)}
							</button>
						)}
					</Box>
					{task?.files && (
						<Box className={styles.files}>
							{task.files.map((file: any) => (
								<UploadedFile
									key={file.id}
									id={file.id}
									fileName={file.name}
									filePath={file.file}
								/>
							))}
						</Box>
					)}
					<Box className={styles.comment}>
						<Typography
							className={styles.title}
							fontWeight={500}
							mb={1}>
							Действия
						</Typography>
						<div className={styles.commentWrapper}>
							<UserAvatar
								firstname={user.firstname}
								lastname={user.lastname}
								avatar={user.avatar || ''}
							/>
							{isCommentOpen ? (
								<Box>
									{/* <ReactQuill
										className={styles.textEditor}
										theme='snow'
										value={comment}
										onChange={setComment}
									/> */}
									<Box className={styles.btnWrapper}>
										<Button onClick={handleCreateComment}>
											Сохранить
										</Button>
										<Button
											onClick={() => {
												setIsCommentOpen(false);
												setValue('');
											}}>
											Отмена
										</Button>
									</Box>
								</Box>
							) : (
								<textarea
									placeholder='Напишите коментарий...'
									onClick={() => setIsCommentOpen(true)}
								/>
							)}
						</div>
						<Box
							mt={2}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
							}}>
							{comments.map((comment: any) => (
								<Box sx={{ display: 'flex', gap: '12px' }}>
									<UserAvatar
										firstname={comment.user.first_name}
										lastname={comment.user.last_name}
										avatar={comment.user.avatar || ''}
									/>
									<Box
										sx={{
											width: '100%',
											padding: '10px',
											paddingRight: '20px',
											background: 'white',
										}}>
										<div
											dangerouslySetInnerHTML={{
												__html: comment.text,
											}}
										/>
									</Box>
								</Box>
							))}
						</Box>
					</Box>
				</Box>
				<Box className={styles.rightSide}>
					<Typography fontWeight={500}>
						Добавить на карточку
					</Typography>
					{taskSideBarItems.map((el) => (
						<LabelPopoverButton
							key={el.id}
							img={el.img}
							text={el.text}
							item={el.item}
						/>
					))}
					<Button
						onClick={() => {
							removeTaskMutation(taskId);
						}}
						variant='contained'
						sx={{
							width: '100%',
							display: 'flex',
							gap: '10px',
							justifyContent: 'flex-start',
							color: '#ffff',
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
	);
};
