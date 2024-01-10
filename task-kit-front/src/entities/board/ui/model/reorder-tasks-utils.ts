import { ColumnResponse } from '@/shared/types/column';

type ReorderQuoteMapPropsType<T> = {
	quoteMap: Array<T>;
	source: any;
	destination: any;
};

export const reorder = <T>(
	list: Array<T>,
	startIndex: number,
	endIndex: number
): Array<T> => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export const reorderQuoteMap = ({
	quoteMap,
	source,
	destination,
}: ReorderQuoteMapPropsType<ColumnResponse>) => {
	const toChangeIndex = quoteMap.findIndex(
		(item) => item.id === +source.droppableId
	);

	const changedIndex = quoteMap.findIndex(
		(item) => item.id === +destination.droppableId
	);

	const current = [...quoteMap[toChangeIndex].tasks];
	const next = [...quoteMap[changedIndex].tasks];
	const target = current[source.index];

	if (source.droppableId === destination.droppableId) {
		const reordered = reorder(current, source.index, destination.index);

		const newOrdered = [...quoteMap];

		newOrdered[toChangeIndex].tasks = reordered;

		return {
			quoteMap: newOrdered,
		};
	}
	
	current.splice(source.index, 1);
	next.splice(destination.index, 0, target);

	const newOrdered = [...quoteMap];

	newOrdered[toChangeIndex].tasks = current;
	newOrdered[changedIndex].tasks = next;

	return {
		quoteMap: newOrdered,
	};
};
