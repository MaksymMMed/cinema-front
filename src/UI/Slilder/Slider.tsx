import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import './Slider.css';

interface SliderProps {
  style?:CSSProperties;
  images: string[];
  moviesIds?: string[];
  moviesNames?: string[];
}

const Slider: React.FC<SliderProps> = ({ images, moviesIds, moviesNames,style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="slider" style={{...style}}>
      <div className="slides" ref={slideRef}>
        {images.map((img, index) => (
          <div className="slide-container" key={index}>
            <img src={img} alt={`Slide ${index}`} className="slide" />
            {moviesNames && moviesNames[index] && (
              <p className="slide-title">{moviesNames[index]}</p>
            )}
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