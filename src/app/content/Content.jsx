import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LinkButton from '../../components/LinkButton';
import { aboutMeLinks } from '../../constants/aboutMeLinks';
import { navigationLinks } from '../../constants/navigationLinks';
import NavigationButton from '../../components/NavigationButton';

const Content = ({ width, height }) => {
	const homeFloat = useRef(null);
	const navigationFloat = useRef(null);
	const navigationBar = useRef(null);
	const aboutRef = useRef(null);
	const skillsRef = useRef(null);

	const handleClick = (ref) => {
		const yOffset = -120;
		const element = ref.current;
		const y =
			element?.getBoundingClientRect().top + window.scrollY + yOffset;
		window.scrollTo({ top: y, behavior: 'smooth' });
	};

	const reveal = useCallback(() => {
		var reveals = document.querySelectorAll('.reveal');
		for (var i = 0; i < reveals.length; i++) {
			var windowHeight = window.innerHeight;
			var elementTop = reveals[i].getBoundingClientRect().top;
			var elementVisible = 512;
			if (elementTop < windowHeight - elementVisible) {
				navigationBar.current?.classList.add('active');
				reveals[i].classList.add('active');
			} else {
				navigationBar.current?.classList.remove('active');
				reveals[i].classList.remove('active');
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', reveal);

		return () => window.removeEventListener('scroll', reveal);
	}, [reveal]);

	return (
		<div className='flex flex-col'>
			{/* Card Home */}
			<motion.div
				ref={homeFloat}
				initial={{ opacity: 0, y: -40 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: { duration: 0.3 }
				}}
				className='flex flex-col items-center mt-48 mx-2 md:mx-48 lg:mx-96 lg:mt-80 rounded-2xl backdrop-blur-xl bg-gray-900/[0.8] border border-solid border-gray-900/[0.6] shadow-xl'>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { delay: 0.3, duration: 0.3 }
					}}>
					<img
						className='w-40 h-40 object-cover rounded-full shadow-xl -mt-20 border border-solid border-gray-900/[0.4]'
						src='./IMG_7355.png'
						alt='Profile pic'
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { delay: 0.6, duration: 0.3 }
					}}>
					<div className='flex flex-row p-8 pb-12'>
						<div className='flex flex-col gap-4'>
							<span className='text-xl'>Hi! I'm</span>
							<span className='text-4xl font-black'>
								Paras Khanchandani
							</span>
							<span>
								Android Developer | iOS Developer | macOS
								Developer | Web Developer | UX/UI Designer
							</span>
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										delay: 0.9,
										duration: 0.3
									}
								}}>
								<div className='flex flex-row flex-wrap items-center justify-center'>
									{aboutMeLinks().map((item, index) => (
										<LinkButton
											key={index}
											url={item.url}
											icon={item.icon}
											title={item.title}
											mail={item.mail}
										/>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</motion.div>
			{/* Card Navigation */}
			<motion.div
				ref={navigationFloat}
				className='flex flex-row justify-center items-center mt-4 md:mt-32 gap-3'
				initial={{ opacity: 0, y: 10 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: { delay: 1.2, duration: 0.3 }
				}}>
				{navigationLinks().map((item, index) => {
					let ref;

					switch (item.key.toLowerCase()) {
						case 'skills':
							ref = skillsRef;
							break;
						default:
							ref = aboutRef;
							break;
					}

					return (
						<NavigationButton
							key={item.key}
							title={item.title}
							icon={item.icon}
							handleClick={() => handleClick(ref)}
							width={width}
							navigationBar={false}
						/>
					);
				})}
			</motion.div>
			{/* Navigation Bar */}
			<div
				ref={navigationBar}
				className='navbar flex flex-row space-between rounded-full border backdrop-blur-xl bg-gray-900/[0.8] border-solid border-gray-900/[0.6] shadow-xl p-2 mt-2'>
				{navigationLinks().map((item, index) => {
					let ref;

					switch (item.key.toLowerCase()) {
						case 'skills':
							ref = skillsRef;
							break;
						default:
							ref = aboutRef;
							break;
					}

					return (
						<NavigationButton
							key={item.key}
							title={item.title}
							icon={item.icon}
							handleClick={() => handleClick(ref)}
							width={width}
							navigationBar={true}
						/>
					);
				})}
			</div>
			{/* Other Floating Cards */}
			<div className='reveal flex flex-col md:flex-row flex-wrap mx-2 md:mx-48 mt-32 mb-24'>
				<div
					ref={aboutRef}
					className='mt-8 flex flex-col rounded-2xl backdrop-blur-xl bg-gray-900/[0.8] border border-solid border-gray-900/[0.6] shadow-xl p-12 gap-2'>
					<span className='text-4xl font-black mb-8'>About Me</span>
					<p className='text-lg'>
						I'm <b className='text-xl'>Paras Khanchandani</b> and
						I'm from Tenerife, Canary Islands, Spain. Currently, I'm
						located in{' '}
						<b className='text-xl'>
							Castelldefels, Barcelona, Spain.
						</b>{' '}
						I'm working as a{' '}
						<b className='text-xl'>Software Engineer</b> in{' '}
						<b className='text-xl'>
							<a
								className='text-teal-300'
								href='https://www.unimedia.tech/'
                target="_blank" rel="noopener noreferrer">
								Unimedia Technology
							</a>
						</b>
						.
					</p>
					<p className='mt-4 text-lg'>
						{' '}
						Working in multiple projects with them, I have gained{' '}
						<b className='text-xl'>Experience</b> in{' '}
						<b className='text-xl'>Technologies</b> like:{' '}
					</p>
					<ul className='text-lg list-disc pt-5 px-5'>
						<li>Amazon Web Services</li>
						<li>Microsoft Azure DevOps</li>
						<li>Atlassian Jira</li>
						<li>.NET Core</li>
						<li>AngularJS</li>
						<li>ReactJS</li>
						<li>Docker</li>
						<li>MySQL</li>
					</ul>
					<p className='mt-4 text-lg'>
						From doing <b className='text-xl'>personal projects</b>,
						to <b className='text-xl'>freelancing</b>, I've done a
						lot of development for{' '}
						<b className='text-xl'>macOS, iOS and Web</b>, all
						through which can be seen in my{' '}
						<b className='text-xl'>
							<a
								className='text-teal-300'
								href='https://github.com/paraskcd1315'
                target="_blank" rel="noopener noreferrer">
								Github
							</a>
						</b>
					</p>
					<p className='mt-4 text-lg'>
						Other than developing software/websites I also have
						experience for <b className='text-xl'>designing UI</b>,
						making <b className='text-xl'>Photo Manipulations</b>{' '}
						with <b className='text-xl'>Adobe Photoshop</b>, making
						different{' '}
						<b className='text-xl'>3D Models and Texturing them</b>{' '}
						with{' '}
						<b className='text-xl'>
							Autodesk Maya and Substance Painter
						</b>
						respectively and also worked in creating{' '}
						<b className='text-xl'>Motion Graphics</b> with Tools
						like <b className='text-xl'>Adobe Premiere</b> and{' '}
						<b className='text-xl'>Adobe After Effects</b>.
					</p>
					<p className='mt-4 text-lg'>
						I also love <b className='text-xl'>Travelling</b>,
						exploring the world. Also have a keen interest in{' '}
						<b className='text-xl'>Astrophysics</b>, to learn about
						Planets, Stars, Galaxies, Black Holes, etc.
					</p>
				</div>
				<div
					ref={skillsRef}
					className='mt-8 flex flex-col rounded-2xl backdrop-blur-xl bg-gray-900/[0.8] border border-solid border-gray-900/[0.6] shadow-xl p-12 gap-2'>
					<span className='text-4xl font-black mb-8'>Skills</span>
					<div className='flex flex-row flex-wrap items-center'>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./dotnetcore.png'
								alt='dot net core'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>.Net Core</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./azure.png'
								alt='azure'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Microsoft Azure DevOps</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./aws.png'
								alt='amazon web services'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Amazon Web Services</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./swift.png'
								alt='swift'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Swift</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./kotlin.png'
								alt='kotlin'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Kotlin</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./swiftui.png'
								alt='swiftui'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>SwiftUI</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./jetpackcompose.webp'
								alt='jetpack compose'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Jetpack Compose</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./javascript.webp'
								alt='javascript'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Javascript</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./angular.png'
								alt='angularjs'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>AngularJS</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./react.webp'
								alt='reactjs'
								className='mr-2 p-1 rounded-full object-cover bg-white'
								width={40}
								height={40}
							/>
							<span>ReactJS</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./redux.png'
								alt='redux'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Redux</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./electron.png'
								alt='electronjs'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>ElectronJS</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./express.png'
								alt='expressjs'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>ExpressJS</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./mongodb.png'
								alt='mongodb'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>MongoDB</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./photoshop.png'
								alt='photoshop'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Adobe Photoshop</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./aftereffects.png'
								alt='aftereffects'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Adobe After Effects</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./figma.png'
								alt='figma'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Figma</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./finalcutpro.png'
								alt='final cut pro'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Final Cut Pro</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./maya.png'
								alt='maya'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Autodesk Maya</span>
						</div>
						<div className='flex flex-row items-center text-md items-center bg-gray-900/[0.8] rounded-full ml-2 mt-2 pr-4'>
							<img
								src='./painter.png'
								alt='substance painter'
								width={40}
								height={40}
								className='mr-2 p-1 rounded-full object-cover bg-white'
							/>
							<span>Adobe Painter 3D</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Content;
