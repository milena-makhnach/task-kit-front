import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalPropsType = {
	children: ReactNode;
};

export const Portal: FC<PortalPropsType> = ({ children }) => {
	return createPortal(children, document.body);
};
