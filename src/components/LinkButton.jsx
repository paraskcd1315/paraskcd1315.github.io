import { motion } from 'framer-motion';

const LinkButton = ({ url, icon, title, mail }) => (
	<motion.button
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		className='flex flex-row py-2 px-4 text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2'
		onClick={() => window.open(url, mail ? '_self' : '_blank').focus()}>
		<i className={`${icon} mr-2`}></i>
		<span>{title}</span>
	</motion.button>
);

export default LinkButton;
