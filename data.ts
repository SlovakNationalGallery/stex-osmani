export type ArtworkItemType = {
  id: string;
  title: string;
  subtitle: string;
  thumbnailSrc?: string;
  deepZoomSrc?: string;
};

export const SIMILAR_ARTWORKS: Array<Array<ArtworkItemType>> = [
  [],
  [
    {
      id: "step-1/0",
      title: "Ahoj",
      subtitle: "Podtitul",
      thumbnailSrc: "step_1/0_thumb.jpg",
    },
    {
      id: "step-1/1",
      title: "Ahoj",
      subtitle: "Podtitul",
      thumbnailSrc: "step_1/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-2/0",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_2/0_zoom_dzi.dzi",
      thumbnailSrc: "step_2/0_thumb.jpg",
    },
    {
      id: "step-2/1",
      title: "Ahoj",
      subtitle: "Podtitul",
      thumbnailSrc: "step_2/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-3/0",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_3/0_zoom_dzi.dzi",
      thumbnailSrc: "step_3/0_thumb.jpg",
    },
  ],
  [
    {
      id: "step-4/0",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_4/0_zoom_dzi.dzi",
      thumbnailSrc: "step_4/0_thumb.jpg",
    },
    {
      id: "step-4/1",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_4/1_zoom_dzi.dzi",
      thumbnailSrc: "step_4/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-5/0",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_5/0_zoom_dzi.dzi",
      thumbnailSrc: "step_5/0_thumb.jpg",
    },
    {
      id: "step-5/1",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_5/1_zoom_dzi.dzi",
      thumbnailSrc: "step_5/1_thumb.jpg",
    },
  ],
  [
    {
      id: "step-6/0",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_6/0_zoom_dzi.dzi",
      thumbnailSrc: "step_6/0_thumb.jpg",
    },
    {
      id: "step-6/1",
      title: "Ahoj",
      subtitle: "Podtitul",
      deepZoomSrc: "step_6/1_zoom_dzi.dzi",
      thumbnailSrc: "step_6/1_thumb.jpg",
    },
  ],
];
