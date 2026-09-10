import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Bookmark, Check, Search, X } from 'lucide-react';
import { categories, templates } from './templates';
import Reel from './Reel';
import './index.css';

const storageKey = 'hmsoft-hub:saved:v1';
function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? localStorage.getItem('hmsoft-saved') ?? '[]');
    return Array.isArray(value) ? [...new Set(value.filter(id => templates.some(t => t.id === id)))] : [];
  } catch { return []; }
}
function readFilters() {
  const params = new URLSearchParams(location.search);
  const requestedCategory = params.get('category');
  return { query: params.get('q') ?? '', category: categories.some(c => c.id === requestedCategory) ? requestedCategory : 'all', onlySaved: params.get('saved') === '1' };
}
function SaveButton({ template, saved, onSave, withLabel = false }) {
  return <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={onSave}
    aria-label={`${template.title} ${saved ? '저장 해제' : '저장'}`} aria-pressed={saved}>
    <Bookmark size={18} strokeWidth={1.6} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
    {withLabel ? (saved ? '저장됨' : '저장하기') : null}
  </button>;
}
function Project({ template: t, saved, onSave, onOpen, featured = false }) {
  return <article className={featured ? `featured-project featured-${t.id}` : 'project-card'}>
    <button className="project-image" onClick={onOpen} aria-label={`${t.title} 미리보기`}>
      <img src={t.image} alt={`${t.title} 웹사이트 첫 화면`} width="1280" height="820"
        loading={featured ? 'eager' : 'lazy'} fetchPriority={featured && t.id === 'onyu' ? 'high' : 'auto'} />
      <span className="preview-label">미리보기 <ArrowUpRight size={15} aria-hidden="true" /></span>
    </button>
    <div className="project-caption">
      <div><h3><button onClick={onOpen}>{t.title}</button></h3><p>{t.type}</p></div>
      <div className="project-actions"><SaveButton template={t} saved={saved} onSave={onSave} />
        <a href={t.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.title} 실제 사이트 열기 (새 탭)`}><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></a>
      </div>
    </div>
  </article>;
}

export default function App() {
  const [filters, setFilters] = useState(readFilters);
  const [saved, setSaved] = useState(readSaved);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');
  const dialogTrigger = useRef(null);
  const { query, category, onlySaved } = filters;
  useEffect(() => {
    const onPopState = () => setFilters(readFilters());
    const onStorage = event => { if (event.key === storageKey) setSaved(readSaved()); };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('popstate', onPopState); window.removeEventListener('storage', onStorage); };
  }, []);
  function updateFilters(changes) {
    const next = { ...filters, ...changes };
    setFilters(next);
    const params = new URLSearchParams();
    if (next.query) params.set('q', next.query);
    if (next.category !== 'all') params.set('category', next.category);
    if (next.onlySaved) params.set('saved', '1');
    const search = params.toString();
    history.replaceState(null, '', `${location.pathname}${search ? `?${search}` : ''}${location.hash}`);
  }
  function toggleSave(id) {
    const next = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
    setSaved(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setNotice(next.includes(id) ? '사이트를 저장했습니다.' : '저장을 해제했습니다.'); }
    catch { setNotice('현재 화면에 저장했습니다. 브라우저를 닫으면 목록이 사라질 수 있습니다.'); }
  }
  function openProject(template, event) { dialogTrigger.current = event.currentTarget; setSelected(template); }
  function showSaved() {
    updateFilters({ onlySaved: !onlySaved, query: '', category: 'all' });
    requestAnimationFrame(() => document.getElementById('collection').scrollIntoView());
  }
  const q = query.trim().toLocaleLowerCase();
  const filtered = templates.filter(t => (category === 'all' || t.category === category) && (!onlySaved || saved.includes(t.id)) && (!q || `${t.title} ${t.type} ${t.description} ${t.keywords}`.toLocaleLowerCase().includes(q)));
  return <>
    <a className="skip-link" href="#collection">템플릿 목록으로 건너뛰기</a>
    <header className="site-header">
      <a href="/" className="brand" aria-label="HMSOFT 디자인 허브 홈"><span className="official-logo"><img src="/favicon.png" alt="HM SOFT" width="1024" height="1024" /></span><span className="brand-label">디자인 허브</span></a>
      <nav aria-label="주 메뉴">
        <a className="collection-link" href="#collection" onClick={() => updateFilters({ onlySaved: false })}>템플릿</a>
        <button className={onlySaved ? 'nav-saved active' : 'nav-saved'} onClick={showSaved} aria-pressed={onlySaved}><Bookmark size={16} strokeWidth={1.6} aria-hidden="true" /><span>저장한 사이트</span><span className="saved-count">{saved.length}</span></button>
        <a className="company-link" href="https://hmsoft.it.kr" target="_blank" rel="noopener noreferrer">회사 소개 <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (새 탭)</span></a>
      </nav>
    </header>
    <main>
      <section className="opening page-width" aria-labelledby="page-title">
        <div className="opening-heading"><h1 id="page-title">웹사이트 컬렉션</h1><p>HMSOFT에서 직접 만든 웹사이트.<br />화면을 살펴보고, 실제 사이트에서 경험해 보세요.</p></div>
      </section>
      <Reel />
      <section className="collection page-width" id="collection" aria-labelledby="collection-title">
        <div className="collection-heading"><h2 id="collection-title">{onlySaved ? '저장한 사이트' : '전체 템플릿'} <span>{onlySaved ? saved.length : templates.length}</span></h2>
          <label className="search-field"><Search size={17} strokeWidth={1.6} aria-hidden="true" /><input type="search" name="q" aria-label="템플릿 검색" placeholder="어떤 사이트를 찾으세요?" value={query} autoComplete="off" onChange={e => updateFilters({ query: e.target.value })} />{query ? <button onClick={() => updateFilters({ query: '' })} aria-label="검색어 지우기"><X size={16} aria-hidden="true" /></button> : null}</label>
        </div>
        <div className="collection-tools"><div className="category-list" role="group" aria-label="업종별 필터">{categories.map(c => <button key={c.id} className={category === c.id ? 'active' : ''} aria-pressed={category === c.id} onClick={() => updateFilters({ category: c.id })}>{c.label}</button>)}</div><span className="results-count" role="status">{filtered.length}개 사이트</span></div>
        {filtered.length ? <div className="project-grid">{filtered.map(t => <Project key={t.id} template={t} saved={saved.includes(t.id)} onSave={() => toggleSave(t.id)} onOpen={e => openProject(t, e)} />)}</div> : <div className="empty-state"><Bookmark size={25} strokeWidth={1.2} aria-hidden="true" /><h3>{onlySaved && !saved.length ? '마음에 드는 사이트를 모아보세요.' : '조건에 맞는 사이트가 없어요.'}</h3><p>{onlySaved && !saved.length ? '각 사이트 옆의 저장 버튼을 누르면 이곳에서 다시 볼 수 있습니다.' : '다른 검색어를 입력하거나 필터를 초기화해 보세요.'}</p><button onClick={() => updateFilters({ query: '', category: 'all', onlySaved: false })}>전체 템플릿 보기</button></div>}
      </section>
    </main>
    <footer className="site-footer page-width"><div className="footer-main"><a className="brand" href="/" aria-label="HMSOFT 디자인 허브 홈"><span className="official-logo"><img src="/favicon.png" alt="HM SOFT" width="1024" height="1024" /></span><span className="brand-label">디자인 허브</span></a><p>마음에 드는 방향을 찾으셨나요?<br /><a href="mailto:ceo@hmsoft.it.kr">ceo@hmsoft.it.kr</a></p><a className="footer-contact" href="mailto:ceo@hmsoft.it.kr">프로젝트 문의 <ArrowUpRight size={20} aria-hidden="true" /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HMSOFT</span><span>웹사이트는 계속 추가됩니다.</span><a href="https://github.com/HMSOFT-WEB/template_hub" target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (새 탭)</span></a></div></footer>
    <p className="sr-only" role="status">{notice}</p>
    <Dialog.Root open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }}>
      {selected ? <Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="project-dialog" onCloseAutoFocus={event => { event.preventDefault(); dialogTrigger.current?.focus(); }}>
        <div className="dialog-top"><span>사이트 미리보기</span><Dialog.Close className="dialog-close" aria-label="미리보기 닫기"><X size={21} aria-hidden="true" /></Dialog.Close></div>
        <img className="dialog-image" src={selected.image} width="1280" height="820" alt={`${selected.title} 웹사이트 첫 화면`} />
        <div className="dialog-body"><div className="dialog-description"><p className="dialog-type">{selected.type}</p><Dialog.Title>{selected.title}</Dialog.Title><Dialog.Description>{selected.description}</Dialog.Description></div><div className="dialog-details"><h3>살펴볼 부분</h3><ul>{selected.features.map(feature => <li key={feature}><Check size={14} aria-hidden="true" />{feature}</li>)}</ul><div className="dialog-actions"><SaveButton template={selected} saved={saved.includes(selected.id)} onSave={() => toggleSave(selected.id)} withLabel /><a href={selected.url} target="_blank" rel="noopener noreferrer">사이트 열기 <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (새 탭)</span></a></div></div></div>
      </Dialog.Content></Dialog.Portal> : null}
    </Dialog.Root>
  </>;
}
