import React, { Fragment, useState, useEffect } from 'react';
import avatar from '../../resources/images/profile.jpg';
import DelayLink from 'react-delay-link';

const Home = ({ windowWidth }) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 250);
	}, []);
	return (
		<Fragment>
			<div className={show ? `profile animate show` : `profile animate hide`}>
				<div className='home'>
					<div className='profile-pic'>
						<img className='avatar' src={avatar} alt='avatar' />
					</div>
					<div className='profile-info'>
						{windowWidth < 1024 ? (
							''
						) : (
							<>
								<span>Hey, I'm</span>
								<br />
							</>
						)}
						<br />
						<span className='large name'>Paras Khanchandani</span>
						<br />
						<span
							className={windowWidth < 1024 ? 'lead role py-1' : 'lead role'}>
							Web Developer | UI/UX Designer
						</span>
						<br />
						<div className='buttons'>
							<DelayLink
								to='/aboutme'
								delay={500}
								clickAction={() => setShow(!show)}>
								<div className='btn btn-light-opacity opacity-3'>
									More about me
								</div>
							</DelayLink>
							<a href='./CV.pdf'>
								<div className='btn btn-light-opacity opacity-3'>Resume</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
