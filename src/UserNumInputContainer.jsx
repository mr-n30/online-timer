export default function UserNumInputContainer() {
  return(
    <div className="set-time-container">
      <p className="user-help-text">Enter time:</p>
      <label htmlFor="min">Min:</label>
      <input id="min" placeholder="0" defaultValue={0} type="number" name="min" min="0" max="59" className="num-input"/>
      <label htmlFor="sec">Sec:</label>
      <input id="sec" placeholder="0" defaultValue={0} type="number" name="sec" min="0" max="59" className="num-input"/>
    </div>
  );
}
