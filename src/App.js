import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Line } from 'rc-progress';
import moment from 'moment';

const gradients = [
  'background:linear-gradient(135deg, #CE9FFC 0%,#7367F0 100%);',
  'background:linear-gradient(135deg, #b1ea4d 0%,#459522 100%);',
  'background:linear-gradient(135deg, #c3ec52 0%,#0ba29d 100%);',
  'background:linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%);',
  'background:linear-gradient(135deg, #13f1fc 0%,#0470dc 100%);',
  'background:linear-gradient(135deg, #C56CD6 0%,#3425AF 100%);',
  'background:linear-gradient(135deg, #F36265 0%,#961276 100%);',
  'background:linear-gradient(135deg, #F5515F 0%,#A1051D 100%);',
  'background:linear-gradient(135deg, #f2d50f 0%,#da0641 100%);',
  'background:linear-gradient(135deg, #fad961 0%,#f76b1c 100%);',
  'background:linear-gradient(135deg, #5b247a 0%,#1bcedf 100%);',
  'background:linear-gradient(135deg, #184e68 0%,#57ca85 100%);',
  'background:linear-gradient(135deg, #65799b 0%,#5e2563 100%);',
  'background:linear-gradient(135deg, #f02fc2 0%,#6094ea 100%);',
  'background:linear-gradient(135deg, #7117ea 0%,#ea6060 100%);',
  'background:linear-gradient(135deg, #622774 0%,#c53364 100%);',
  'background:linear-gradient(135deg, #17ead9 0%,#6078ea 100%);',
  'background:linear-gradient(135deg, #f65599 0%,#4d0316 100%);',
  'background:linear-gradient(135deg, #fcdf8a 0%,#f38381 100%);'
];

const gradient = gradients[Math.floor(Math.random()*gradients.length)];


const CenterDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  ${gradient}
`;

const Header = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #ffffff;
  font-size: 200%;
`

const Percent = styled.div`
  font-family: 'Source Code Pro', monospace;
  color: #ffffff;
  white-space: pre-wrap;
  font-size: 125%;
`

const DateDiv = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0 1% 1%;
  color: #ffffff;
`;

const AuthorDiv = styled.div`
  display: flex;
  position: absolute;
  left: 81%;
  right: 0%;
  bottom: 0;
  margin: 0 1% 1% 0;
  width: 18%;
  color: #ffffff;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const progressStyles = {
  width: '25%',
  height: '5%',
  borderStyle: 'solid',
  borderColor: '#ffffff'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      perc: 0
    };
    this.calculatePercent = this.calculatePercent.bind(this)
  }
  calculatePercent() {
    const start = moment().startOf('year');
    const end = moment().endOf('year');
    const now = moment();
    const duration = moment.duration(now.diff(start)).asMilliseconds();
    const total = moment.duration(end.diff(start)).asMilliseconds();
    const percent = duration * 100 / total;
    return percent.toFixed(10);
  }
  componentDidMount() {
    setInterval(() => {
      const percent = this.calculatePercent();
      const oldPerc = this.state.perc;
      const perc = parseFloat(percent).toFixed(2);
      if (oldPerc !== perc) {
        this.setState({ percent, perc });
      }
      this.setState({ percent });
    }, 250);
  }
  render() {
    return (
      <CenterDiv>
        <Header>
          <h1>Year Progress</h1>
        </Header>
        <Line 
          percent={this.state.perc}
          strokeWidth={1} 
          strokeColor="#ffffff" 
          trailColor="#2db7f500"
          strokeLinecap="square"
          style={progressStyles} 
        >
          Some
        </Line>
        <Percent>
          <h1>{`${this.state.percent} %`}</h1>
        </Percent>
        <DateDiv>
          <div>
            {moment().format("dddd, MMMM Do YYYY, HH:mm:ss")}
          </div>
        </DateDiv>
        <AuthorDiv>
          <a href="https://twitter.com/Mubaris_NK" target="_blank" rel="noopener noreferrer">Made with ♥ by Mubaris NK</a>
        </AuthorDiv>
      </CenterDiv>
    );
  }
}

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Raleway');
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

  html, body {
    height: 100%;
    width: 100%;
    font-size: 108%;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  @keyframes progress-bar {
    0%   {stroke-opacity : 1;}
    50%  {stroke-opacity: 0.5;}
    100% {stroke-opacity : 1;}
  }
  .rc-progress-line-path {
    animation: progress-bar 2.5s linear infinite;
  }
`;

export default App;
