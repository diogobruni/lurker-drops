export const en = {
  locale: 'en',
  htmlLang: 'en',
  path: '/',
  label: 'EN',
  skip: 'Skip to content',
  meta: {
    title: 'Lurker Drops — Your Twitch tabs, watching on their own',
    description:
      'A free browser extension that keeps your Twitch tabs watching a matching live. Works on Chrome, Edge, Opera, Brave, and other Chromium browsers.',
    ogLocale: 'en_US',
  },
  nav: {
    features: 'Features',
    how: 'How it works',
    faq: 'Questions',
    install: 'Install',
    github: 'GitHub',
    language: 'Language',
    primary: 'Primary',
  },
  hero: {
    badge: 'Free browser extension',
    title: 'Your Twitch tabs,',
    titleAccent: 'watching on their own.',
    subtitle:
      'Choose a category and the rules you like. Lurker Drops keeps that tab on a matching live, switches when a better one shows up, and stays quiet in the background.',
    primaryCta: 'Download the extension',
    primaryNote: 'Free · No account · About a minute to set up',
    secondaryCta: 'See how it works',
    trust: ['Chrome, Edge, Opera, Brave and more', 'Runs on your computer', 'Open source', 'No sign-up'],
    imageAlt:
      'Lurker Drops popup showing two tabs lurking a Twitch live, each with its preset and viewer count.',
  },
  features: {
    eyebrow: 'What it does',
    title: 'Small helper. Big relief.',
    subtitle:
      'It is like asking a friend to keep the TV on the right channel. Except this friend never gets bored.',
    items: [
      {
        title: 'Pick the show',
        text: 'Choose a category, like a game or Just Chatting. Add a word the title must have, or words you never want to see.',
      },
      {
        title: 'One preset per tab',
        text: 'Cozy streams in one tab, your favorite game in another. Each tab remembers its own rules, favorites, and blacklist.',
      },
      {
        title: 'Finds a live for you',
        text: 'Every minute it looks again. If a bigger stream fits your rules, the tab moves there. Turn Pursue off to stay on your favorites.',
      },
      {
        title: 'Quiet watching',
        text: 'Mute the tab while it watches. Your speakers stay free for calls, music, or the video you are actually watching.',
      },
      {
        title: 'Chat rescue',
        text: 'If Twitch chat disconnects, the extension reconnects it. If that fails, it reloads the page, at most once every five minutes.',
      },
      {
        title: 'Bonus chests',
        text: 'When a bonus chest appears on the page, it clicks it for you. No more remembering to look.',
      },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps. Then forget about it.',
    subtitle: 'You set the rules once. The extension does the boring part, all day long.',
    steps: [
      {
        title: 'Tell it what to watch',
        text: 'Open the popup, pick a category, and add a filter if you want. Save it as a preset to reuse later.',
      },
      {
        title: 'Press On',
        text: 'The tab opens a live that matches your rules and stays there. The icon shows how many lurkers are active.',
      },
      {
        title: 'Go live your life',
        text: 'Work, study, or play. It checks again every minute and keeps the right stream playing until you turn it off.',
      },
    ],
    note: 'You can run several tabs at the same time, each with a different preset.',
  },
  install: {
    eyebrow: 'Install',
    title: 'Add it to your browser in about a minute',
    subtitle:
      'The extension is not in the browser stores yet. Install it from the official release, in four small steps.',
    steps: [
      {
        title: 'Download the ZIP',
        text: 'The button above always downloads the newest release from GitHub.',
      },
      {
        title: 'Unzip the folder',
        text: 'You get a folder named lurker-drops. Inside it there is a file called manifest.json.',
      },
      {
        title: "Open your browser's extensions page",
        text: 'For Chrome and Brave use chrome://extensions, for Edge use edge://extensions, and for Opera use opera://extensions. Turn on Developer mode, click Load unpacked, and choose the folder you just unzipped.',
      },
      {
        title: 'Pin and press On',
        text: 'Pin Lurker Drops to the toolbar, open the popup, add your first lurker, and press On.',
      },
    ],
    note: 'Works on desktop Chrome, Edge, Opera, and Brave. Developer mode is how Chromium browsers install extensions that are not in a store yet.',
    cta: 'Download the latest release',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Good to know',
    items: [
      {
        q: 'Is it really free?',
        a: 'Yes. Lurker Drops is open source. There is no account, no subscription, no ads, and nothing to unlock.',
      },
      {
        q: 'Do I need to keep the browser open?',
        a: 'Yes. The tab must stay open for Twitch to count the watch time. You can mute it, send it to the background, or move it to another window.',
      },
      {
        q: 'Will it keep changing channels?',
        a: 'Only the tab it manages. With Pursue on, it moves to a matching live with more viewers. Turn Pursue off to follow your favorites in the order you set.',
      },
      {
        q: 'Does it collect my data?',
        a: 'No analytics, no tracking, and no server. Your settings stay in browser storage on your computer. It only asks Twitch for the public list of live streams.',
      },
      {
        q: 'Does it guarantee drops or rewards?',
        a: 'No. It keeps the tab watching a live that matches your rules, but drops and rewards follow Twitch and campaign rules. Never use it to break those rules.',
      },
      {
        q: 'Which browsers work?',
        a: 'Chrome, Edge, Opera, Brave, and other Chromium-based browsers on desktop. Firefox is not supported.',
      },
    ],
  },
  finalCta: {
    title: 'Let your tabs do the waiting.',
    subtitle: 'Download once. Pick a show. Press On. That is the whole job.',
    button: 'Get Lurker Drops',
    note: 'Free and open source. No account needed.',
  },
  footer: {
    tagline: 'A small, free helper for people who watch Twitch while doing other things.',
    github: 'Source code',
    releases: 'All releases',
    disclaimer: 'Not affiliated with Twitch or Amazon. Twitch is a trademark of Twitch Interactive, Inc.',
    madeBy: 'Built by Diogo',
  },
};

export type Dictionary = typeof en;
