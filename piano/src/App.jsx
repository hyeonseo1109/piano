
import './App.css'

function App() {
  return (
    <>
      <h1>메롱</h1>
      <div className="pack">
        <div className="octave1">
          <div className="black">
            <div className="blackKeys" id="lowBlack1"></div>
            <div className="blackKeys" id="lowBlack2"></div>
            <div className="blackKeys" id="lowBlack3"></div>
            <div className="blackKeys" id="lowBlack4"></div>
            <div className="blackKeys" id="lowBlack5"></div>
          </div>
          <div className="white">
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
          </div>
        </div>

        <div className="octave2">
          <div className="black">
            <div className="blackKeys" id="midBlack1"></div>
            <div className="blackKeys" id="midBlack2"></div>
            <div className="blackKeys" id="midBlack3"></div>
            <div className="blackKeys" id="midBlack4"></div>
            <div className="blackKeys" id="midBlack5"></div>
          </div>
          <div className="white">
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
          </div>
        </div>

        <div className="octave3">
          <div className="black">
            <div className="blackKeys" id="highBlack1"></div>
            <div className="blackKeys" id="highBlack2"></div>
            <div className="blackKeys" id="highBlack3"></div>
            <div className="blackKeys" id="highBlack4"></div>
            <div className="blackKeys" id="highBlack5"></div>
          </div>
          <div className="white">
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
            <div className="whiteKeys"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
