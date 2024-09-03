// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {timerlimit: 25, isRunning: false, timeleft: 25 * 60}
    this.timerId = null
  }

  onTogglestartPause = () => {
    const {timerlimit, timeleft, isRunning} = this.state

    if (isRunning) {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    } else {
      if (timeleft === 0) {
        this.setState({timeleft: timerlimit * 60})
      }
      this.timerId = setInterval(this.decreaseTime, 1000)
      this.setState({isRunning: true})
    }
  }

  formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`

    return {stringifiedMin, stringifiedSec}
  }

  decreaseTime = () => {
    const {timeleft} = this.state

    if (timeleft > 0) {
      this.setState({timeleft: timeleft - 1})
    } else {
      clearInterval(this.timerId)
      this.setState({timeleft: 0, isRunning: false})
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      isRunning: false,
      timeleft: this.state.timerlimit * 60,
    })
  }

  decreaseTimerLimit = () => {
    const {isRunning, timerlimit} = this.state
    if (!isRunning && timerlimit > 1) {
      this.setState(prevState => ({
        timerlimit: prevState.timerlimit - 1,
        timeleft: (prevState.timerlimit - 1) * 60,
      }))
    }
  }

  increaseTimerLimit = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        timerlimit: prevState.timerlimit + 1,
        timeleft: (prevState.timerlimit + 1) * 60,
      }))
    }
  }

  render() {
    const {timerlimit, isRunning, timeleft} = this.state
    const {stringifiedMin, stringifiedSec} = this.formatTime(timeleft)
    const startButtonText = isRunning ? 'Pause' : 'Start'
    const startOrPauseUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = isRunning ? 'pause icon' : 'play icon'
    const timerStatus = isRunning ? 'Running' : 'Paused'

    return (
      <div className="timer-container">
        <h1>Digital Timer</h1>
        <div className="timer-display">
          <div className="timer-ellipse">
            <div className="inside-timer">
              <h>
                {stringifiedMin}:{stringifiedSec}
              </h>
              <p>{timerStatus}</p>
            </div>
          </div>
          <div className="reset-start">
            <div className="start-pause-reset">
              <button
                type="button"
                className="start-button"
                onClick={this.onTogglestartPause}
              >
                <img
                  src={startOrPauseUrl}
                  alt={altText}
                  className="play-icon"
                />
                {startButtonText}
              </button>
              <button
                type="button"
                className="start-button"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-icon"
                />
                Reset
              </button>
            </div>

            <p>Set Timer limit</p>
            <div className="minus-plus">
              <button
                type="button"
                className="minus-button"
                onClick={this.decreaseTimerLimit}
              >
                -
              </button>
              <p className="time-limit">{timerlimit}</p>
              <button
                type="button"
                className="minus-button"
                onClick={this.increaseTimerLimit}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
