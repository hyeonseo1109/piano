import { useEffect, useRef, useState} from 'react';
//useRef는 다시 렌더링되어도 유지됨, 다른 함수에서도 접근 가능함.
import './App.css'

function App() {
  const [isPiano, setIsPiano] = useState(true);
  // 모드 변환 ( 피아노 <-> 마림바 )

  const startTimes = useRef({});
  const timeouts = useRef({});
  // 누른 시간 감지

  const audioBox = useRef({});
  //건반 누를 때마다 새 오디오 만들면 잡음이 생기는 것을 확인, 
  //처음 눌렀을 때는 객체 새로 생성, 그 이후부터는 객체에 있던 오디오 가져옴.
  
  const isTouch = useRef(false);
  //모바일과 컴퓨터 환경 구분 ( => 터치 이벤트가 있을 경우 모바일로 간주함)

  useEffect(() => {
    const keys = document.querySelectorAll('.keys');
    keys.forEach((key) => {
      const mode = isPiano ? 'piano' : 'marimba';
      let audio = audioBox.current[key.id];
      if (!audioBox || audioBox.mode !== mode) {  
        //audioBox에 해당 아이디의 값이 없다면 = 건반을 누른 적 없다면 새 오디오 생성
        // audio = new Audio(`/${isPiano ? 'sound-piano' : 'sound-marimba'}/${key.id}.mp3`);
        const src = `/${isPiano ? 'sound-piano' : 'sound-marimba'}/${key.id}.mp3`;
        console.log(`Loading audio for ${key.id} :`, src);
        audio = new Audio(src);
        audio.preload = 'auto';
        // 성능 향상용. 페이지 불러올 때 사운드도 미리 불러와서 안 기다리고 버튼 누르자마자 바로바로 소리날 수 있음. 
        audio.mode = mode; 
        //현재 모드를 기억시킴
        audioBox.current[key.id] = audio;
        //해당 건반을 누른 적 있다면 기존 오디오 활용
      };

      
      

      const handleDown = () => {
        audio.pause();
        //이전에 나던 소리를 끊고 새로운 소리가 시작됨. 얘 없애봤는데 5번 연타하면 소리가 뒤늦게 5번 들린다..
        audio.currentTime = 0;
        //0초부터 재생
        audio.play();
        startTimes.current[key.id] = Date.now();
        //객체 starTimes에 현재 시각 저장.
        //id별로 누른 시간을 구함 
        clearTimeout(timeouts.current[key.id]);
        timeouts.current[key.id] = setTimeout(() => { 
          //아이디별로 4초 타이머 지정
          audio.pause();
          audio.currentTime = 0;
        }, 4000);
      };
      const handleUp = () => {
        const start = startTimes.current[key.id];
        //객체 startTimes에 있는 시간 다시 불러옴.
        const end = Date.now() - start;
        //(=> 뗀 시간 - 누른 시간  구해서 총 눌린 시간을 구함, 눌린 시간 동안 소리 재생)
        clearTimeout(timeouts.current[key.id]);

        if (end <300) {
          // 건반 누른 시간이 0.3초 이내라면? ex: 0.1초만 눌렀을 경우
          const remain = 300 - end;
          // 0.2초를 추가로 더 소리나게끔. (아무리 건반을 짧게 눌러도 최소한 0.3초는 소리가 남.)
          timeouts.current[key.id] = setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, remain);
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      };

      const handleTouchStart = () => {
        isTouch.current = true; 
        //isTouch를 true로 변경 후 소리 재생
        handleDown();
      };

      const handleMouseDown = () => {
        if (isTouch.current) return;
        //만약 터치가 있다면 mouseDown은 생략함.
        handleDown();
      };

      key.addEventListener('touchstart', handleTouchStart);
      //1) 화면을 터치했을 시 handleTouchStart 실행
      key.addEventListener('touchend', handleUp);
      key.addEventListener('mousedown', handleMouseDown);
      key.addEventListener('mouseup', handleUp);
      key.addEventListener('mouseleave', handleUp);
    });

    return () => {
      keys.forEach((key) => {
        key.replaceWith(key.cloneNode(true)); 
        //isPiano가 변경될 때마다 기존에 있던 이벤트를 없애주는 용도
        //모드가 바뀌면 기존 건반들을 복사해서 이벤트리스너가 없는 새 건반들을 배치함.
      });
    };
  }, [isPiano]);



  


    return (
      <>
        <h1 id="h1"
          onClick={() => setIsPiano(!isPiano)}
        >
          {isPiano ? '𝓟𝓲𝓪𝓷𝓸' : '𝓜𝓪𝓻𝓲𝓶𝓫𝓪'}
        </h1>
        <div className="pack">
          <div className="octave3">
            <div className="black">
              <div className="keys blackKeys black1" id="highBlack1"></div>
              <div className="keys blackKeys black2" id="highBlack2"></div>
              <div className="keys blackKeys black3" id="highBlack3"></div>
              <div className="keys blackKeys black4" id="highBlack4"></div>
              <div className="keys blackKeys black5" id="highBlack5"></div>
            </div>
            <div className="white">
              <div className="keys whiteKeys" id="highWhite1"></div>
              <div className="keys whiteKeys" id="highWhite2"></div>
              <div className="keys whiteKeys" id="highWhite3"></div>
              <div className="keys whiteKeys" id="highWhite4"></div>
              <div className="keys whiteKeys" id="highWhite5"></div>
              <div className="keys whiteKeys" id="highWhite6"></div>
              <div className="keys whiteKeys" id="highWhite7"></div>
            </div>
          </div>

          <div className="octave2">
            <div className="black">
              <div className="keys blackKeys black1" id="midBlack1"></div>
              <div className="keys blackKeys black2" id="midBlack2"></div>
              <div className="keys blackKeys black3" id="midBlack3"></div>
              <div className="keys blackKeys black4" id="midBlack4"></div>
              <div className="keys blackKeys black5" id="midBlack5"></div>
            </div>
            <div className="white">
              <div className="keys whiteKeys" id="midWhite1"></div>
              <div className="keys whiteKeys" id="midWhite2"></div>
              <div className="keys whiteKeys" id="midWhite3"></div>
              <div className="keys whiteKeys" id="midWhite4"></div>
              <div className="keys whiteKeys" id="midWhite5"></div>
              <div className="keys whiteKeys" id="midWhite6"></div>
              <div className="keys whiteKeys" id="midWhite7"></div>
            </div>
          </div>

          <div className="octave1">
            <div className="black">
              <div className="keys blackKeys black1" id="lowBlack1"></div>
              <div className="keys blackKeys black2" id="lowBlack2"></div>
              <div className="keys blackKeys black3" id="lowBlack3"></div>
              <div className="keys blackKeys black4" id="lowBlack4"></div>
              <div className="keys blackKeys black5" id="lowBlack5"></div>
            </div>
            <div className="white">
              <div className="keys whiteKeys" id="lowWhite1"></div>
              <div className="keys whiteKeys" id="lowWhite2"></div>
              <div className="keys whiteKeys" id="lowWhite3"></div>
              <div className="keys whiteKeys" id="lowWhite4"></div>
              <div className="keys whiteKeys" id="lowWhite5"></div>
              <div className="keys whiteKeys" id="lowWhite6"></div>
              <div className="keys whiteKeys" id="lowWhite7"></div>
            </div>
          </div>
        </div>
      </>
    );
}

export default App;
