const mapStyle = [

  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#1f2937',
      },
    ],
  },

  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f9fafb',
      },
    ],
  },

  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#111827',
      },
    ],
  },

  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#374151',
      },
    ],
  },

  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2563eb',
      },
    ],
  },

  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0f172a',
      },
    ],
  },

  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },

  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default mapStyle;