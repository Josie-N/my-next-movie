/*  H3  */
enum Generic {
  'Sorry. Something went wrong.',
  'Much wow, such empty!',
}

enum MoviesPage {
  'Added',
  'Already seen',

  'Removed',
  'Settings',
  'Account',
}

export enum Imprint {
  'Contact',
}

/*  H2  */
enum H2 {
  'Legal disclaimer',
  'My watchlist:',
  'truetaleof.com is brought to you by:',
  'Browse all movies available:',
  'Your added watchlist:',
}

/*  H1  */
enum H1 {
  'Legal Notice',
  'The tale of, a movie search database',
  '404 Page not found'
}

/* Contains hardcoded/static headings present in the app */
export const Headings = {
  H1,
  H2,
  H3: {
    Imprint,
    MoviesPage,
    Generic
  }
};
