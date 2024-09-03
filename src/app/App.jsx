import useWindowDimensions from '../hooks/useWindowDimensions';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { setIdle } from '../features/app/appSlice';
import Content from './content/Content';
import { FadeLoader } from 'react-spinners';

const App = () => {
  const bg = useRef(null);
	const appData = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const { width, height } = useWindowDimensions();

	const imageLoaded = useCallback(() => dispatch(setIdle()), [dispatch]);

  const reveal = useCallback(() => {
		var reveals = document.querySelectorAll('.reveal');
		for (var i = 0; i < reveals.length; i++) {
			var windowHeight = window.innerHeight;
			var elementTop = reveals[i].getBoundingClientRect().top;
			var elementVisible = 512;
			if (elementTop < windowHeight - elementVisible) {
				bg.current?.classList.add('active');
			} else {
				bg.current?.classList.remove('active');
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', reveal);

		return () => window.removeEventListener('scroll', reveal);
	}, [reveal]);

	return (
		<div className='flex flex-col text-white h-dvh'>
			<img
				className={`fixed -z-10 object-cover w-[${width}px] h-[${height}px]`}
				src={`https://picsum.photos/${width}/${height + 60}/?${appData?.season}`}
				alt={`${appData?.season}`}
				onLoad={imageLoaded}
			/>
      <div ref={bg} className="bg fixed z-11 h-dvh w-dvw bg-gray-900/[0.5] backdrop-blur-md"></div>
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
