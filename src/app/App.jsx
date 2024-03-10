import useWindowDimensions from '../hooks/useWindowDimensions';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setIdle } from '../features/app/appSlice';
import Content from './content/Content';
import { FadeLoader } from 'react-spinners';

const App = () => {
	const appData = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { width, height } = useWindowDimensions();

	const imageLoaded = useCallback(() => dispatch(setIdle()), [dispatch]);

	return (
		<div className='flex flex-col text-white'>
			<img
				className={`fixed -z-10 object-cover`}
				src={`https://source.unsplash.com/${width}x${height}/?${appData?.season}`}
				alt={`${appData?.season} background`}
				onLoad={imageLoaded}
			/>
			{appData.status === 'idle' ? (
				<Content
					width={width}
					height={height}
				/>
			) : (
				<div className='flex flex-col justify-center items-center w-screen h-screen absolute'>
					<FadeLoader color='#000000' />
				</div>
			)}
		</div>
	);
};

export default App;
