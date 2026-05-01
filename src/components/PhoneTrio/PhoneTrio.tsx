/**
 * Renders a row of "phones" tilted at -3°/0°/+3° (or -3°/+3° for two)
 * with screenshots inside. Used by KCD Search, Influential Launcher,
 * Spotlight Search, and United Walls project mocks.
 */
const TWO_PHONE_TILT = [-3, 3];
const TRIO_TILT = [-3, 0, 3];
const TRIO_Y_OFFSET = [12, -12, 12];
const DUO_Y_OFFSET = [14, -14];

type PhoneTrioProps = {
	shots: string[];
	background: string;
	alt: string;
	phoneWidth?: number;
	phoneMaxHeight?: number;
	borderRadius?: number;
	gap?: string;
};

export default function PhoneTrio({ shots, background, alt, phoneWidth = 180, phoneMaxHeight = 420, borderRadius = 22, gap = '20px' }: PhoneTrioProps) {
	const isDuo = shots.length === 2;
	const tilts = isDuo ? TWO_PHONE_TILT : TRIO_TILT;
	const yOffsets = isDuo ? DUO_Y_OFFSET : TRIO_Y_OFFSET;
	return (
		<div
			className='project-mock'
			style={{
				background,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap,
				padding: '30px'
			}}
		>
			{shots.map((src, i) => (
				<div
					key={src}
					style={{
						width: phoneWidth,
						height: '90%',
						maxHeight: phoneMaxHeight,
						borderRadius: `${borderRadius}px`,
						border: '1px solid rgba(255,255,255,0.16)',
						overflow: 'hidden',
						boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
						transform: `translateY(${yOffsets[i]}px) rotate(${tilts[i]}deg)`,
						background: '#000'
					}}
				>
					<img
						src={src}
						alt={`${alt} ${i + 1}`}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'top'
						}}
						loading='lazy'
					/>
				</div>
			))}
		</div>
	);
}
