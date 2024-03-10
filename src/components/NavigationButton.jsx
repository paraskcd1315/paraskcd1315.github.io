import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NavigationButton = ({
	title,
	icon,
	handleClick,
	width,
	navigationBar
}) => {
	const [hide, setHide] = useState(false);

	useEffect(() => {
		if (width <= 558) {
			setHide(true);
		}

		return () => setHide(false);
	}, [width]);

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className={`flex flex-row py-2 px-4 text-md justify-center items-center rounded-full ${
				navigationBar
					? ''
					: 'backdrop-blur-xl bg-gray-900/[0.8] border border-solid border-gray-900/[0.6] shadow-xl mt-2'
			} `}
			onClick={handleClick}>
			<i className={`${icon} mr-2`}></i>
			<span className={`${hide ? 'text-sm' : ''}`}>{title}</span>
		</motion.button>
	);
};

export default NavigationButton;
