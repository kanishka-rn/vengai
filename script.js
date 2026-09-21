/**
 * bday ♡ — main script
 *
 * MUSIC:
 * 1. assets/song.mp3       = main song
 * 2. assets/background.mp3 = soft looping background music
 *
 * Behavior:
 * - Background music starts when the envelope is opened.
 * - Background music loops across all screens.
 * - Playing song.mp3 pauses background music.
 * - Pausing/ending song.mp3 resumes background music.
 */

(function () {
  'use strict';

  if (!window.CONFIG) {
    console.error('bday: config.js not loaded.');
    return;
  }

  const C = window.CONFIG;

  const $ = (id) => document.getElementById(id);


  /* =========================================================
     SCREEN SYSTEM
  ========================================================= */

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((s) => {
      s.classList.remove('active', 'exit');
    });

    const target = $(id);

    if (!target) return;

    target.classList.add('active');
    target.scrollTop = 0;
  }


  function transitionTo(id) {
    const current = document.querySelector('.screen.active');

    if (current) {
      current.classList.add('exit');
      current.classList.remove('active');
    }

    spawnHearts(6);

    setTimeout(() => {
      showScreen(id);
    }, 5000);
  }


  /* =========================================================
     HEART EFFECTS
  ========================================================= */

  function spawnHearts(n) {
    const box = $('floatingHearts');

    if (!box) return;

    for (let i = 0; i < n; i++) {
      const h = document.createElement('span');

      h.className = 'fh';
      h.textContent = '♡';

      h.style.left =
        Math.random() * 88 + 6 + '%';

      h.style.top =
        Math.random() * 75 + 10 + 'vh';

      h.style.fontSize =
        (.55 + Math.random() * .85) + 'rem';

      h.style.animationDelay =
        (Math.random() * .35) + 's';

      h.style.animationDuration =
        (1.1 + Math.random() * .9) + 's';

      box.appendChild(h);

      h.addEventListener('animationend', () => {
        h.remove();
      });
    }
  }


  /* =========================================================
     BACKGROUND MUSIC
  ========================================================= */

  let backgroundMusic = null;

  // True once background music has successfully started.
  let backgroundMusicStarted = false;


  function setupBackgroundMusic() {

    if (C.backgroundMusicEnabled === false) {
      return;
    }

    backgroundMusic = new Audio();

    backgroundMusic.src =
      C.backgroundMusicPath ||
      'assets/background.mp3';

    // IMPORTANT:
    // Background music loops forever.
    backgroundMusic.loop = true;

    backgroundMusic.preload = 'auto';

    backgroundMusic.volume =
      typeof C.backgroundMusicVolume === 'number'
        ? C.backgroundMusicVolume
        : 0.20;


    backgroundMusic.addEventListener('error', () => {
      console.warn(
        'Background music could not be loaded:',
        backgroundMusic.src
      );
    });
  }


  function startBackgroundMusic() {

    if (C.backgroundMusicEnabled === false) {
      return;
    }

    if (!backgroundMusic) {
      setupBackgroundMusic();
    }

    if (!backgroundMusic) {
      return;
    }

    // Already playing.
    if (!backgroundMusic.paused) {
      return;
    }


    backgroundMusic
      .play()
      .then(() => {

        backgroundMusicStarted = true;

        const indicator =
          $('introMusicIndicator');

        if (indicator) {
          indicator.classList.add('playing');
        }

      })
      .catch(() => {

        console.log(
          'Background music needs user interaction before it can play.'
        );

      });
  }


  /*
   * IMPORTANT:
   * This only PAUSES the background music.
   *
   * It does NOT reset currentTime.
   *
   * Therefore, when song.mp3 stops,
   * background.mp3 continues from where it paused.
   */
  function pauseBackgroundMusic() {

    if (!backgroundMusic) {
      return;
    }

    backgroundMusic.pause();

    const indicator =
      $('introMusicIndicator');

    if (indicator) {
      indicator.classList.remove('playing');
    }
  }


  /*
   * Used only when restarting the entire experience.
   */
  function stopBackgroundMusic() {

    if (!backgroundMusic) {
      return;
    }

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

    backgroundMusicStarted = false;

    const indicator =
      $('introMusicIndicator');

    if (indicator) {
      indicator.classList.remove('playing');
    }
  }


  /* =========================================================
     ENVELOPE
  ========================================================= */

  let envelopeOpened = false;


  function openEnvelope() {

    if (envelopeOpened) {
      return;
    }

    envelopeOpened = true;


    /*
     * Start background music directly from the
     * envelope click.
     *
     * This is important because the click is a
     * user interaction and browsers allow audio
     * playback from it.
     */
    startBackgroundMusic();


    const tapHint = $('tapHint');

    if (tapHint) {
      tapHint.style.opacity = '0';
    }


    const envelope = $('envelope');

    if (envelope) {
      envelope.classList.add('open');
    }


    spawnHearts(10);


    setTimeout(() => {
      transitionTo('screen-gifts');
    }, 1400);
  }


  /* =========================================================
     AMBIENT HEARTS
  ========================================================= */

  function startAmbientHearts() {

    const bg = $('heartsBg');

    if (!bg) {
      return;
    }


    function spawn() {

      const h = document.createElement('span');

      h.className = 'h';

      h.textContent =
        Math.random() > .5
          ? '♡'
          : '♥';

      h.style.left =
        Math.random() * 100 + '%';

      h.style.animationDuration =
        (7 + Math.random() * 8) + 's';

      h.style.animationDelay =
        (Math.random() * 1.5) + 's';

      h.style.fontSize =
        (.55 + Math.random() * .85) + 'rem';

      bg.appendChild(h);

      h.addEventListener('animationend', () => {
        h.remove();
      });
    }


    spawn();
    spawn();
    spawn();

    setInterval(spawn, 1500);
  }


  /* =========================================================
     MODALS
  ========================================================= */

  function openModal(id) {

    const modal = $(id);

    if (!modal) {
      return;
    }

    modal.classList.add('open');

    document.body.style.overflow = 'hidden';
  }


  function closeModal(id) {

    const modal = $(id);

    if (!modal) {
      return;
    }

    modal.classList.remove('open');

    document.body.style.overflow = '';
  }


  /* =========================================================
     CONTENT
  ========================================================= */

  function populateContent() {

    $('cardName').textContent =
      C.displayName;

    $('cardHeading').textContent =
      C.openingHeading;

    $('cardSub').textContent =
      C.openingSubline;


    $('letterGreeting').textContent =
      C.letterGreeting;

    $('letterBody').textContent =
      C.letterBody;

    $('letterSignoff').textContent =
      C.letterSignoff;


    $('annivHeading').textContent =
      C.anniversaryHeading;

    $('annivSub').textContent =
      C.anniversarySubline;

    $('annivQuote').textContent =
      C.oneYearMessage;

    $('annivMoment').textContent =
      C.oneMoment;


    if (Array.isArray(C.story)) {

      C.story.forEach((s) => {

        const d =
          document.createElement('div');

        d.className =
          'story-block';

        d.innerHTML = `
          <div class="story-block-label">
            ${s.label}
          </div>

          <div class="story-block-text">
            ${s.text}
          </div>
        `;

        $('storyBlocks').appendChild(d);
      });
    }


    if (Array.isArray(C.memories)) {

      C.memories.forEach((m) => {

        const d =
          document.createElement('div');

        d.className =
          'memory-card';

        d.innerHTML = `
          <div class="memory-date">
            ${m.date}
          </div>

          <div class="memory-text">
            ${m.caption}
          </div>
        `;

        $('memoryCards').appendChild(d);
      });
    }


    $('vinylTitle').textContent =
      C.songTitle || '';

    $('vinylArtist').textContent =
      C.songArtist || '';


    $('syEyebrow').textContent =
      'year two';

    $('syHeading').textContent =
      C.secondYearHeading;

    $('syBody').textContent =
      C.secondYearMessage;


    $('finalTitleLabel').textContent =
      C.finalTitle;

    $('finalHeading').textContent =
      C.finalHeading;

    $('finalSub').textContent =
      C.finalSubline;

    $('finalMessage').textContent =
      C.finalMessage;

    $('finalSignoff').textContent =
      C.finalSignoff;

    $('hiddenInner').textContent =
      C.hiddenMessage;


    const fImg = $('finalPhoto');
    const fPh = $('finalPhotoPlaceholder');


    if (fImg && fPh) {

      fImg.src =
        C.finalPhoto;


      fImg.onload = () => {

        fPh.style.display =
          'none';

        fImg.style.display =
          'block';
      };


      fImg.onerror = () => {

        fImg.style.display =
          'none';

        fPh.style.display =
          'flex';
      };
    }
  }


  /* =========================================================
     CALENDAR
  ========================================================= */

  function buildCalendar() {

    const grid =
      $('calGrid');

    if (!grid) {
      return;
    }


    [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ].forEach((d) => {

      const el =
        document.createElement('div');

      el.className =
        'cal-day-header';

      el.textContent =
        d;

      grid.appendChild(el);
    });


    /*
     * September 2026 starts on Tuesday,
     * so there are two empty spaces before 1.
     */
    for (let i = 0; i < 2; i++) {

      const el =
        document.createElement('div');

      el.className =
        'cal-day empty';

      grid.appendChild(el);
    }


    for (let d = 1; d <= 30; d++) {

      const el =
        document.createElement('div');


      if (d === 22) {

        el.className =
          'cal-day heart';

        el.textContent =
          '♥';

        el.setAttribute(
          'aria-label',
          'September 22 — our special day ♡'
        );

      } else {

        el.className =
          'cal-day';

        el.textContent =
          d;
      }


      grid.appendChild(el);
    }
  }


  /* =========================================================
     SCRAPBOOK
  ========================================================= */

  function buildScrapbook() {

    const grid =
      $('polaroidGrid');

    if (!grid) {
      return;
    }


    if (grid.children.length > 0) {
      return;
    }


    if (!Array.isArray(C.photos)) {
      return;
    }


    C.photos.forEach((photo) => {

      const wrap =
        document.createElement('div');

      wrap.className =
        'polaroid';


      const img =
        new Image();

      img.className =
        'polaroid-photo';

      img.alt =
        photo.caption || '♡';


      const ph =
        document.createElement('div');

      ph.className =
        'polaroid-photo-placeholder';

      ph.innerHTML =
        '<span>♡</span>';


      wrap.appendChild(ph);


      img.onload = function () {
        ph.replaceWith(img);
      };


      img.onerror = function () {};


      img.src =
        photo.src;


      const cap =
        document.createElement('div');

      cap.className =
        'polaroid-caption';

      cap.textContent =
        photo.caption || '♡';


      wrap.appendChild(cap);

      grid.appendChild(wrap);
    });
  }


  /* =========================================================
     MAIN SONG
  ========================================================= */

  let mainSong = null;


  function setupMusic() {

    const record =
      $('vinylRecord');

    const arm =
      $('vinylArm');

    const audio =
      $('audioPlayer');

    const btn =
      $('btnPlay');

    const label =
      $('playLabel');

    const icon =
      $('playIcon');

    const hint =
      $('musicHint');


    if (!audio || !btn) {

      console.warn(
        'Music elements not found in index.html.'
      );

      return;
    }


    mainSong =
      audio;


    if (C.songEnabled === false) {

      if (hint) {
        hint.textContent =
          'song coming soon ♡';
      }

      btn.disabled =
        true;

      btn.style.opacity =
        '.5';

      btn.style.cursor =
        'not-allowed';

      return;
    }


    /*
     * MAIN SONG
     */
    audio.src =
      C.songPath ||
      'assets/song.mp3';


    /*
     * Main song is NOT looped.
     * Only background.mp3 loops.
     */
    audio.loop =
      false;


    audio.preload =
      'auto';


    /* =====================================================
       PLAY / PAUSE BUTTON
    ===================================================== */

    btn.addEventListener('click', () => {


      if (audio.paused) {

        /*
         * VERY IMPORTANT:
         *
         * Pause background.mp3 BEFORE
         * starting song.mp3.
         */
        pauseBackgroundMusic();


        audio.play()
          .catch(() => {

            if (hint) {

              hint.textContent =
                'Could not play audio — check assets/song.mp3';
            }


            /*
             * If song.mp3 failed,
             * restore background music.
             */
            startBackgroundMusic();
          });


      } else {

        /*
         * Pause song.mp3.
         *
         * The "pause" event below will
         * automatically restart background.mp3.
         */
        audio.pause();
      }
    });


    /* =====================================================
       SONG STARTED
    ===================================================== */

    audio.addEventListener('play', () => {

      /*
       * ALWAYS pause background music
       * when song.mp3 starts.
       */
      pauseBackgroundMusic();


      if (record) {
        record.classList.add('spinning');
      }


      if (arm) {
        arm.classList.add('playing');
      }


      if (icon) {
        icon.textContent =
          '⏸';
      }


      if (label) {
        label.textContent =
          'Pause';
      }
    });


    /* =====================================================
       SONG PAUSED
    ===================================================== */

    audio.addEventListener('pause', () => {

      if (record) {
        record.classList.remove('spinning');
      }


      if (arm) {
        arm.classList.remove('playing');
      }


      if (icon) {
        icon.textContent =
          '▶';
      }


      if (label) {
        label.textContent =
          'Play song';
      }


      /*
       * Resume background music.
       *
       * We only do this if it had previously
       * been started from the envelope.
       */
      if (backgroundMusicStarted) {
        startBackgroundMusic();
      }
    });


    /* =====================================================
       SONG FINISHED
    ===================================================== */

    audio.addEventListener('ended', () => {

      if (record) {
        record.classList.remove('spinning');
      }


      if (arm) {
        arm.classList.remove('playing');
      }


      if (icon) {
        icon.textContent =
          '▶';
      }


      if (label) {
        label.textContent =
          'Play song';
      }


      /*
       * song.mp3 finished.
       *
       * Resume background.mp3.
       */
      startBackgroundMusic();
    });
  }


  /* =========================================================
     FINAL SCREEN
  ========================================================= */

  let finalAnimated = false;


  function animateFinal() {

    if (finalAnimated) {
      return;
    }


    finalAnimated = true;


    const els = [
      $('finalTitleLabel'),
      $('finalHeading'),
      $('finalSub'),
      $('finalMessage'),
      $('finalSignoff')
    ];


    els.forEach((el, i) => {

      if (!el) {
        return;
      }


      el.style.opacity =
        '0';

      el.style.transform =
        'translateY(18px)';


      setTimeout(() => {

        el.style.transition =
          'opacity .75s ease, transform .75s ease';

        el.style.opacity =
          '1';

        el.style.transform =
          'translateY(0)';

      }, 350 + i * 230);
    });
  }


  /* =========================================================
     EASTER EGG
  ========================================================= */

  function setupEasterEgg() {

    const trigger =
      $('hiddenTrigger');

    const reveal =
      $('hiddenReveal');


    if (!trigger || !reveal) {
      return;
    }


    let clicks = 0;


    trigger.addEventListener('click', () => {

      clicks++;


      if (clicks >= 3) {

        spawnHearts(16);

        reveal.classList.add('show');

        clicks = 0;
      }
    });


    reveal.addEventListener('click', () => {

      reveal.classList.remove('show');
    });
  }


  /* =========================================================
     RESTART
  ========================================================= */

  function restart() {

    /*
     * Stop main song.
     */
    if (mainSong) {

      mainSong.pause();

      mainSong.currentTime =
        0;
    }


    /*
     * Completely reset background music.
     */
    stopBackgroundMusic();


    /*
     * Reset candles.
     */
    document
      .querySelectorAll('.candle')
      .forEach((c) => {

        c.classList.remove('blown');
      });


    const blowBtn =
      $('btnBlow');

    const cakeWish =
      $('cakeWish');


    if (blowBtn) {
      blowBtn.style.display =
        '';
    }


    if (cakeWish) {
      cakeWish.style.display =
        'none';
    }


    envelopeOpened =
      false;


    const envelope =
      $('envelope');


    if (envelope) {
      envelope.classList.remove('open');
    }


    const hint =
      $('tapHint');


    if (hint) {
      hint.style.opacity =
        '1';
    }


    const vinyl =
      $('vinylRecord');

    const arm =
      $('vinylArm');

    const icon =
      $('playIcon');

    const label =
      $('playLabel');


    if (vinyl) {
      vinyl.classList.remove('spinning');
    }


    if (arm) {
      arm.classList.remove('playing');
    }


    if (icon) {
      icon.textContent =
        '▶';
    }


    if (label) {
      label.textContent =
        'Play song';
    }


    finalAnimated =
      false;


    document
      .querySelectorAll('.modal-overlay')
      .forEach((m) => {

        m.classList.remove('open');
      });


    setTimeout(() => {

      showScreen(
        'screen-envelope'
      );

    }, 50);
  }


  /* =========================================================
     EVENT LISTENERS
  ========================================================= */

  function wireListeners() {


    /* Envelope */

    const envSeal =
      $('envSeal');

    const envelope =
      $('envelope');


    if (envSeal) {

      envSeal.addEventListener(
        'click',
        openEnvelope
      );
    }


    if (envelope) {

      envelope.addEventListener(
        'click',
        openEnvelope
      );
    }


    /* Gifts */

    const giftsGrid =
      $('giftsGrid');


    if (giftsGrid) {

      giftsGrid.addEventListener(
        'click',
        (e) => {

          const btn =
            e.target.closest('[data-gift]');


          if (!btn) {
            return;
          }


          switch (btn.dataset.gift) {

            case 'letter':
              openModal('modalLetter');
              break;

            case 'flower':
              openModal('modalFlower');
              break;

            case 'cake':
              openModal('modalCake');
              break;

            case 'anniversary':
              openModal('modalAnniversary');
              break;

            case 'calendar':
              openModal('modalCalendar');
              break;
          }
        }
      );
    }


    /* Modal close buttons */

    document
      .querySelectorAll('.modal-close')
      .forEach((btn) => {

        btn.addEventListener(
          'click',
          () => {

            closeModal(
              btn.dataset.modal
            );
          }
        );
      });


    /* Close modal by clicking outside */

    document
      .querySelectorAll('.modal-overlay')
      .forEach((overlay) => {

        overlay.addEventListener(
          'click',
          (e) => {

            if (e.target === overlay) {

              closeModal(
                overlay.id
              );
            }
          }
        );
      });


    /* Cake */

    const btnBlow =
      $('btnBlow');


    if (btnBlow) {

      btnBlow.addEventListener(
        'click',
        () => {

          document
            .querySelectorAll('.candle')
            .forEach((c) => {

              c.classList.add('blown');
            });


          btnBlow.style.display =
            'none';


          const cakeWish =
            $('cakeWish');


          if (cakeWish) {

            cakeWish.style.display =
              'block';
          }


          spawnHearts(12);
        }
      );
    }


    /* Continue 1 */

    const btnContinue =
      $('btnContinue');


    if (btnContinue) {

      btnContinue.addEventListener(
        'click',
        () => {

          buildScrapbook();

          transitionTo(
            'screen-scrapbook'
          );
        }
      );
    }


    /* Continue 2 */

    const btnContinue2 =
      $('btnContinue2');


    if (btnContinue2) {

      btnContinue2.addEventListener(
        'click',
        () => {

          transitionTo(
            'screen-music'
          );
        }
      );
    }


    /* Continue 3 */

    const btnContinue3 =
      $('btnContinue3');


    if (btnContinue3) {

      btnContinue3.addEventListener(
        'click',
        () => {

          transitionTo(
            'screen-secondyear'
          );
        }
      );
    }


    /* Continue 4 */

    const btnContinue4 =
      $('btnContinue4');


    if (btnContinue4) {

      btnContinue4.addEventListener(
        'click',
        () => {

          animateFinal();

          transitionTo(
            'screen-final'
          );
        }
      );
    }


    /* Restart */

    const btnRestart =
      $('btnRestart');


    if (btnRestart) {

      btnRestart.addEventListener(
        'click',
        restart
      );
    }


    setupEasterEgg();
  }


  /* =========================================================
     INITIALIZE
  ========================================================= */

  function init() {

    populateContent();

    buildCalendar();

    /*
     * Create background music object.
     */
    setupBackgroundMusic();

    /*
     * Create main song player.
     */
    setupMusic();

    wireListeners();

    startAmbientHearts();

    showScreen(
      'screen-envelope'
    );
  }


  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      init
    );

  } else {

    init();
  }

})();