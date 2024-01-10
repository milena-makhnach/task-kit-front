import { MutableRefObject, useEffect, useState } from 'react';

import { ThemePalette } from '../theme/theme-palette';
import { defaultPalette } from '@/shared/theme/theme-palette';

type ReturnHookType = {
	palette: ThemePalette;
	getPalette: () => void;
};

export const useCanvas = (
	imgRef: MutableRefObject<HTMLImageElement | null>
): ReturnHookType => {
	const [colorPalette, setColorPalette] =
		useState<ThemePalette>(defaultPalette);

	const getAverageRGB = (
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement
	) => {
		let blockSize = 5,
			defaultRGB = { r: 0, g: 0, b: 0 },
			rgb = { r: 0, g: 0, b: 0 },
			count = 0,
			i = -4,
			data,
			width,
			height,
			length;

		if (!context) {
			return defaultRGB;
		}

		height = canvas.height;
		width = canvas.width;

		try {
			data = context.getImageData(0, 0, width, height);
		} catch (e) {
			return defaultRGB;
		}

		length = data.data.length;

		while ((i += blockSize * 4) < length) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i + 1];
			rgb.b += data.data[i + 2];
		}

		rgb.r = ~~(rgb.r / count);
		rgb.g = ~~(rgb.g / count);
		rgb.b = ~~(rgb.b / count);

		return rgb;
	};

	const componentToHex = (number: number) => {
		const hex = number.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	const rgbToHex = (r: number, g: number, b: number) => {
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};

	const lightenDarkenColor = (colorCode: string, amount: number) => {
		let usePound = false;

		if (colorCode[0] === '#') {
			colorCode = colorCode.slice(1);
			usePound = true;
		}

		const num = parseInt(colorCode, 16);

		let r = (num >> 16) + amount;

		if (r > 255) {
			r = 255;
		} else if (r < 0) {
			r = 0;
		}

		let g = (num & 0x0000ff) + amount;

		if (g > 255) {
			g = 255;
		} else if (g < 0) {
			g = 0;
		}

		let b = ((num >> 8) & 0x00ff) + amount;

		if (b > 255) {
			b = 255;
		} else if (b < 0) {
			b = 0;
		}

		return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
	};

	const onImageLoaded = (
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement
	) => {
		const rgbColor = getAverageRGB(context, canvas);
		const hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);
		const darkenColor = lightenDarkenColor(hexColor, 20);
		const lightenColor = lightenDarkenColor(hexColor, -20);

		console.log(hexColor);
		console.log('use canvas', colorPalette);

		setColorPalette({
			main: hexColor,
			dark: darkenColor,
			light: lightenColor,
		});
	};

	const getPalette = () => {
		const img = imgRef.current;

		if (imgRef.current) {
			if (!img) {
				return;
			}
			const { width, height } = img;
			const canvas = document.createElement('canvas');
			canvas.height = height;
			canvas.width = width;
			const context = canvas.getContext?.('2d');
			if (context === null) {
				return;
			}

			img.crossOrigin = 'anonymous';

			if (img.complete) {
				context.drawImage(img, 0, 0, canvas.width, canvas.height);
				onImageLoaded(context, canvas);
			} else {
				const imgLoad = () => {
					img.removeEventListener('load', imgLoad);
					context.drawImage(img, 0, 0, canvas.width, canvas.height);
					onImageLoaded(context, canvas);
				};
				img.addEventListener('load', imgLoad);
			}
		}
	};

	useEffect(() => {
		getPalette();
	}, [imgRef]);

	return { palette: colorPalette, getPalette };
};
