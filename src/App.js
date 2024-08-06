import './App.css';
import './component/modulestyle/font.css'
import React, { useState, useEffect } from 'react';
import Loader from './component/sample';
import Fileloader from './component/fileloader';
import Control from './component/control';
import Vislyrics from './component/lyricsdisplay';
import TimelineEditor from './component/timeline/main';
import MusicVisual from './component/musicdisplay';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
// import { scale } from './component/timeline/mock';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import MidiBeatMaker from './component/beatdisplay';
import HapticComponent from './component/hapticplay';
import PromptDisplay from './component/propmtdisplay';
import Userfile from './component/userfile';

function App() {
  const [left, setLeft] = useState(0);
  const [playtime, setPlaytime] = useState(0)
  const [audiourl, setAudiourl] = useState('')
  const [words, setWords] = useState([]);
  const [timedata, setTimedata] = useState([]);
  const [control, setControl] = useState([]);
  const [opacity, setOpacity] = useState(0);
  const [pitch, setPitch] = useState([]);
  const [pitchtime, setPitchtime] = useState([]);
  const [mode, setMode] = useState([1, 2]);
  const [filename, setFilename] = useState('')
  const [totaldata, setTotaldata] = useState({
    BPM: '',
    Beat_amplitude: [],
    Emotions: [],
    Instruments: [],
    Lyrics: [],
    Pitch: []
  });
  const [mockdata, setMockdata] = useState([])
  const [beatamp, setBeatamp] = useState([])
  const [midibeat, setMidibeat] = useState([])
  const [duration, setDuration] = useState(0);
  const [phase, setPhase] = useState([])
  const [emotionlist, setEmotionlist] = useState([])
  const [pitchlist, setPitchlist] = useState([])
  const [beatlist, setBeatlist] = useState([])
  const [changedata, setChangedata] = useState([])
  const [buttonText, setButtonText] = useState('start');
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);



  const handleChange = (val) => setMode(val);
  const handleButtonClick = () => {
    setButtonText(prevText => (prevText === 'start' ? 'end' : 'start'));
    if (buttonText === 'start') {
      setButtonText('end');
      setIsActive(true);
    } else {
      setButtonText('start');
      setIsActive(false);

      //여기에서 final json file 만들면됨
      console.log(time)
      console.log()
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      console.log(time)
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);



  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col md={3} style={{
            backgroundColor: 'lightblue', height: '100vh', margin: 0, padding: 0
          }}>
            {/* 왼쪽 큰 컬럼 */}
            <iframe src="https://c2eec77c60f6bc61c6.gradio.live" width='100%' height='100%' ></iframe>

          </Col>
          <Col md={6} style={{ padding: '20px' }}>
            <Row style={{ height: '70%' }}>
              <Col>
                {/* 중앙 위쪽 큰 컬럼 */}

                <ToggleButtonGroup type="checkbox" value={mode} onChange={handleChange}>
                  <ToggleButton id="tbg-btn-1" value={1}>
                    음악
                  </ToggleButton>
                  <ToggleButton id="tbg-btn-2" value={2}>
                    가사
                  </ToggleButton>

                </ToggleButtonGroup>
                {/* <p>visual</p> */}
                <p>여기에 변경사항: {control.pitch_value}</p>
                <Vislyrics totaldata={totaldata} setPitchtime={setPitchtime} pitchtime={pitchtime} pitch={pitch} setPitch={setPitch} opacity={opacity} setOpacity={setOpacity} control={control} words={words} setWords={setWords} left={left} setLeft={setLeft} playtime={playtime} setPlaytime={setPlaytime} />
                <MusicVisual beatlist={beatlist} setBeatlist={setBeatlist} phase={phase} setPhase={setPhase} midibeat={midibeat} setBeatamp={setBeatamp} totaldata={totaldata} control={control} setOpacity={setOpacity} opacity={opacity} playtime={playtime} pitches={pitch} times={pitchtime}></MusicVisual>

                {/* <MusicVisual opacity={opacity} playtime={playtime} pitches={pitch} times={pitchtime}></MusicVisual> */}
                {/* <iframe src="http://172.17.26.136:8080/build" width='100%' height='100%' style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, transform: 'scale(1)' }}></iframe> */}
                {/* <Vislyrics style={{ position: 'absolute', top: 300, zIndex: 2 }} setPitchtime={setPitchtime} pitchtime={pitchtime} pitch={pitch} setPitch={setPitch} opacity={opacity} setOpacity={setOpacity} control={control} words={words} setWords={setWords} left={left} setLeft={setLeft} playtime={playtime} setPlaytime={setPlaytime} /> */}
                {/* <Vislyrics setPitchtime={setPitchtime} pitchtime={pitchtime} pitch={pitch} setPitch={setPitch} opacity={opacity} setOpacity={setOpacity} control={control} words={words} setWords={setWords} left={left} setLeft={setLeft} playtime={playtime} setPlaytime={setPlaytime} /> */}

                {/* <iframe src="http://172.17.26.136:8080/" width={1000} height={1000} style={{ position: 'absolute', zIndex: 1 }}></iframe>
                <Vislyrics style={{ paddingTop: '100px' }} words={words} setWords={setWords} left={left} setLeft={setLeft} playtime={playtime} setPlaytime={setPlaytime} ></Vislyrics> */}

              </Col>
            </Row>
            <Row style={{ height: '30%' }}>
              <Col style={{ padding: 0, margin: 0 }}>
                {/* 중앙 아래쪽 작은 컬럼 */}
                <TimelineEditor duration={duration} mockdata={mockdata} setMockdata={setMockdata} totaldata={totaldata} control={control} timedata={timedata} setAudiourl={setAudiourl} audiourl={audiourl} setLeft={setLeft} setPlaytime={setPlaytime}></TimelineEditor>
                <MidiBeatMaker midibeat={midibeat} playtime={playtime} totaldata={totaldata} setMidibeat={setMidibeat}></MidiBeatMaker>
              </Col>
            </Row>
          </Col>
          <Col md={3} style={{ height: '100vh', margin: 0, padding: 0 }}>
            {/* 오른쪽 큰 컬럼 */}


            <button onClick={handleButtonClick}>{buttonText}</button>
            <Control setChangedata={setChangedata} beatlist={beatlist} setPitchlist={setPitchlist} pitchlist={pitchlist} phase={phase} emotionlist={emotionlist} setEmotionlist={setEmotionlist} playtime={playtime} setDuration={setDuration} mockdata={mockdata} setMockdata={setMockdata} totaldata={totaldata} setTotaldata={setTotaldata} setControl={setControl} setTimedata={setTimedata} setAudiourl={setAudiourl} control={control}></Control>
            <PromptDisplay changedata={changedata}></PromptDisplay>
            <HapticComponent beatamp={beatamp} />

          </Col>
        </Row>

      </Container>

      {/* <div style={{ position: 'relative' }}>
        <iframe src="http://172.17.26.136:8080/" width={1000} height={1000} style={{ position: 'absolute', zIndex: 1 }}></iframe>
        <Vislyrics style={{ paddingTop: '100px' }} words={words} setWords={setWords} left={left} setLeft={setLeft} playtime={playtime} setPlaytime={setPlaytime} ></Vislyrics>
      </div>




      < div style={{ position: 'relative' }
      }>
        <section style={{ marginLeft: '-100px' }}>
          <Vislyrics words={words} setWords={setWords} left={left} setLeft={setLeft} playtime={playtime} setPlaytime={setPlaytime} ></Vislyrics>
          <TimelineEditor timedata={timedata} setAudiourl={setAudiourl} audiourl={audiourl} setLeft={setLeft} setPlaytime={setPlaytime}></TimelineEditor>

        </section>
        <aside>

          <div style={{ marginBottom: '10px' }}>
            <Fileloader setTimedata={setTimedata} setAudiourl={setAudiourl}></Fileloader>

          </div>
          <div style={{ padding: '100' }}>
            <Control setTimedata={setTimedata} setAudiourl={setAudiourl}></Control>

          </div>
        </aside>

      </div > */}

    </div>
  );
}


export default App;
