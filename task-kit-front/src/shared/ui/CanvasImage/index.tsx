import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ThemePalette, defaultPalette } from '@/shared/theme/theme-palette';
import { Box } from '@mui/material';

type CanvasImagePropsType = {
	imgSrc: string;
	children: ReactNode;
	getPalette: (palette: ThemePalette) => void;
};

export const CanvasImage: FC<CanvasImagePropsType> = ({
	imgSrc,
	children,
	getPalette,
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
		const darkenColor = lightenDarkenColor(hexColor, -20);
		const lightenColor = lightenDarkenColor(hexColor, -20);

		setColorPalette({
			main: hexColor,
			dark: darkenColor,
			light: lightenColor,
		});
	};

	const readImageData = () => {
		const canvas = canvasRef.current;

		const image = new Image();
		image.src = imgSrc;

		if (canvas) {
			const context = canvas.getContext?.('2d', {
				willReadFrequently: true,
			});

			canvas.height = 10;
			canvas.width = 10;

			if (context) {
				image.onload = () => {
					image.crossOrigin = 'anonymous';
					context.drawImage(image, 0, 0, canvas.width, canvas.height);
					onImageLoaded(context, canvas);
				};
			}
		}
	};

	useEffect(() => {
		readImageData();
	}, [canvasRef]);

	return (
		<Box
			sx={{ width: '100%' }}
			onClick={() => {
				readImageData();
				getPalette(colorPalette);
			}}>
			<canvas
				style={{ visibility: 'hidden', position: 'absolute' }}
				ref={canvasRef}
			/>
			{children}
		</Box>
	);
};
