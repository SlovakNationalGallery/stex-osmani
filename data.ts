export type ArtworkItemType = {
  id: string;
  title: string;
  subtitle: string;
  thumbnailSrc?: string;
  deepZoomSrc?: string;
};

export const AUDIO: Array<String> = {
  sk: [
    "step_0/SNG_SK_Pohreb_SHWR_01.mp3",
    "step_1/SNG_SK_Pohreb_SHWR_02.mp3",
    "step_2/SNG_SK_Pohreb_SHWR_03.mp3",
    "step_3/SNG_SK_Pohreb_SHWR_04.mp3",
    "step_4/SNG_SK_Pohreb_SHWR_05.mp3",
    "step_5/SNG_SK_Pohreb_SHWR_06.mp3",
    "step_6/SNG_SK_Pohreb_SHWR_07.mp3",
  ],
  en: [
    "step_0/SNG_EN_Pohreb_SHWR_01.mp3",
    "step_1/SNG_EN_Pohreb_SHWR_02.mp3",
    "step_2/SNG_EN_Pohreb_SHWR_03.mp3",
    "step_3/SNG_EN_Pohreb_SHWR_04.mp3",
    "step_4/SNG_EN_Pohreb_SHWR_05.mp3",
    "step_5/SNG_EN_Pohreb_SHWR_06.mp3",
    "step_6/SNG_EN_Pohreb_SHWR_07.mp3",
  ],
};

export const SIMILAR_ARTWORKS: Array<Array<ArtworkItemType>> = [
  [],
  [
    {
      id: "step-1/0",
      title: "Portrét Ladislava Esterházyho",
      subtitle: "1649",
      thumbnailSrc: "step_1/0_thumb.jpg",
    },
    {
      id: "step-1/1",
      title: "Portrét Mikuláša Esterházyho",
      subtitle: "1645",
      thumbnailSrc: "step_1/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-2/0",
      title: "Posmrtná podobizeň L. Esterházyho",
      subtitle: "1652",
      deepZoomSrc: "step_2/0_zoom_dzi.dzi",
      thumbnailSrc: "step_2/0_thumb.jpg",
    },
    {
      id: "step-2/1",
      title: "Košeľa Ladislava Esterházyho",
      subtitle: "17. storočie",
      thumbnailSrc: "step_2/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-3/0",
      title: "Pohrebný sprievod štyroch padlých Esterházyovcov",
      subtitle: "1653",
      deepZoomSrc: "step_3/0_zoom_dzi.dzi",
      thumbnailSrc: "step_3/0_thumb.jpg",
    },
  ],
  [
    {
      id: "step-4/0",
      title: "Castrum doloris pri pohrebe Esterházyovcov",
      subtitle: "1653",
      deepZoomSrc: "step_4/0_zoom_dzi.dzi",
      thumbnailSrc: "step_4/0_thumb.jpg",
    },
    {
      id: "step-4/1",
      title: "Posmrtná zástava Ladislava Esterházyho s erbom",
      subtitle: "1652",
      deepZoomSrc: "step_4/1_zoom_dzi.dzi",
      thumbnailSrc: "step_4/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-5/0",
      title: "Gróf Adam Forgáč",
      subtitle: "po 1630",
      deepZoomSrc: "step_5/0_zoom_dzi.dzi",
      thumbnailSrc: "step_5/0_thumb.jpg",
    },
    {
      id: "step-5/1",
      title: "Bitka pri Veľkých Vozokanoch",
      subtitle: "po 1651",
      deepZoomSrc: "step_5/1_zoom_dzi.dzi",
      thumbnailSrc: "step_5/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-6/0",
      title: "Fasáda trnavského kostola sv. Jána Krstiteľa",
      subtitle: "1694",
      deepZoomSrc: "step_6/0_zoom_dzi.dzi",
      thumbnailSrc: "step_6/0_thumb.jpg",
    },
    {
      id: "step-6/1",
      title: "Veduta Trnavy",
      subtitle: "po 1740",
      deepZoomSrc: "step_6/1_zoom_dzi.dzi",
      thumbnailSrc: "step_6/1_thumb.jpg",
    },
  ],
];
