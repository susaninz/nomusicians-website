// Данные о релизах
// Будут импортироваться из Sanity позже

export interface Release {
  title: string;
  year: string;
  cover: string;
  soundcloud: string;
  artist?: string;
  label?: string;
}

export interface Releases {
  live: Release[];
  studio: Release[];
  collabs: Release[];
}

export const releases: Releases = {
  live: [
    {
      title: "Live at Ogonek '23",
      year: '2023',
      cover: '/releases/ogonek-23.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/live-set-on-ogonek-23-burning-time-thursday',
    },
    {
      title: "Jam Loft '23",
      year: '2023',
      cover: '/releases/jam-loft-23.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/sets/jam-loft',
    },
    {
      title: "Qatar '22",
      year: '2022',
      cover: '/releases/qatar-22.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/meanwhile-at-heenat-salma-featdmitry-skvortsov',
    },
    {
      title: "Boring Room '20",
      year: '2020',
      cover: '/releases/boring-room-20.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/sets/boring-room-live-stream-20',
    },
    {
      title: "Blanc '19",
      year: '2019',
      cover: '/releases/blanc-19.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/mammoth-firs-live',
    },
  ],
  studio: [
    {
      title: 'Noch 3.0',
      year: '2023',
      cover: '/releases/noch-3.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/noch-3',
    },
    {
      title: 'Paraphonic',
      year: '2025',
      cover: '/releases/paraphonic.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/ajh-pads',
    },
    {
      title: '5pulse',
      year: '2024',
      cover: '/releases/5pulse.jpg',
      soundcloud: 'https://soundcloud.com/nomusicians/5pulse',
    },
  ],
  collabs: [
    {
      title: 'That Wedding',
      year: '2022',
      cover: '/releases/that-wedding.jpg',
      soundcloud: 'https://soundcloud.com/itsgoodtobeatree/sets/dima-ustinov-nomusicians-that-wedding',
      artist: 'w/ Dima Ustinov',
      label: 'ItsGoodToBeATree',
    },
  ],
};


