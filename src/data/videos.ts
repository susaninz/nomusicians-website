// Данные о видео
// Будут импортироваться из Sanity позже

export interface Video {
  title: string;
  url: string;
  thumbnail: string;
}

export const videos: Video[] = [
  { 
    title: 'Marcia Moderato (Live)', 
    url: 'https://www.youtube.com/watch?v=PzFOKI7Ezl0',
    thumbnail: 'https://img.youtube.com/vi/PzFOKI7Ezl0/maxresdefault.jpg',
  },
  { 
    title: 'Besedka Live', 
    url: 'https://www.youtube.com/watch?v=MkBzeE7Wye4',
    thumbnail: 'https://img.youtube.com/vi/MkBzeE7Wye4/maxresdefault.jpg',
  },
  { 
    title: 'Fast No Fast / Blanc', 
    url: 'https://www.youtube.com/watch?v=Tt64lxUyiPw',
    thumbnail: 'https://img.youtube.com/vi/Tt64lxUyiPw/maxresdefault.jpg',
  },
  { 
    title: 'MiR / Lampu, Bali', 
    url: 'https://www.youtube.com/watch?v=D0fvoGoUxxI',
    thumbnail: 'https://img.youtube.com/vi/D0fvoGoUxxI/maxresdefault.jpg',
  },
];

export const youtubeChannelUrl = 'https://www.youtube.com/@nomusicians';

