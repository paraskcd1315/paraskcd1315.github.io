import React, { Fragment, useEffect, useState } from 'react';

const AboutMe = () => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 250);
	}, []);
	return (
		<Fragment>
			<div className={show ? `profile animate show` : `profile animate hide`}>
				<div className='about-me'>
					<h1 className='x-large'>About me</h1>
					<p className='lead'>
						I'm a creative Web Developer, UI/UX Designer and an Artist designing
						stuff for fun.
					</p>
					<br />
					<p>I Love making UI for softwares and websites. </p>
					<br />
					<p>
						I have a keen interest in making the best possible, beautiful,
						functional and intuitive UI to make people fall in Love!
					</p>
					<div className='buttons'>
						<a href='./CV.pdf'>
							<div className='btn btn-light-opacity opacity-3'>Resume</div>
						</a>
					</div>
					<div className='social-media'>
						<a href='https://www.facebook.com/ParasKCD.Designs/'>
							<i class='fab fa-facebook mx-1'></i>
						</a>
						<a href='https://www.instagram.com/kcd.designs/'>
							<i class='fab fa-instagram mx-1'></i>
						</a>
						<a href='https://in.linkedin.com/in/parakcd'>
							<i class='fab fa-linkedin mx-1'></i>
						</a>
						<a href='https://twitter.com/paraskcd'>
							<i class='fab fa-twitter mx-1'></i>
						</a>
						<a href='https://www.artstation.com/paraskcd'>
							<i class='fab fa-artstation mx-1'></i>
						</a>
						<a href='https://www.youtube.com/user/badmanthegreat/videos'>
							<i class='fab fa-youtube mx-1'></i>
						</a>
						<a href='https://github.com/paraskcd1315'>
							<i class='fab fa-github mx-1'></i>
						</a>
						<a href='https://parcility.co/author/Paras%20KCD'>
							<i class='fas fa-archive mx-1'></i>
						</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AboutMe;
