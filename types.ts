export type Category = 'legend' | 'sensual' | 'remix' | 'others' | 'all';

export interface Song {
  title: string;
  artist: string;
  category: string;
  year: number;
}
