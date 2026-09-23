import { ImageResponse } from 'next/og';

export const alt = 'OHMEGA — Birane DIAW — Electrical Engineering & Intelligent Systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#101210',
          borderTop: '12px solid #0b6b47',
          fontFamily: 'serif',
          padding: '64px',
        }}
      >
        <div
          style={{
            width: '72%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 22,
              letterSpacing: 5,
              color: '#0b6b47',
            }}
          >
            OHMEGA / ENGINEERING PORTFOLIO
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 92,
                lineHeight: 0.88,
                letterSpacing: -5,
                fontWeight: 600,
              }}
            >
              Birane Idriss DIAW
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                fontSize: 30,
                color: '#4f5852',
              }}
            >
              Electrical Engineering & Intelligent Systems
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 18,
              fontSize: 19,
              color: '#2f6df6',
            }}
          >
            POWER SYSTEMS · CONTROL · AUTOMATION · DIGITAL TWINS
          </div>
        </div>
        <div
          style={{
            width: 290,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#eee9ff',
            border: '3px solid #7657ff',
            boxShadow: '18px 18px 0 #fff4c8',
            color: '#0b6b47',
            fontSize: 190,
            lineHeight: 1,
          }}
        >
          Ω
        </div>
      </div>
    ),
    size
  );
}
