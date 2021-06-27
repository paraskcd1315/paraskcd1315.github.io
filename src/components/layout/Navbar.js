import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DelayLink from 'react-delay-link';

const Navbar = ({ windowWidth }) => {
	const [menuOpened, setMenu] = useState(false);

	const location = useLocation();

	const openMenu = (e) => {
		e.preventDefault();
		setMenu(!menuOpened);
	};

	const onDelayStart = () => {
		document.getElementsByClassName('animate')[0].classList.remove('show');
		document.getElementsByClassName('animate')[0].classList.add('hide');
		setMenu(!menuOpened);
	};

	return (
		<nav className={windowWidth < 1024 ? 'navbar mobile' : 'navbar'}>
			{windowWidth < 1024 ? (
				<button
					onClick={(e) => openMenu(e)}
					className={
						menuOpened
							? `btn no-hover btn-light-opacity opacity-3 hamburgerMenu change`
							: `btn no-hover btn-light-opacity opacity-3 hamburgerMenu`
					}>
					<div className='bar1'></div>
					<div className='bar2'></div>
					<div className='bar3'></div>
				</button>
			) : (
				''
			)}
			<div
				className={
					windowWidth < 1024
						? menuOpened
							? 'navbar-items blur show'
							: 'navbar-items blur'
						: 'navbar-items'
				}>
				<DelayLink
					to='/'
					delay={500}
					clickAction={() => {
						if (location.pathname !== '/') {
							onDelayStart();
						}
					}}>
					<div
						className={
							location.pathname === '/'
								? 'navbar-item active first-item'
								: 'navbar-item first-item'
						}>
						<i className='fa fa-home' aria-hidden='true'></i>Home
					</div>
				</DelayLink>
				<DelayLink
					to='/aboutme'
					delay={500}
					clickAction={() => {
						if (location.pathname !== '/aboutme') {
							onDelayStart();
						}
					}}>
					<div
						className={
							location.pathname === '/aboutme'
								? 'navbar-item active'
								: 'navbar-item'
						}>
						<i class='fa fa-info-circle' aria-hidden='true'></i>About Me
					</div>
				</DelayLink>
				<DelayLink
					to='/skills'
					delay={500}
					clickAction={() => {
						if (location.pathname !== '/skills') {
							onDelayStart();
						}
					}}>
					<div
						className={
							location.pathname === '/skills'
								? 'navbar-item active'
								: 'navbar-item'
						}>
						<i class='fas fa-graduation-cap'></i>Skills
					</div>
				</DelayLink>
				<DelayLink
					to='/contact'
					delay={500}
					clickAction={() => {
						if (location.pathname !== '/contact') {
							onDelayStart();
						}
					}}>
					<div
						className={
							location.pathname === '/contact'
								? 'navbar-item active'
								: 'navbar-item'
						}>
						<i class='fas fa-address-card'></i>Contact
					</div>
				</DelayLink>
				<DelayLink
					to='/github'
					delay={500}
					clickAction={() => {
						if (location.pathname !== '/github') {
							onDelayStart();
						}
					}}>
					<div
						className={
							location.pathname === '/github'
								? 'navbar-item active last-item no-border'
								: 'navbar-item last-item no-border'
						}>
						<i class='fab fa-github-alt'></i>Github
					</div>
				</DelayLink>
			</div>
		</nav>
	);
};

export default Navbar;
