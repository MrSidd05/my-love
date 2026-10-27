import { ChangeEvent, useEffect, useMemo, useState } from 'react'

const starterPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1779330371044-dfee79ab0b46?auto=format&fit=crop&w=900&q=82',
    alt: 'A bouquet of pink and purple flowers',
  },
  {
    src: 'https://images.unsplash.com/photo-1585748805705-2aa835b84ee6?auto=format&fit=crop&w=900&q=82',
    alt: 'White flowers in a glass vase',
  },
  {
    src: 'https://images.unsplash.com/photo-1768127023349-d1681596adeb?auto=format&fit=crop&w=900&q=82',
    alt: 'A warm drink tucked into a soft blanket',
  },
]

const loveNotes = [
  ['Your smile', 'The kind that makes an ordinary day feel like sunshine.', '☀️'],
  ['Your soft heart', 'The way you care so deeply is one of your superpowers.', '💗'],
  ['Every version of you', 'Happy, quiet, tired, silly—I choose you in every mood.', '🦋'],
  ['The way you try', 'Even on hard days, you are doing more than enough.', '🌱'],
]

const compliments = [
  'You make my world softer.',
  'You deserve gentle days.',
  'I am so lucky to love you.',
  'Your heart is pure magic.',
  'You are beautiful, always.',
  'Us is my favorite place.',
]

const cloudSurprises = ['🌸', '✨', '🧸', '🌷', '🍓', '🎀', '🐣', '🌙', '🍰']

const fortunes = [
  'A cozy cuddle and your favorite snack are in your future.',
  'You are about to be kissed on the forehead very, very soon.',
  'Tonight calls for a blanket, a comfort movie, and absolutely no worries.',
]

const mazeLevels = [
  { size: 4, path: [0, 1, 2, 6, 10, 9, 13, 14, 15], branches: [[1, 5], [10, 11]] },
  { size: 5, path: [0, 5, 10, 11, 6, 7, 8, 13, 18, 17, 22, 23, 24], branches: [[0, 1, 2], [8, 9, 4], [17, 16, 21]] },
  { size: 6, path: [0, 1, 7, 13, 12, 18, 24, 25, 26, 20, 14, 15, 16, 22, 28, 29, 35], branches: [[1, 2, 3], [13, 19], [26, 27, 33], [16, 10, 11]] },
  { size: 7, path: [0, 7, 14, 15, 8, 9, 10, 17, 24, 23, 30, 37, 38, 39, 32, 25, 26, 27, 34, 41, 48], branches: [[0, 1, 2], [15, 16], [10, 3, 4, 5], [23, 22, 21], [39, 40, 47], [27, 20, 13]] },
  { size: 8, path: [0, 1, 9, 17, 16, 24, 32, 33, 34, 26, 18, 19, 20, 28, 36, 44, 43, 51, 59, 60, 52, 53, 54, 46, 38, 39, 47, 55, 63], branches: [[1, 2, 3], [17, 25], [34, 35, 27], [19, 11, 12, 13], [44, 45], [51, 50, 49, 57], [53, 61, 62], [38, 37]] },
]

function Heart({ filled = true }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.8 4.8a5.6 5.6 0 0 0-7.9 0L12 5.7l-.9-.9a5.6 5.6 0 1 0-7.9 7.9l.9.9L12 21.5l7.9-7.9.9-.9a5.6 5.6 0 0 0 0-7.9Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.7 5.4 4.6 9.3 10 10-5.4.7-9.3 4.6-10 10-.7-5.4-4.6-9.3-10-10 5.4-.7 9.3-4.6 10-10Z" fill="currentColor" />
    </svg>
  )
}

