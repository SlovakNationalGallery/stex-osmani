export const TOURS = {
  1: {
    thumbnailSrc: "/assets/tour_1/intro_funeral.jpg",
    micrioId: "yGpXd",
    sk: {
      title: "Esterházyovský štvorpohreb v Trnave",
      desc_title: "Kto si prišiel uctiť padlých Esterházyovcov?",
      desc_subtitle: "Spoznaj detaily historickej udalosti v interaktívnom audiopríbehu"
    },
    en: {
      title: "Funeral procession of the four Esterházys in Trnava",
      desc_title: "Who came to honour the fallen Esterházys?",
      desc_subtitle: "Discover the details of the historical event in an interactive audio story"
    },
  },
  2: {
    title: "Sultán v Benátkach",
    thumbnailSrc: "/assets/tour_2/intro_sultan.jpg",
    micrioId: "AhDVK",
    sk: { title: "Sultán v Benátkach",
      desc_title: "Navštívil skutočne sultán Benátky?",
      desc_subtitle: "Spoznaj námet obrazu v interaktívnom audiopríbehu"
     },
    en: {
      title: "Sultan in Venice",
      desc_title: "Did the Sultan really visit Venice?",
      desc_subtitle: "Discover the theme of the painting in an interactive audio story"
    },
  },
};

export const AUDIO = {
  1: {
    sk: [
      "tour_1/step_0/SNG_SK_Pohreb_SHWR_01.mp3",
      "tour_1/step_1/SNG_SK_Pohreb_SHWR_02.mp3",
      "tour_1/step_2/SNG_SK_Pohreb_SHWR_03.mp3",
      "tour_1/step_3/SNG_SK_Pohreb_SHWR_04.mp3",
      "tour_1/step_4/SNG_SK_Pohreb_SHWR_05.mp3",
      "tour_1/step_5/SNG_SK_Pohreb_SHWR_06.mp3",
      "tour_1/step_6/SNG_SK_Pohreb_SHWR_07.mp3",
    ],
    en: [
      "tour_1/step_0/SNG_EN_Pohreb_SHWR_01.mp3",
      "tour_1/step_1/SNG_EN_Pohreb_SHWR_02.mp3",
      "tour_1/step_2/SNG_EN_Pohreb_SHWR_03.mp3",
      "tour_1/step_3/SNG_EN_Pohreb_SHWR_04.mp3",
      "tour_1/step_4/SNG_EN_Pohreb_SHWR_05.mp3",
      "tour_1/step_5/SNG_EN_Pohreb_SHWR_06.mp3",
      "tour_1/step_6/SNG_EN_Pohreb_SHWR_07.mp3",
    ],
  },
  2: {
    sk: [
      "tour_2/step_0/SNG_SK_Sultan_SHWR_01.mp3",
      "tour_2/step_1/SNG_SK_Sultan_SHWR_02.mp3",
      "tour_2/step_2/SNG_SK_Sultan_SHWR_03.mp3",
      "tour_2/step_3/SNG_SK_Sultan_SHWR_04.mp3",
      "tour_2/step_4/SNG_SK_Sultan_SHWR_05.mp3",
      "tour_2/step_5/SNG_SK_Sultan_SHWR_06.mp3",
      "tour_2/step_6/SNG_SK_Sultan_SHWR_07.mp3",
    ],
    en: [
      "tour_2/step_0/SNG_EN_Sultan_SHWR_01.mp3",
      "tour_2/step_1/SNG_EN_Sultan_SHWR_02.mp3",
      "tour_2/step_2/SNG_EN_Sultan_SHWR_03.mp3",
      "tour_2/step_3/SNG_EN_Sultan_SHWR_04.mp3",
      "tour_2/step_4/SNG_EN_Sultan_SHWR_05.mp3",
      "tour_2/step_5/SNG_EN_Sultan_SHWR_06.mp3",
      "tour_2/step_6/SNG_EN_Sultan_SHWR_07.mp3",
    ],
  },
};

