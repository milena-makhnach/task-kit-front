import { useMemo } from 'react';
import { themePalette } from '../theme';

export const usePaletteColors = (): string[] => {
	const { defaultPalette, ...rest } = themePalette;
	const palletteColors = useMemo(() => {
		return Object.entries(rest).map(([_, value]) => value.main);
	}, []);

	return palletteColors;
};