function MomoCharacter() {
  return (
    <svg className="momo-art" viewBox="0 0 120 150" aria-hidden="true">
      <path className="momo-hair" d="M22 42C20 15 44 4 72 10c21 5 30 20 25 39L82 35 65 23 47 26Z" />
      <path className="momo-face" d="M24 38c2-19 20-26 41-23 25 3 36 21 30 43-4 13-15 22-29 24-21 3-39-9-42-27Z" />
      <path className="momo-ear" d="M88 44c17-5 20 20 3 23" />
      <path className="momo-brow" d="M34 37c7-5 14-5 20-1M66 35c7-3 13-1 18 3" />
      <circle className="momo-eye" cx="46" cy="45" r="3.5" />
      <circle className="momo-eye" cx="75" cy="44" r="3.5" />
      <path className="momo-mouth" d="M52 61c8 5 15 5 22 0" />
      <path className="momo-shirt" d="M35 77c13-7 35-6 49 1l9 40H27Z" />
      <path className="momo-arm" d="M31 83 13 103M86 82l19 15" />
      <path className="momo-shorts" d="M27 116h66l-5 20H64l-4-10-4 10H32Z" />
      <path className="momo-leg" d="M42 134v11M78 134v11" />
      <path className="momo-shoe" d="M29 145h26M66 145h25" />
    </svg>
  )
}