export const SIMILAR_ARTWORKS: {
  [key: string]: Array<Array<any>>;
} = {
  1: [
    [],
    [
      {
        id: "esterhazy/step-1/0",
        thumbnailSrc: "tour_1/step_1/0_thumb.jpg",
        sk: {
          title: "Portrét Ladislava Esterházyho",
          subtitle: "1649",
        },
        en: {
          title: "Portrait of Ladislaus Esterházy",
          subtitle: "1649",
        }
      },
      {
        id: "esterhazy/step-1/1",
        sk: {
          title: "Portrét Mikuláša Esterházyho",
          subtitle: "1645",
        },
        en: {
          title: "Portrait of Nikolaus Esterházy",
          subtitle: "1645",
        },
        thumbnailSrc: "tour_1/step_1/1_thumb.jpg",
      },
    ],
    [
      {
        id: "esterhazy/step-2/0",
        sk: {
          title: "Posmrtná podobizeň L. Esterházyho",
          subtitle: "1652",
        },
        en: {
          title: "Death portrait of L. Esterházy",
          subtitle: "1652",
        },
        deepZoomSrc: "tour_1/step_2/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_2/0_thumb.jpg",
      },
      {
        id: "esterhazy/step-2/1",
        sk: {
          title: "Košeľa Ladislava Esterházyho",
          subtitle: "17. storočie",
        },
        en: {
          title: "Coat armour of Ladislaus Esterházy",
          subtitle: "17th century",
        },
        thumbnailSrc: "tour_1/step_2/1_thumb.jpg",
      },
    ],
    [
      {
        id: "esterhazy/step-3/0",
        sk: {
          title: "Pohrebný sprievod štyroch padlých Esterházyovcov",
          subtitle: "1653",
        },
        en: {
          title: "Funeral procession of the four Esterházys",
          subtitle: "1653",
        },
        deepZoomSrc: "tour_1/step_3/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_3/0_thumb.jpg",
      },
    ],
    [
      {
        id: "esterhazy/step-4/0",
        sk: {
          title: "Castrum doloris pri pohrebe Esterházyovcov",
          subtitle: "1653",
        },
        en: {
          title: "Castrum doloris at the funeral of the Esterházys",
          subtitle: "1653",
        },
        deepZoomSrc: "tour_1/step_4/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_4/0_thumb.jpg",
      },
      {
        id: "esterhazy/step-4/1",
        sk: {
          title: "Pohrebná zástava Ladislava Esterházyho s erbom",
          subtitle: "1652",  
        },
        en: {
          title: "The funeral banner of Count Ladislaus Esterházy",
          subtitle: "1652",  
        },
        deepZoomSrc: "tour_1/step_4/1_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_4/1_thumb.jpg",
      },
    ],
    [
      {
        id: "esterhazy/step-5/0",
        sk: {
          title: "Gróf Adam Forgáč",
          subtitle: "po 1630",  
        },
        en: {
          title: "Count Ádám Forgách",
          subtitle: "after 1630",  
        },
        deepZoomSrc: "tour_1/step_5/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_5/0_thumb.jpg",
      },
      {
        id: "esterhazy/step-5/1",
        sk: {
          title: "Bitka pri Veľkých Vozokanoch",
          subtitle: "po 1651",  
        },
        en: {
          title: "The Battle of Vezekény",
          subtitle: "after 1651",  
        },
        deepZoomSrc: "tour_1/step_5/1_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_5/1_thumb.jpg",
      },
    ],
    [
      {
        id: "esterhazy/step-6/0",
        sk: {
          title: "Fasáda trnavského kostola sv. Jána Krstiteľa",
          subtitle: "1694",  
        },
        en: {
          title: "Facade of the Church of St. John the Baptist",
          subtitle: "1694",  
        },
        deepZoomSrc: "tour_1/step_6/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_6/0_thumb.jpg",
      },
      {
        id: "esterhazy/step-6/1",
        sk: {
          title: "Veduta Trnavy",
          subtitle: "po 1740",  
        },
        en: {
          title: "View of Trnava",
          subtitle: "after 1740",  
        },
        deepZoomSrc: "tour_1/step_6/1_zoom_dzi.dzi",
        thumbnailSrc: "tour_1/step_6/1_thumb.jpg",
      },
    ],
  ],
  2: [
    [],
    [
      {
        id: "sultan/step-1/0",
        thumbnailSrc: "tour_2/step_1/0_thumb.jpg",
        deepZoomSrc: "tour_2/step_1/0_zoom_dzi.dzi",
        sk: {
          title: "Janičiar s čiapkou börk",
          subtitle: "1568"
        },
        en: {
          title: "Janissary with the börk cap",
          subtitle: "1568"
        }
      },
    ],
    [
      {
        id: "sultan/step-2/0",
        sk: {
          title: "Veliteľ janičiarov Aga",
          subtitle: "1568",
        },
        en: {
          title: "Janissary captain Aga",
          subtitle: "1568",
        },
        deepZoomSrc: "tour_2/step_2/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_2/step_2/0_thumb.jpg",
      },
      {
        id: "sultan/step-2/1",
        sk: {
          title: "Osmanská dáma zo sultánovho dvora",
          subtitle: "1568",
        },
        en: {
          title: "The Ottoman Lady of the Sultan's Court",
          subtitle: "1568",
        },
        deepZoomSrc: "tour_2/step_2/1_zoom_dzi.dzi",
        thumbnailSrc: "tour_2/step_2/1_thumb.jpg",
      },
    ],
    [
      {
        id: "sultan/step-3/0",
        sk: {
          title: "Jazdec v osmanskej jednotke deli",
          subtitle: "1568",
        },
        en: {
          title: "Horseman in the Ottoman 'deli' unit",
          subtitle: "1568",
        },
        thumbnailSrc: "tour_2/step_3/0_thumb.jpg",
      },
    ],
    [
      {
        id: "sultan/step-4/0",
        sk: {
          title: "Potulný pútnik z vymysleného rádu Geomalier",
          subtitle: "1568",
        },
        en: {
          title: "Pilgrim from the fictional order of Geomaliers",
          subtitle: "1568",
        },
        deepZoomSrc: "tour_2/step_4/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_2/step_4/0_thumb.jpg",
      },
    ],
    [
      {
        id: "sultan/step-5/0",
        sk: {
          title: "Šítsky derviš",
          subtitle: "1568",
        },
        en: {
          title: "Shiite dervish",
          subtitle: "1568",
        },
        deepZoomSrc: "tour_2/step_5/0_zoom_dzi.dzi",
        thumbnailSrc: "tour_2/step_5/0_thumb.jpg",
      },
    ],
    [],
  ],
};
