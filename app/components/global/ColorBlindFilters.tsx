'use client';

const ColorBlindFilters = () => (
  <svg style={{ position: 'absolute', height: 0, width: 0 }}>
    <defs>        
      <filter id="protanopia">
        <feColorMatrix
          type="matrix"
          values="0.567, 0.433, 0, 0, 0
                  0.558, 0.442, 0, 0, 0
                  0, 0.242, 0.758, 0, 0
                  0, 0, 0, 1, 0" />
      </filter>
      <filter id="protanomalia">
        <feColorMatrix
          type="matrix"
          values="0.46667 0.53333 0 0 0
                  0.04 0.96 0 0 0
                  0 0.24 0.76 0 0
                  0 0 0 1 0" />
      </filter>
      <filter id="deuteranopia">
        <feColorMatrix
          type="matrix"
          values="0.625, 0.375, 0, 0, 0
                  0.7, 0.3, 0, 0, 0
                  0, 0.3, 0.7, 0, 0
                  0, 0, 0, 1, 0" />
      </filter>
      <filter id="deuteranomalia">
        <feColorMatrix
          type="matrix"
          values="0.57 0.43 0 0 0
                  0.19 0.81 0 0 0
                  0 0.24 0.76 0 0
                  0 0 0 1 0" />
      </filter>
      <filter id="tritanopia">
        <feColorMatrix
          type="matrix"
          values="0.95, 0.05, 0, 0, 0
                  0, 0.433, 0.567, 0, 0
                  0, 0.475, 0.525, 0, 0
                  0, 0, 0, 1, 0" />
      </filter>
      <filter id="tritanomalia">
        <feColorMatrix
          type="matrix"
          values="0.89 0.11 0 0 0
                  0 0.84 0.16 0 0
                  0 0.32 0.68 0 0
                  0 0 0 1 0" />
      </filter>
      <filter id="acromatopsia">
        <feColorMatrix
          type="matrix"
          values="0.299, 0.587, 0.114, 0, 0
                  0.299, 0.587, 0.114, 0, 0
                  0.299, 0.587, 0.114, 0, 0
                  0, 0, 0, 1, 0" />
      </filter>
    </defs>
  </svg>
);

export default ColorBlindFilters;
