import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';

type RefType<T extends Node | null> = MutableRefObject<T>;
type retyrnType = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const useOutsideClick = <T extends Node | null>(
	ref: RefType<T>,
	defaultState = false
): retyrnType => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultState || false);

	const handleClickOutside = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);

	return { isOpen, setIsOpen };
};