function App() {
  const [photos, setPhotos] = useState<string[]>([])
  const [hostedPhotos, setHostedPhotos] = useState<string[]>([])
  const [heartSpot, setHeartSpot] = useState(4)
  const [found, setFound] = useState(false)
  const [openedClouds, setOpenedClouds] = useState<number[]>([])
  const [blooms, setBlooms] = useState(0)
  const [kissCount, setKissCount] = useState(0)
  const [kissPosition, setKissPosition] = useState({ x: 48, y: 45 })
  const [fortune, setFortune] = useState<number | null>(null)
  const [notePop, setNotePop] = useState({ index: -1, count: 0 })
  const [galleryPage, setGalleryPage] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string; caption: string } | null>(null)
  const [savedMessage, setSavedMessage] = useState('')
  const [mazeLevel, setMazeLevel] = useState(0)
  const [mazeTrail, setMazeTrail] = useState<number[]>([mazeLevels[0].path[0]])
  const [pullingSnake, setPullingSnake] = useState(false)
  const [sitSeconds, setSitSeconds] = useState(0)
  const [characterEscaped, setCharacterEscaped] = useState(false)

  useEffect(() => {
    try {
      setPhotos(JSON.parse(localStorage.getItem('pooky-photos') || '[]'))
    } catch {
      setPhotos([])
    }
    fetch('/scrapbook/photos.json')
      .then((response) => response.json())
      .then((files: string[]) => setHostedPhotos(files.map((file) => `/scrapbook/${encodeURIComponent(file)}`)))
      .catch(() => setHostedPhotos([]))
  }, [])

  const gallery = useMemo(
    () => [
      ...hostedPhotos.map((src) => ({ src, alt: 'A hosted photo from our scrapbook', caption: 'one of our favorites' })),
      ...photos.map((src) => ({ src, alt: 'A photo from our memories', caption: 'saved in this browser' })),
      //...starterPhotos.map((photo, index) => ({ ...photo, caption: ['soft days', 'little joys', 'cozy moments'][index] })),
    ],
    [hostedPhotos, photos],
  )
  const photosPerPage = 6
  const galleryPages = Math.max(1, Math.ceil(gallery.length / photosPerPage))
  const visiblePhotos = gallery.slice(galleryPage * photosPerPage, (galleryPage + 1) * photosPerPage)

  useEffect(() => {
    setGalleryPage((page) => Math.min(page, galleryPages - 1))
  }, [galleryPages])

  useEffect(() => {
    if (!selectedPhoto) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedPhoto])

  useEffect(() => {
    const releaseSnake = () => setPullingSnake(false)
    window.addEventListener('pointerup', releaseSnake)
    return () => window.removeEventListener('pointerup', releaseSnake)
  }, [])

  useEffect(() => {
    if (sitSeconds <= 0) return
    const timer = window.setInterval(() => {
      setSitSeconds((seconds) => {
        if (seconds <= 1) {
          setCharacterEscaped(true)
          return 0
        }
        return seconds - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [sitSeconds > 0])

  useEffect(() => {
    const escapeTimer = window.setTimeout(() => {
      if (sitSeconds === 0) setCharacterEscaped(true)
    }, 4500)
    return () => window.clearTimeout(escapeTimer)
  }, [])

  const addPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []).slice(0, 5 - photos.length)
    if (!files.length) return
    Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(String(reader.result))
            reader.readAsDataURL(file)
          }),
      ),
    ).then((items) => {
      const next = [...photos, ...items]
      try {
        localStorage.setItem('pooky-photos', JSON.stringify(next))
        setPhotos(next)
        setSavedMessage('Saved in this browser, just for you.')
      } catch {
        setSavedMessage('That photo is a little too large. Try a smaller one.')
      }
    })
    event.target.value = ''
  }

  const playAgain = () => {
    setFound(false)
    setOpenedClouds([])
    setHeartSpot((previous) => (previous + 3 + Math.floor(Math.random() * 5)) % 9)
  }

  const openCloud = (index: number) => {
    if (index === heartSpot) {
      setFound(true)
      return
    }
    setOpenedClouds((previous) => previous.includes(index) ? previous : [...previous, index])
  }

  const catchKiss = () => {
    setKissCount((value) => Math.min(value + 1, 5))
    setKissPosition({
      x: 12 + Math.floor(Math.random() * 72),
      y: 12 + Math.floor(Math.random() * 68),
    })
  }

  const visitMazeCell = (cell: number) => {
    const level = mazeLevels[mazeLevel]
    setMazeTrail((trail) => {
      const current = trail[trail.length - 1]
      if (cell === current) return trail
      if (trail.length > 1 && cell === trail[trail.length - 2]) return trail.slice(0, -1)

      const canMove = [level.path, ...level.branches].some((route) =>
        route.some((routeCell, index) =>
          index > 0
          && ((routeCell === cell && route[index - 1] === current)
            || (routeCell === current && route[index - 1] === cell))),
      )
      if (!canMove || trail.includes(cell)) return trail
      return [...trail, cell]
    })
  }

  const tapCharacter = () => {
    setSitSeconds((seconds) => seconds + 10)
    setCharacterEscaped(false)
  }

  return (
    <main>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home">
          <span className="brand-mark"><Heart /></span>
          <span>for my pooky</span>
        </a>
        <div className="nav-links">
          <a href="#love">little love notes</a>
          <a href="#memories">our memories</a>
          <a href="#play">play a little</a>
        </div>
        <a className="nav-heart" href="#love" aria-label="Go to love notes"><Heart /></a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span><Sparkle /></span>A tiny corner of the internet, just for you</span>
          <h1>hey, my <em>sweet girl</em></h1>
          <p className="hero-lead">
            On the wobbly days, the quiet days, and every day in between—please remember that
            you are deeply loved, exactly as you are.
          </p>
          <a className="primary-button" href="#love"><Heart />Open a little love</a>
          <p className="signature">made with all my heart, for yours</p>
        </div>
        <div className="hero-art" aria-label="A hand-drawn bouquet of hearts">
          <span className="doodle doodle-one">you + me</span>
          <div className="big-heart"><Heart /></div>
          <span className="small-heart small-one"><Heart /></span>
          <span className="small-heart small-two"><Heart /></span>
          <span className="small-heart small-three"><Heart /></span>
          <svg className="stem-art" viewBox="0 0 280 250" aria-hidden="true">
            <path d="M143 35c-5 72-4 130 9 190M143 111c-34-20-56-23-78-18M147 142c28-16 50-20 71-12M149 177c-25-16-44-18-62-14" />
            <path d="M66 93c17-14 31-9 38 4-14 9-27 8-38-4ZM218 130c-13-14-28-10-35 3 13 9 25 8 35-3ZM88 163c14-13 27-8 34 4-13 8-24 7-34-4Z" />
          </svg>
        </div>
        <div className="scroll-note">keep scrolling, love <span>↓</span></div>
      </section>

      <section className="love-section section-pad" id="love">
        <div className="section-heading">
          <span className="section-kicker">A small reminder</span>
          <h2>things I adore about you</h2>
          <p>There are a million, but let’s start with these.</p>
        </div>
        <div className="note-grid">
          {loveNotes.map(([title, copy, emoji], index) => (
            <button
              className={`love-note note-${index + 1}`}
              key={title}
              onClick={() => setNotePop((previous) => ({ index, count: previous.count + 1 }))}
              aria-label={`${title}: ${copy}. Tap for a little surprise.`}
            >
              {notePop.index === index && (
                <span className="note-pop" key={notePop.count} aria-hidden="true">{emoji}</span>
              )}
              <span className="note-number">0{index + 1}</span>
              <span className="note-heart"><Heart filled={index % 2 === 0} /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="tap-hint">tap me</span>
            </button>
          ))}
        </div>
        <blockquote>“You never have to be less of yourself to be more loved.”</blockquote>
      </section>

      <section className="memory-section section-pad" id="memories">
        <div className="memory-heading">
          <div>
            <span className="section-kicker">Our little scrapbook</span>
            <h2>moments worth keeping</h2>
            <p>Add your favorite photos—they’ll stay saved in this browser.</p>
          </div>
          <label className="upload-button">
            <input type="file" accept="image/*" multiple onChange={addPhotos} />
            <span>＋</span> Add our photos
          </label>
        </div>
        {savedMessage && <p className="save-message" role="status">{savedMessage}</p>}
        <div className="photo-grid">
          {visiblePhotos.map((photo, index) => (
            <figure className={`photo-card tilt-${(index % 3) + 1}`} key={`${photo.src}-${index}`}>
              <button className="photo-open" onClick={() => setSelectedPhoto(photo)} aria-label={`Open photo: ${photo.caption}`}>
                <img src={photo.src} alt={photo.alt} />
                <figcaption>{photo.caption}</figcaption>
              </button>
            </figure>
          ))}
        </div>
        {galleryPages > 1 && (
          <div className="gallery-controls" aria-label="Scrapbook pages">
            <button
              onClick={() => setGalleryPage((page) => Math.max(0, page - 1))}
              disabled={galleryPage === 0}
              aria-label="Show previous scrapbook photos"
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <span>Page {galleryPage + 1} of {galleryPages}</span>
            <button
              onClick={() => setGalleryPage((page) => Math.min(galleryPages - 1, page + 1))}
              disabled={galleryPage === galleryPages - 1}
              aria-label="Show more scrapbook photos"
            >
              More photos <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
        {photos.length > 0 && (
          <button
            className="text-button"
            onClick={() => {
              localStorage.removeItem('pooky-photos')
              setPhotos([])
              setSavedMessage('Your added photos were cleared.')
            }}
          >
            Clear my added photos
          </button>
        )}
        {selectedPhoto && (
          <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Enlarged scrapbook photo" onClick={() => setSelectedPhoto(null)}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close enlarged photo">×</button>
            <figure className="opened-photo-card" onClick={(event) => event.stopPropagation()}>
              <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
              <figcaption>{selectedPhoto.caption}</figcaption>
              <span>our little memory</span>
            </figure>
          </div>
        )}
      </section>

      <section className="play-section section-pad" id="play">
        <div className="section-heading">
          <span className="section-kicker">Tiny mood lifters</span>
          <h2>take a little play break</h2>
          <p>No scores, no pressure—just something sweet.</p>
        </div>
        <div className="games-grid">
          <article className="game-card find-game">
            <span className="game-label">Game one</span>
            <h3>Find my hidden heart</h3>
            <p>I tucked it under one of these little clouds. Can you find it?</p>
            <div className="cloud-grid">
              {Array.from({ length: 9 }).map((_, index) => (
                <button
                  key={index}
                  className={`cloud ${openedClouds.includes(index) ? 'is-open' : ''} ${found && index === heartSpot ? 'is-found' : ''}`}
                  aria-label={`Look under cloud ${index + 1}`}
                  onClick={() => openCloud(index)}
                >
                  {found && index === heartSpot
                    ? <Heart />
                    : openedClouds.includes(index)
                      ? <span className="cloud-surprise" aria-hidden="true">{cloudSurprises[index]}</span>
                      : <span className="cloud-shape" />}
                </button>
              ))}
            </div>
            <div className="game-result" aria-live="polite">
              {found ? (
                <><strong>You found it!</strong><span>It was yours all along.</span><button onClick={playAgain}>Hide it again</button></>
              ) : openedClouds.length > 0
                ? <><strong>So close, my love!</strong><span>You’re one step closer to finding my heart.</span></>
                : <span>Tap a cloud to peek underneath</span>}
            </div>
          </article>

          <article className="game-card bloom-game">
            <span className="game-label">Game two</span>
            <h3>Grow a compliment garden</h3>
            <p>Tap the pot and watch something lovely grow—just like you do.</p>
            <div className="garden">
              <div className="flowers">
                {compliments.slice(0, blooms).map((_, index) => (
                  <span className={`flower flower-${index + 1}`} key={index}>
                    <i /><i /><i /><i /><b />
                  </span>
                ))}
              </div>
              <button className="pot" aria-label="Grow a compliment" onClick={() => setBlooms((value) => Math.min(value + 1, compliments.length))}>
                <span>tap me</span>
              </button>
            </div>
            <div className="compliment" aria-live="polite">
              {blooms ? compliments[blooms - 1] : 'Your garden is waiting for you.'}
            </div>
            {blooms === compliments.length && <button className="text-button" onClick={() => setBlooms(0)}>Plant again</button>}
          </article>

          <article className="game-card kiss-game">
            <span className="game-label">Game three</span>
            <h3>Catch five kisses</h3>
            <p>A few kisses escaped! Catch all five before they float away.</p>
            <div className="kiss-field">
              {kissCount < 5 ? (
                <button
                  className="flying-kiss"
                  aria-label={`Catch kiss ${kissCount + 1} of 5`}
                  onClick={catchKiss}
                  style={{ left: `${kissPosition.x}%`, top: `${kissPosition.y}%` }}
                >
                  <Heart />
                </button>
              ) : (
                <div className="kiss-finale">
                  <span className="heart-burst"><Heart /></span>
                  <strong>All caught!</strong>
                  <span>Five kisses, delivered right to you.</span>
                </div>
              )}
              <div className="kiss-score">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span className={index < kissCount ? 'caught' : ''} key={index}><Heart filled={index < kissCount} /></span>
                ))}
              </div>
            </div>
            {kissCount === 5 && (
              <button className="text-button" onClick={() => { setKissCount(0); setKissPosition({ x: 48, y: 45 }) }}>
                Send more kisses
              </button>
            )}
          </article>

          <article className="game-card fortune-game">
            <span className="game-label">Game four</span>
            <h3>Pick a love letter</h3>
            <p>One tiny envelope has a sweet fortune waiting just for you.</p>
            <div className="envelope-row">
              {fortunes.map((message, index) => (
                <button
                  className={`envelope ${fortune === index ? 'chosen' : ''}`}
                  key={message}
                  aria-label={`Open love letter ${index + 1}`}
                  onClick={() => setFortune(index)}
                >
                  <span className="envelope-flap" />
                  <span className="letter-heart"><Heart /></span>
                </button>
              ))}
            </div>
            <div className="fortune-result" aria-live="polite">
              {fortune === null ? (
                <span>Choose the one that calls to your heart.</span>
              ) : (
                <><strong>Your little love forecast</strong><span>{fortunes[fortune]}</span></>
              )}
            </div>
            {fortune !== null && <button className="text-button" onClick={() => setFortune(null)}>Choose again</button>}
          </article>

          <article className="game-card maze-game">
            <span className="game-label">Game five · Level {mazeLevel + 1} of 5</span>
            <h3>Pull the little snake home</h3>
            <p>Press the snake, then drag through the pink path without touching a wall.</p>
            <div
              className="maze-board"
              style={{ gridTemplateColumns: `repeat(${mazeLevels[mazeLevel].size}, 1fr)` }}
              onPointerDown={(event) => {
                const cell = document.elementFromPoint(event.clientX, event.clientY)
                  ?.closest<HTMLElement>('[data-maze-cell]')
                if (Number(cell?.dataset.mazeCell) !== mazeTrail[mazeTrail.length - 1]) return
                event.preventDefault()
                event.currentTarget.setPointerCapture(event.pointerId)
                setPullingSnake(true)
              }}
              onPointerMove={(event) => {
                if (!pullingSnake) return
                event.preventDefault()
                const cell = document.elementFromPoint(event.clientX, event.clientY)
                  ?.closest<HTMLElement>('[data-maze-cell]')
                if (cell?.dataset.mazeCell) visitMazeCell(Number(cell.dataset.mazeCell))
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId)
                }
                setPullingSnake(false)
              }}
              onPointerCancel={() => setPullingSnake(false)}
            >
              {Array.from({ length: mazeLevels[mazeLevel].size ** 2 }).map((_, cell) => {
                const level = mazeLevels[mazeLevel]
                const openCells = new Set([level.path, ...level.branches].flat())
                const isOpen = openCells.has(cell)
                const isHead = cell === mazeTrail[mazeTrail.length - 1]
                return (
                  <button
                    key={cell}
                    data-maze-cell={cell}
                    className={`maze-cell ${isOpen ? 'maze-path' : 'maze-wall'} ${mazeTrail.includes(cell) ? 'snake-trail' : ''}`}
                    aria-label={isHead ? 'Snake head, drag from here' : cell === level.path[level.path.length - 1] ? 'Maze finish' : isOpen ? 'Open maze path' : 'Maze wall'}
                    tabIndex={isHead ? 0 : -1}
                  >
                    {isHead && <span className="snake-head">●</span>}
                    {cell === level.path[level.path.length - 1] && <span className="maze-finish"><Heart /></span>}
                  </button>
                )
              })}
            </div>
            <div className="maze-status" aria-live="polite">
              {mazeTrail[mazeTrail.length - 1] === mazeLevels[mazeLevel].path.at(-1) ? (
                <>
                  <strong>Made it home!</strong>
                  <button onClick={() => {
                    setMazeLevel((level) => (level + 1) % mazeLevels.length)
                    setMazeTrail([mazeLevels[(mazeLevel + 1) % mazeLevels.length].path[0]])
                  }}>{mazeLevel === 4 ? 'Play from easy again' : 'Try the next level'}</button>
                </>
              ) : <span>{['Easy peasy', 'A little twisty', 'Getting clever', 'Nearly expert', 'Maze master'][mazeLevel]} · You can backtrack from a dead end</span>}
            </div>
          </article>

          <article className="game-card pixel-game">
            <span className="game-label">Game six</span>
            <h3>Make Momo sit still</h3>
            <p>Tap the wiggly pixel pal. Every tap adds 10 seconds of quiet chair time.</p>
            <div className="pixel-room">
              <div className="pixel-chair"><span /><i /></div>
              {!characterEscaped && (
                <button
                  className={`pixel-character ${sitSeconds > 0 ? 'is-sitting' : ''}`}
                  onClick={tapCharacter}
                  aria-label="Tap Momo to add ten seconds of sitting time"
                >
                  <MomoCharacter />
                </button>
              )}
              <span className="room-note">{characterEscaped ? 'Oh! Momo escaped the card…' : sitSeconds > 0 ? 'Such a good sitter.' : 'Quick, tap Momo!'}</span>
            </div>
            {characterEscaped && (
              <button
                className="pixel-character escaped-character"
                onClick={tapCharacter}
                aria-label="Catch Momo and add ten seconds of sitting time"
              >
                <MomoCharacter />
              </button>
            )}
            <div className="sit-counter" aria-live="polite">
              <strong>{sitSeconds}s</strong>
              <span>{sitSeconds > 0 ? 'banked chair time' : 'Catch Momo before they roam away!'}</span>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <Heart />
        <p>No matter the mood, no matter the day—<strong>I’m right here.</strong></p>
        <span>loving you is my favorite thing</span>
      </footer>
    </main>
  )
}

export default App
