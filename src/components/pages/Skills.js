import React, { Fragment, useState, useEffect } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

const Skills = () => {
	const [show, setShow] = useState(false);
	const [skills, setSkillLevel] = useState([
		{ name: 'Photoshop', level: 0 },
		{ name: 'Illustrator', level: 0 },
		{ name: 'Autodesk Maya', level: 0 },
		{ name: 'HTML', level: 0 },
		{ name: 'CSS', level: 0 },
		{ name: 'Javascript', level: 0 },
		{ name: 'JQuery', level: 0 },
		{ name: 'ReactJS', level: 0 },
		{ name: 'Express.JS', level: 0 },
		{ name: 'Node.JS', level: 0 },
		{ name: 'Electron', level: 0 },
		{ name: 'PHP', level: 0 }
	]);

	const allSkills = skills.map((skill) => {
		return (
			<div key={skill.name} className='skill-type'>
				<span className='skill-name lead'>{skill.name}</span>
				<ProgressBar
					completed={skill.level}
					bgColor={'#fff4'}
					baseBgColor={'#fff2'}
					labelAlignment={'left'}
					className={'skill-progress'}
					transitionTimingFunction={'ease-in-out'}
					transitionDuration={'1s'}
				/>
			</div>
		);
	});

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
			const updatedSkills = [
				{ name: 'Photoshop', level: 100 },
				{ name: 'Illustrator', level: 90 },
				{ name: 'Autodesk Maya', level: 85 },
				{ name: 'HTML', level: 100 },
				{ name: 'CSS', level: 100 },
				{ name: 'Javascript', level: 80 },
				{ name: 'JQuery', level: 65 },
				{ name: 'ReactJS', level: 70 },
				{ name: 'Express.JS', level: 65 },
				{ name: 'Node.JS', level: 60 },
				{ name: 'Electron', level: 65 },
				{ name: 'PHP', level: 60 }
			];
			setTimeout(() => {
				setSkillLevel(updatedSkills);
			}, 500);
		}, 250);
	}, []);

	return (
		<Fragment>
			<div className={show ? `profile animate show` : `profile animate hide`}>
				<div className='skills'>
					<h1 className='x-large'>Skills</h1>
					{allSkills}
				</div>
			</div>
		</Fragment>
	);
};

export default Skills;
