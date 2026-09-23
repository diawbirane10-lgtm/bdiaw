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
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff',
          color: '#101210',
          padding: '58px 64px',
          fontFamily: 'serif',
        }}
      >
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:10,display:'flex'}}>
          <span style={{flex:3,background:'#0b6b47'}} />
          <span style={{flex:1,background:'#2f6df6'}} />
          <span style={{flex:1,background:'#7657ff'}} />
          <span style={{flex:1,background:'#ff765f'}} />
          <span style={{flex:1,background:'#f3c94a'}} />
        </div>
        <div style={{display:'flex',width:'100%',height:'100%',alignItems:'stretch'}}>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'68%'}}>
            <div style={{display:'flex',alignItems:'center',gap:18,fontSize:20,letterSpacing:5}}>
              <span style={{display:'flex',width:54,height:54,border:'2px solid #0b6b47',alignItems:'center',justifyContent:'center',fontSize:38,color:'#0b6b47'}}>Ω</span>
              <span>OHMEGA / ENGINEERING PORTFOLIO</span>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
              <div style={{fontSize:86,lineHeight:.9,letterSpacing:-4,fontWeight:600}}>Birane Idriss<br/>DIAW</div>
              <div style={{marginTop:28,fontSize:28,color:'#4e5751'}}>Electrical Engineering & Intelligent Systems</div>
            </div>
            <div style={{display:'flex',gap:18,fontSize:18}}>
              <span style={{color:'#0b6b47'}}>POWER SYSTEMS</span>
              <span>×</span>
              <span style={{color:'#7657ff'}}>CONTROL</span>
              <span>×</span>
              <span style={{color:'#2f6df6'}}>AUTOMATION</span>
            </div>
          </div>
          <div style={{display:'flex',width:'32%',position:'relative',alignItems:'center',justifyContent:'center'}}>
            <div style={{position:'absolute',width:270,height:330,background:'#e7efff',transform:'rotate(-7deg) translate(-20px,12px)',border:'1px solid #dfe5e1'}} />
            <div style={{position:'absolute',width:270,height:330,background:'#eee9ff',transform:'rotate(7deg) translate(20px,-10px)',border:'1px solid #dfe5e1'}} />
            <div style={{display:'flex',width:270,height:330,background:'#dff4e9',border:'2px solid #0b6b47',alignItems:'center',justifyContent:'center',fontSize:130,color:'#0b6b47'}}>Ω</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
