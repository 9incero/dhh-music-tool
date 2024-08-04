import { Component, createRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import test from '../assets/musicdata/music.wav.json'

class Fileloader extends Component {
  // 생성자 함수에서 변수를 정의
  constructor(props) {
    super(props);
    this.state = {
      someValue: '',
      textvalue: '',
      audioSrc: ''
    };
    this.fileInput = createRef();
  }

  calculateAudioDuration = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.onloadedmetadata = () => {
      this.props.setDuration(audio.duration);
      console.log(audio.duration)

    };
  };

  handleClick = () => {
    const { setAudiourl } = this.props;
    if (this.fileInput.current.files) {
      const file = this.fileInput.current.files[0];
      const url = URL.createObjectURL(file);
      setAudiourl(url)
      this.calculateAudioDuration(url)

    }
    // const fname = this.fileInput.current.files[0].name
    // console.log('fname ', fname)
    // //다른 노트북으로 실험시 여기 url 고치기
    // const data = {
    //   url: '/Users/youjin/CHI25/dhh-music-tool/src/assets/' + fname,
    //   lyrics: this.state.textvalue
    // };

    // axios.post('http://127.0.0.1:5001/analysis', data)
    //   .then((response) => {
    //     console.log(response.data);

    //     // 서버에서 받은 데이터를 JSON 문자열로 변환
    //     const jsonData = JSON.stringify(response.data);

    //     // JSON 데이터를 Blob으로 변환
    //     const blob = new Blob([jsonData], { type: 'application/json' });

    //     // Blob을 가리키는 임시 URL 생성
    //     const url = window.URL.createObjectURL(blob);

    //     // 다운로드 링크 생성
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'musicdata.json'; // 원하는 파일 이름 설정
    //     link.click();

    //     // URL과 링크 정리
    //     window.URL.revokeObjectURL(url);


    //     this.props.setTotaldata({ ...response.data })
    //     console.log(this.props.totaldata)

    //   })
    //   .catch((error) => {
    //     console.log('Error!', error);
    //   });


    // this.props.setTotaldata({ ...test });

    this.props.setTotaldata({ ...test });



  }
  fileinputclick = () => {
    this.fileInput.current.click();


  };
  handleTextChange = (event) => {
    this.setState({ textvalue: event.target.value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.totaldata !== this.props.totaldata) {
      console.log('>>', this.props.totaldata); // 상태가 업데이트된 후에 로그 출력
    }
  }

  handleButtonClick = () => {
    // console.log(test)
    this.props.setTotaldata({ ...test });
  };


  render() {
    return (
      <div>
        {/* <Card style={{ width: '18rem', padding: '10px' }}> */}
        <Card.Title>[음악 정보 입력]</Card.Title>
        <Card.Text>
          Suno를 사용해 만든 가사를 붙여넣고<br />
          음악을 업로드 해주세요!
        </Card.Text>
        {/* <textarea name="content" onChange={this.handleTextChange}
            value={this.state.textvalue} cols="40" rows="8" placeholder='가사를 넣어주세요.' ></textarea> */}
        <Form.Control as="textarea" name="content" onChange={this.handleTextChange}
          value={this.state.textvalue} placeholder='가사를 넣어주세요.' rows={10} />
        <input type="file" ref={this.fileInput} onChange={this.handleClick} style={{ display: "none" }} />
        <Button style={{ width: '100%', marginTop: '10px', borderColor: 'black', color: 'black', backgroundColor: 'lightskyblue' }} onClick={this.fileinputclick}>음악 업로드</Button>{' '}
        {/* </Card> */}
        <button onClick={this.handleButtonClick}>test</button>
      </div >
    );
  }
}

export default Fileloader;
