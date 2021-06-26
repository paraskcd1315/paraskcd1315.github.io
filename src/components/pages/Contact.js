import React, { Fragment, useState, useEffect } from 'react';

const Contact = () => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 250);
	}, []);
	return (
		<Fragment>
			<div className={show ? `profile animate show` : `profile animate hide`}>
				<div className='contact'>
					<h1 className='x-large'>Get in touch</h1>
					<p className='contact lead'>
						<a href='mailto:paraskhanchandani1315@gmail.com'>
							<i class='fas fa-envelope mx-1'></i> <span>Email</span>
						</a>
					</p>
					<p className='contact lead'>
						<a href='https://twitter.com/paraskcd'>
							<i class='fab fa-twitter mx-1'></i> <span>Twitter</span>
						</a>
					</p>
					<p className='contact lead'>
						<a href='https://in.linkedin.com/in/parakcd'>
							<i class='fab fa-linkedin mx-1'></i> <span>Linkedin</span>
						</a>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

export default Contact;
