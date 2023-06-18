import { render, fireEvent, RenderResult } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AudioPlayerProgressBar from './../../../../components/Items/Misc/AudioPlayerProgressBar';
import { AudioPlayerProgressBarProps } from '../../../../types/props';

describe('AudioPlayerProgressBar', () => {
	let props: AudioPlayerProgressBarProps;
	let container: RenderResult;

	beforeEach(() => {
		props = {
			currentTime: 30,
			duration: 120,
			handleAudioPlayerProgressBarClick: vi.fn(),
		};

		container = render(<AudioPlayerProgressBar {...props} />);
	});

	it('renders correctly with initial props', () => {
		const input = container.getByRole('slider')  as HTMLInputElement;
		expect(input).toBeInTheDocument();
		expect(input.value).toBe(String(props.currentTime));
		expect(input.max).toBe(String(props.duration));
	});

	it('calls handleAudioPlayerProgressBarClick when slider is moved', () => {
		const input = container.getByRole('slider');
		fireEvent.change(input, { target: { value: 60 } });
		expect(props.handleAudioPlayerProgressBarClick).toHaveBeenCalledTimes(1);
	});
});
