import { useEffect, useRef, useState } from 'react';
import { MOBILE_BREAKPOINT_PX } from '../../constants';

export default function useHorizontalPin() {
	const pinRef = useRef<HTMLDivElement | null>(null);
	const trackRef = useRef<HTMLDivElement | null>(null);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		let raf = 0;
		const tick = () => {
			const pin = pinRef.current;
			const track = trackRef.current;
			if (pin && track && window.innerWidth > MOBILE_BREAKPOINT_PX) {
				const r = pin.getBoundingClientRect();
				const total = pin.offsetHeight - window.innerHeight;
				const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
				setProgress((prev) => (prev !== p ? p : prev));
				const trackW = track.scrollWidth - window.innerWidth;
				track.style.transform = `translate3d(${-p * trackW}px, 0, 0)`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	return { pinRef, trackRef, progress };
}
