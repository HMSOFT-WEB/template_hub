import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Pause, Play } from 'lucide-react';

const shots = [
  { id: 'onyu', title: 'ONYU', type: '모델하우스', image: '/reel/onyu.png', screen: '/thumbnails/onyu.jpg', note: '스크롤로 둘러보는 주택', url: 'https://atelier-house-seven.vercel.app/' },
  { id: 'serein', title: 'SEREIN', type: '호텔·스테이', image: '/reel/serein.png', screen: '/thumbnails/serein.jpg', note: '풍경에서 시작하는 머무름', url: 'https://serein-retreat.vercel.app/' },
];
const ease = [.22, 1, .36, 1];
const sceneDuration = 8000;

export default function Reel() {
  const root = useRef(null);
  const elapsed = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const reduced = useReducedMotion();
  const visible = useInView(root, { amount: .15 });
  const progress = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const screenY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const playing = !paused && !reduced && visible && tabVisible;
  const shot = shots[active];

  useEffect(() => {
    const change = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => document.removeEventListener('visibilitychange', change);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!playing) return;
    elapsed.current += Math.min(delta, 100);
    progress.set(Math.min(elapsed.current / sceneDuration, 1));
    if (elapsed.current >= sceneDuration) {
      elapsed.current = 0;
      progress.set(0);
      setActive(value => (value + 1) % shots.length);
    }
  });

  function select(index) { setActive(index); elapsed.current = 0; progress.set(0); }

  return <section className="reel" ref={root} aria-label="최근 작업 모션 쇼릴" data-playing={playing} data-project={shot.id}>
    <AnimatePresence initial={false}>
      <motion.div className={`reel-scene reel-${shot.id}`} key={shot.id}
        initial={{ clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }} exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 1.15, ease }}>
        <motion.div className="reel-photo-wrap" style={{ y: reduced ? 0 : photoY }}>
          <img className="reel-photo" src={shot.image} alt="" width="1536" height="1024" fetchPriority={active === 0 ? 'high' : 'auto'} />
        </motion.div>
        <div className="reel-shade" />
        <div className="reel-copy"><span>{shot.type}</span>
          <h2 aria-label={shot.title}>{[...shot.title].map((letter, index) => <span className="reel-letter-mask" key={index} aria-hidden="true"><motion.span initial={reduced ? false : { y: '105%' }} animate={{ y: 0 }} transition={{ duration: .85, delay: .22 + index * .055, ease }}>{letter}</motion.span></span>)}</h2>
          <motion.p initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>{shot.note}</motion.p>
        </div>
        <motion.div className="reel-screen-parallax" style={{ y: reduced ? 0 : screenY }} aria-hidden="true">
          <motion.div className="reel-screen" initial={reduced ? false : { y: 65, rotate: 4, scale: .92, opacity: 0 }} animate={{ y: 0, rotate: -2, scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: .35, ease }}>
            <div className="reel-browser"><div><i /><i /><i /></div><span>{new URL(shot.url).hostname}</span></div>
            <img src={shot.screen} alt="" width="1280" height="820" />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    <div className="reel-topline"><span>HMSOFT의 최근 작업</span><span>웹사이트 쇼릴</span></div>
    <div className="reel-controls">
      <div className="reel-selector" role="group" aria-label="쇼릴 프로젝트 선택">{shots.map((item, index) => <button key={item.id} className={active === index ? 'active' : ''} aria-pressed={active === index} onClick={() => select(index)}><span>{item.title}</span><span className="reel-track">{active === index ? <motion.span style={{ scaleX: reduced ? 1 : progress }} /> : null}</span></button>)}</div>
      <div className="reel-player-actions"><button className="reel-pause" aria-label={paused || reduced ? '쇼릴 재생' : '쇼릴 일시정지'} disabled={Boolean(reduced)} onClick={() => setPaused(value => !value)}>{paused || reduced ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}</button><a href={shot.url} target="_blank" rel="noopener noreferrer">사이트 열기 <ArrowUpRight size={19} aria-hidden="true" /><span className="sr-only"> (새 탭)</span></a></div>
    </div>
  </section>;
}
