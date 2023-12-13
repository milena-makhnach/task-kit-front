import { themePalette } from '../theme';

export const findThemeToUse = (palette: any, targetColor: string) => {
	for (const key in palette) {
		if (palette[key].main === targetColor) {
			return palette[key];
		}
	}
	return themePalette.grayPalette;
};
