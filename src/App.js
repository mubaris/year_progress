import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Line } from 'rc-progress';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';
import './App.css';


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

const SettingsDiv = styled.div`
  display: flex;
  position: absolute;
  top: 2.5%;
  right: 1.75%;
  margin: 0 0 1% 1%;
  color: #ffffff;
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
      perc: 0,
      metric: localStorage.getItem('metric') || 'year',
      visible: false,
      decimal: localStorage.getItem('decimal') || 10,
      decimalForm: localStorage.getItem('decimal') || 10,
      metricForm: localStorage.getItem('metric') || 'year'
    };
    this.calculatePercent = this.calculatePercent.bind(this);
    this.changeMetric = this.changeMetric.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.formDec = this.formDec.bind(this);
    this.formMetric = this.formMetric.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }
  saveSettings() {
    const decimal = this.state.decimalForm;
    localStorage.setItem('decimal', decimal);
    const metric = this.state.metricForm;
    localStorage.setItem('metric', metric);
    this.setState({ decimal, metric, visible: false });
  }
  formMetric(event) {
    this.setState({ metricForm: event.target.value });
  }
  formDec(event) {
    this.setState({ decimalForm: event.target.value });
  }
  showSettings() {
    this.setState({ visible: true });
  }
  closeSettings() {
    this.setState({ visible: false });
  }
  changeMetric() {
    const currentMetric = this.state.metric;
    switch (currentMetric) {
      case 'year':
        this.setState({ metric: 'day', metricForm: 'day' });
        localStorage.setItem('metric', 'day');
        break;
      case 'month':
        this.setState({ metric: 'year', metricForm: 'year' });
        localStorage.setItem('metric', 'year');
        break;
      case 'week':
        this.setState({ metric: 'month', metricForm: 'month' });
        localStorage.setItem('metric', 'month');
        break;
      case 'day':
        this.setState({ metric: 'week', metricForm: 'week' });
        localStorage.setItem('metric', 'week');
        break;
      default:
        this.setState({ metric: 'year', metricForm: 'year' });
        localStorage.setItem('metric', 'year');
        break;
    }
  }
  calculatePercent() {
    const start = moment().startOf(this.state.metric);
    const end = moment().endOf(this.state.metric);
    const now = moment();
    const duration = moment.duration(now.diff(start)).asMilliseconds();
    const total = moment.duration(end.diff(start)).asMilliseconds();
    const percent = duration * 100 / total;
    return percent.toFixed(this.state.decimal);
  }
  shouldComponentUpdate() {
    return !document.hidden;
  }
  componentDidMount() {
    setInterval(() => {
      const metric = this.state.metric;
      const displayMetric = metric.charAt(0).toUpperCase() + metric.slice(1).toLowerCase();
      document.title = `New Tab - ${displayMetric} Progress`;
      const percent = this.calculatePercent();
      const oldPerc = this.state.perc;
      const perc = parseFloat(percent).toFixed(2);
      if (oldPerc !== perc) {
        this.setState({ percent, perc });
      }
      this.setState({ percent });
    }, 50);
  }
  render() {
    const metric = this.state.metric;
    const displayMetric = metric.charAt(0).toUpperCase() + metric.slice(1).toLowerCase();
    return (
      <CenterDiv>
        <Header>
          <h1>
            <span onClick={this.changeMetric} style={{cursor: "pointer"}}>
              {displayMetric}
            </span> Progress
          </h1>
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
        <SettingsDiv onClick={this.showSettings} style={{cursor: "pointer"}}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </SettingsDiv>
        <DateDiv>
          <div>
            {moment().format("dddd, MMMM Do YYYY, HH:mm:ss")}
          </div>
        </DateDiv>
        <AuthorDiv>
          <a href="https://twitter.com/Mubaris_NK" target="_blank" rel="noopener noreferrer">Made with ♥ by Mubaris NK</a>
        </AuthorDiv>
        <Rodal visible={this.state.visible} onClose={this.closeSettings}>
          <div className="header">Settings</div>
          <div className="body">
            <div className="form-content">
              <label>
                {'Number of decimal points: '}
                <select value={this.state.decimalForm} onChange={this.formDec}>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
              </label>
            </div>
            <div className="form-content">
              <label>
                {'Progress Bar Metric: '}
                <select value={this.state.metricForm} onChange={this.formMetric}>
                  <option value={'day'}>Day</option>
                  <option value={'week'}>Week</option>
                  <option value={'month'}>Month</option>
                  <option value={'year'}>Year</option>
                </select>
              </label>
            </div>
            <a href="https://buymeacoff.ee/mubaris" target="_blank" className="rodal-bottom" rel="noopener noreferrer">
              <img src="bmc.png" alt="Buy Me A Coffee" />
            </a>
          </div>
          <button className="rodal-confirm-btn" onClick={this.saveSettings} style={{cursor: "pointer"}}>
            Save
          </button>
          <button className="rodal-cancel-btn" onClick={this.closeSettings} style={{cursor: "pointer"}}>
            Close
          </button>
        </Rodal>
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

  .header {
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
  }

  /* -- body -- */
  .body {
    padding-top: 15px;
  }

  .rodal-cancel-btn, .rodal-confirm-btn {
    position: absolute;
    font: inherit;
    bottom: 16px;
    display: inline-flex;
    align-items: center; /* cross axis */
    justify-content: center; /* main axis */

    line-height: 1;
    padding: 4px 15px;
    border-radius: 3px;
    transition: background .2s;
    border: 1px solid #03a9f4;
  }
  .rodal-confirm-btn {
    color: #fff;
    right: 102px;
    background: #03a9f4;
    height: 41px;
  }
  .rodal-confirm-btn:hover {
    background: #0098e3;
  }
  .rodal-cancel-btn {
    color: #03a9f4;
    right: 16px;
    background: #fff;
    height: 41px;
  }
  .rodal-cancel-btn:hover {
    background: #fafafa;
  }
  .rodal-cancel-btn:focus, .rodal-confirm-btn:focus {
    outline: none;
  }
  .rodal-confirm-btn:active {
    background: #0087d2;
  }
  .rodal-cancel-btn:active {
    background: #fafafa;
    box-shadow: inset 1px 1px 1px rgba(0,0,0,.2),0 0 1px transparent;
  }
  .rodal-bottom {
    position: absolute;
    font: inherit;
    bottom: 16px;
    display: inline-flex;
    align-items: center; /* cross axis */
    justify-content: center; /* main axis */
  }
`;

export default App;
