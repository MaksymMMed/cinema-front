import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	CSSProperties,
	ReactElement,
	ReactNode,
} from 'react';
import './Slider.css';

interface SliderProps {
	style?: CSSProperties;
	elements: string[] | ReactElement[] | ReactNode[];
	autoSlide?: number;
}

const Slider: React.FC<SliderProps> = ({ elements, style, autoSlide }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slideRef = useRef<HTMLDivElement>(null);
	const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

	const resetAutoSlide: () => void = useCallback(() => {
		if (autoSlideRef.current) {
			clearInterval(autoSlideRef.current);
		}
		if (autoSlide && autoSlide > 0) {
			autoSlideRef.current = setInterval(
				() => setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length),
				autoSlide,
			);
		}
	}, [autoSlide, elements.length]);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
		resetAutoSlide();
	}, [elements.length, resetAutoSlide]);

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + elements.length) % elements.length);
		resetAutoSlide();
	};

	useEffect(() => {
		if (slideRef.current) {
			slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
		}
	}, [currentIndex]);

	useEffect(() => {
		resetAutoSlide();
		return () => {
			if (autoSlideRef.current) {
				clearInterval(autoSlideRef.current);
			}
		};
	}, [autoSlide, nextSlide, resetAutoSlide]);

	return (
		<div className="slider" style={{ ...style }}>
			<div className="slides" ref={slideRef}>
				{elements.map((element, index) => (
					<div className="slide-container" key={index}>
						{element}
					</div>
				))}
			</div>
			<button className="slider-button prev" onClick={prevSlide}>
				⟨
			</button>
			<button className="slider-button next" onClick={nextSlide}>
				⟩
			</button>
		</div>
	);
};

export default Slider;
