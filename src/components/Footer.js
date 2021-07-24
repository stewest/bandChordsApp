import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-4 z-10 bg-white dark:bg-black hidden md:block">
      <div className="text-xs">
        Band Icon made by&nbsp;
        <a
          href="https://www.flaticon.com/authors/flat-icons"
          title="Flat Icons"
        >
          Flat Icons
        </a>
        &nbsp;from&nbsp;
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        . Other icons by&nbsp;
        <a href="https://heroicons.com/" title="Heroicons">
          HeroIcons
        </a>
        .
      </div>
    </footer>
  );
}
