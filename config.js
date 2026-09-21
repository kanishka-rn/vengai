/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           BDAY — PERSONAL CONFIGURATION FILE                ║
 * ║    Edit ONLY this file to personalize the website.          ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * HOW TO ADD YOUR SONG:
 *   1. Copy your MP3 file into the assets/ folder
 *   2. Name it song.mp3
 *   3. Keep songEnabled: true
 *   4. Refresh the browser
 *
 * IMPORTANT:
 *   The song is now used as ONE GLOBAL BACKGROUND TRACK.
 *   It starts when the envelope is opened and continues
 *   playing across the entire website.
 *
 * HOW TO ADD PHOTOS:
 *   1. Put your images in assets/photos/
 *   2. Name them photo-01.jpg … photo-08.jpg
 *      OR update the paths in the photos array below
 *   3. Refresh the browser
 */

window.CONFIG = {

  /* ── Person ─────────────────────────────────────────────── */

  fullName:    "VENGAI MARBAN",
  displayName: "VENGAI",
  nickname:    "vengu",
  petName:     "pattu",


  /* ── Dates ──────────────────────────────────────────────── */

  birthday:    "September 22, 2026",
  anniversary: "September 22, 2026",
  specialDate: "26 May",


  /* ── Opening card ───────────────────────────────────────── */

  openingHeading:
    "Happy Birthday &\nHappy 1st Anniversary!",

  openingSubline:
    "Two reasons to celebrate you.",


  /* ── Birthday letter ───────────────────────────────────── */

  letterGreeting:
    "Happy Birthday, VENGAI ♡",

  letterBody: `Happy birthday, my love! ❤️

I hope today reminds you how loved and special you are. Thank you for every laugh, every conversation and every little moment we've shared.

I love you so much. ♡`,

  letterSignoff:
    "always yours ♡",


  /* ── Anniversary / our story ───────────────────────────── */

  anniversaryHeading:
    "One year of us",

  anniversarySubline:
    "365 days, countless memories.",

  story: [

    {
      label: "How it started",
      text: "At school."
    },

    {
      label: "How we started talking",
      text: "For farewell preparation."
    },

    {
      label: "How we became us",
      text: "Best friends to lovers."
    }

  ],


  memories: [

    {
      date: "16 May",
      caption:
        "Hanging with you all around and travelling back home with you on the bus."
    },

    {
      date: "The day I proposed to you",
      caption:
        "The sweetest memory I carry with me."
    }

  ],


  /* ── Relationship identity ──────────────────────────────── */

  relationshipWords:
    "My Safe Place",


  /* ── One year with you ──────────────────────────────────── */

  oneYearMessage:
    "That I can be completely myself with you.",


  /* ── One moment I'd relive ──────────────────────────────── */

  oneMoment:
    "The first time I realized I was falling for you.",


  /* ── For our second year ────────────────────────────────── */

  secondYearHeading:
    "For our second year",

  secondYearMessage:
    "More memories, more adventures, more us. ♡",


  /* ── Final screen ───────────────────────────────────────── */

  finalHeading:
    "Happy Birthday, VENGAI ♡",

  finalSubline:
    "Happy 1st Anniversary, my love.",

  finalMessage:
    "You will never be unloved, not by me. ♡",

  finalTitle:
    "My Safe Place",

  finalSignoff:
    "— with all my love",


  /* ── Hidden Easter-egg message ──────────────────────────── */

  hiddenMessage:
    "i love u moree ♡",


  /* ══════════════════════════════════════════════════════════
     GLOBAL BACKGROUND MUSIC
  ══════════════════════════════════════════════════════════ */

  /*
   * Put your song here:
   *
   * assets/
   *   song.mp3
   *
   * The same song will play continuously throughout
   * the whole website.
   */

  songEnabled: true,

  songPath:
    "assets/song.mp3",

  songTitle:
    "something for you love  ♡",

  /* Soft background music — plays across the whole website */
  backgroundMusicEnabled: true,
  backgroundMusicPath: "assets/bgsong.mp3",
  backgroundMusicVolume: 0.20,

  /*
   * The script controls the music volume.
   * Current volume is 45%.
   *
   * You do NOT need to add an intro music file.
   * There is only one global song.
   */


  /* ── Photos ─────────────────────────────────────────────── */

  photos: [

    {
      src: "assets/photos/photo-06.jpg"
    },

    {
      src: "assets/photos/photo-02.jpg"
    },

    {
      src: "assets/photos/photo-04.jpg"
    },

    {
      src: "assets/photos/photo-03.jpg"
    },

    {
      src: "assets/photos/photo-05.jpg"
    },

    {
      src: "assets/photos/photo-10.jpeg"
    },

    {
      src: "assets/photos/photo-01.jpeg"
    },

    {
      src: "assets/photos/photo-09.jpeg"
    }

  ],


  /* ── Final photo ────────────────────────────────────────── */

  /*
   * Big hero photo on the final screen.
   */

  finalPhoto:
    "assets/photos/photo-04.jpg"

};