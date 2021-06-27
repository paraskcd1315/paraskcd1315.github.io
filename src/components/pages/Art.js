import React, { Fragment, useEffect, useState } from 'react';

const importAll = (r) => {
	return r.keys().map(r);
};

const images = importAll(
	require.context('../../resources/art/', false, /\.(png|jpe?g|JPG|svg)$/)
);

const Art = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 250);
	}, []);

	return (
		<Fragment>
			<div className={show ? `profile animate show` : `profile animate hide`}>
				<div className='art'>
					<h1 className='x-large'>My Art</h1>
					<div className='art-list'>
						{images.map((image, index) => {
							return (
								<div key={image.default} className='art-item'>
									<a href={image.default}>
										<img src={image.default} alt={index} />
									</a>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Art;
