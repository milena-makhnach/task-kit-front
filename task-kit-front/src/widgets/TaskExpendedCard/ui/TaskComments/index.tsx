import { Box, Button, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import styles from '../../TaskExpendedCard.module.css';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';
import ReactQuill from 'react-quill';
import { CommentResponseType } from '@/shared/types/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { createComment } from '@/shared/api/comment';

import actionIcon from '@/assets/icons/comments.svg';
import dayjs from 'dayjs';

type TaskCommentsPropsType = {
	prevComments: CommentResponseType[];
};

export const TaskComments: FC<TaskCommentsPropsType> = ({ prevComments }) => {
	const { task_id } = useParams();
	const queryClient = useQueryClient();
	const user = useSelector((state: RootState) => state.user);

	const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
	const [comment, setComment] = useState<string>('');
	const [comments, setComments] = useState<CommentResponseType[]>([]);

	const { mutate: createNewComment } = useMutation({
		mutationFn: createComment,
		mutationKey: ['comment'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['task'] });
		},
	});

	const handleCreateComment = () => {
		if (comment && task_id) {
			createNewComment({
				task_id: +task_id,
				user_id: user.id as number,
				text: comment,
			});

			setIsCommentOpen(false);
		}
	};

	useEffect(() => {
		setComments(prevComments);
	}, [prevComments]);

	return (
		<Box className={styles.comment}>
			<Box>
				<Box className={styles.taskDescIconWrapper}>
					<img src={actionIcon} alt='Actions icon.' />
				</Box>
				<Typography
					className={styles.title}
					sx={{ fontSize: '14px' }}
					fontWeight={500}
					mb={1}>
					Действия
				</Typography>
			</Box>
			<div className={styles.commentWrapper}>
				<UserAvatar
					firstname={user.firstname}
					lastname={user.lastname}
					avatar={user.avatar || ''}
				/>
				{isCommentOpen ? (
					<Box className={styles.commentEditorWrapper}>
						<ReactQuill
							className={styles.textEditor}
							theme='snow'
							value={comment}
							onChange={setComment}
						/>
						<Box className={styles.btnWrapper}>
							<Button
								sx={{ textTransform: 'none', fontSize: '14px' }}
								onClick={handleCreateComment}>
								Сохранить
							</Button>
							<Button
								sx={{
									textTransform: 'none',
									fontSize: '14px',
									backgroundColor: 'transparent',
									color: '#000',
									'&:hover': {
										backgroundColor: 'var(--bg-base-btn)',
									},
								}}
								onClick={() => {
									setIsCommentOpen(false);
								}}>
								Отмена
							</Button>
						</Box>
					</Box>
				) : (
					<textarea
						className={styles.openCommentEditorBtn}
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
					gap: '20px',
				}}>
				{comments.map((comment) => (
					<Box sx={{ display: 'flex', gap: '12px' }}>
						<UserAvatar
							firstname={comment.user.first_name}
							lastname={comment.user.last_name}
							avatar={comment.user.avatar || ''}
						/>
						<Box sx={{ width: '100%' }}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
									marginBottom: '3px',
								}}>
								<Typography
									sx={{ fontSize: '14px' }}
									fontWeight={600}>
									{user.firstname} {user.lastname}
								</Typography>
								<Typography sx={{ fontSize: '10px' }}>
									{dayjs(comment.created_at)
										.locale('ru')
										.format('D MMM YYYY [г.] в HH:mm')}
								</Typography>
							</Box>
							<Box
								sx={{
									width: '100%',
									padding: '10px',
									paddingRight: '20px',
									background: 'white',
									borderRadius: '3px',
									fontSize: '14px',
									fontWeight: 500,
								}}>
								<div
									dangerouslySetInnerHTML={{
										__html: comment.text,
									}}
								/>
							</Box>
							<Box className={styles.commentActions}>
								<ul>
									<li>
										<Typography
											component='span'
											sx={{ fontSize: '12px' }}>
											Изменить
										</Typography>
									</li>
									<li>
										<Typography
											component='span'
											sx={{ fontSize: '12px' }}>
											Удалить
										</Typography>
									</li>
								</ul>
							</Box>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
};
