import PropTypes from 'prop-types'

export default function TimeLeftContainer({ minLeft, secLeft }) {
  if (minLeft === 0 && secLeft === 0) {
    return(
      <div className="time-left-container">
	<p>Time Left: </p><p>DONE</p>
      </div>
    )
  }

  return(
    <div className="time-left-container">
      <p>Time Left: </p><p>{minLeft}:{secLeft}</p>
    </div>
  )
}

TimeLeftContainer.propTypes = {
  minLeft: PropTypes.number,
  secLeft: PropTypes.number
};
