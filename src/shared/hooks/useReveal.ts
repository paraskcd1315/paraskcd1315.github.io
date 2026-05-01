import { useEffect, useRef, type RefObject } from 'react';

export default function useReveal<T extends HTMLElement = HTMLElement>(): RefObject<T> {
	const ref = useRef<T>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('in');
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.15 }
		);
		el.querySelectorAll('.reveal').forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, []);
	return ref;
}
