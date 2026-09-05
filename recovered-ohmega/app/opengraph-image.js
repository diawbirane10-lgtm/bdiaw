import { ImageResponse } from 'next/og';

export const alt = 'OHMEGA — Birane DIAW';
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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#151515',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            border: '3px solid #ffffff',
            borderRadius: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 190,
            fontFamily: 'serif',
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
