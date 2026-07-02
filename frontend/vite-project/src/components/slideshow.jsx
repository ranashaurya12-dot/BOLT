import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";


const slides = [
  { id: 1, image: img1, accent: "#3b9eff" },
  { id: 2, image: img2, accent: "#f59e0b" },
  { id: 3, image: img3, accent: "#f59e0b" },
  { id: 4, image: img4, accent: "#f59e0b" },
];


export default function Slideshow() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(null);
  const DURATION = 8000;


  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);


  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);


  const goTo = useCallback(
    (index, dir = 1) => {
      if (animating || index === current) return;
      setDirection(dir);
      setPrev(current);
      setAnimating(true);
      setCurrent(index);
      setProgress(0);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    },
    [animating, current]
  );


  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);


  const prev_ = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);


  useEffect(() => {
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    intervalRef.current = setTimeout(() => next(), DURATION);
    return () => {
      clearTimeout(intervalRef.current);
      cancelAnimationFrame(progressRef.current);
    };
  }, [current, next]);


  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev_();
    touchStartX.current = null;
  };


  const handleNavigate = (e) => {
    if (e.target.closest("button")) return;
    navigate("/shop");
  };


  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;


  return (
    <div
      style={styles.root}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleNavigate}
    >
      {prevSlide && (
        <div
          key={`prev-${prev}`}
          style={{
            ...styles.bgLayer,
            backgroundImage: `url(${prevSlide.image})`,
            backgroundSize: isMobile ? "contain" : "cover",
            backgroundPosition: "center",
            backgroundColor: "#050505",
            opacity: 1,
            transform: `scale(1.05) translateX(${animating ? direction * -6 : 0}%)`,
            transition: "transform 0.7s cubic-bezier(0.77,0,0.175,1), opacity 0.7s ease",
          }}
        />
      )}
      <div
        key={`cur-${current}`}
        style={{
          ...styles.bgLayer,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: isMobile ? "contain" : "cover",
          backgroundPosition: "center",
          backgroundColor: "#050505",
          opacity: animating ? 0 : 1,
          transform: `scale(${animating ? 1.08 : 1.05}) translateX(${animating ? direction * 4 : 0}%)`,
          transition: "transform 0.7s cubic-bezier(0.77,0,0.175,1), opacity 0.55s ease 0.1s",
        }}
      />


      <div style={styles.gradientOverlay} />
      <div style={styles.topOverlay} />


      <div style={{ ...styles.topBar, padding: isMobile ? "16px 18px" : "28px 36px" }}>
        <div style={{ ...styles.logo, fontSize: isMobile ? 11 : 13 }}>
          <span style={{ ...styles.logoDot, background: slide.accent }} />
          BOLT FUEL
        </div>
        <div style={{ ...styles.slideCount, fontSize: isMobile ? 11 : 13 }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>


      {!isMobile && (
        <>
          <button style={{ ...styles.arrow, left: 28 }} onClick={prev_} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button style={{ ...styles.arrow, right: 108 }} onClick={next} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <div style={styles.thumbStrip}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                style={{
                  ...styles.thumb,
                  backgroundImage: `url(${s.image})`,
                  opacity: i === current ? 1 : 0.45,
                  transform: i === current ? "scale(1)" : "scale(0.88)",
                  outline: i === current ? `2px solid ${slide.accent}` : "none",
                  outlineOffset: "3px",
                }}
              />
            ))}
          </div>
        </>
      )}


      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressBar, width: `${progress}%`, background: slide.accent }} />
      </div>


      <div style={{ ...styles.dots, bottom: isMobile ? 16 : 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            style={{
              ...styles.dot,
              width: i === current ? 24 : 8,
              background: i === current ? slide.accent : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


const styles = {
root: {
    position: "relative",
    width: "100%",
    height: "56vw",
    minHeight: 280,
    maxHeight: "100svh",
    overflow: "hidden",
    background: "#050505",
    fontFamily: "'Inter', sans-serif",
    userSelect: "none",
    touchAction: "pan-y",
  },
  bgLayer: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    willChange: "transform, opacity",
  },
  gradientOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)",
    zIndex: 2,
  },
  topOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 110,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
    zIndex: 2,
  },
  topBar: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    color: "#fff",
    fontWeight: 700,
    letterSpacing: "0.16em",
    fontFamily: "'Syne', sans-serif",
  },
  logoDot: {
    width: 7, height: 7,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "background 0.4s ease",
  },
  slideCount: {
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'Syne', sans-serif",
    letterSpacing: "0.12em",
  },
  thumbStrip: {
    position: "absolute",
    right: 36,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 10,
  },
  thumb: {
    width: 52, height: 38,
    borderRadius: 5,
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.3s ease, transform 0.3s ease, outline 0.3s ease",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "50%",
    width: 46, height: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    cursor: "pointer",
    zIndex: 10,
    transition: "background 0.2s ease",
  },
  progressTrack: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 2,
    background: "rgba(255,255,255,0.1)",
    zIndex: 10,
  },
  progressBar: {
    height: "100%",
    transition: "width 0.1s linear",
  },
  dots: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6,
    alignItems: "center",
    zIndex: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    transition: "width 0.35s ease, background 0.35s ease",
    padding: 0,
  },
};