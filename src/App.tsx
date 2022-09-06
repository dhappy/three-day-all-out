import { useState } from 'react'
import './App.pcss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <body>
      <header>
        <button>Sign-In With Ethereum</button>
      </header>

      <main>
        <section>
          <h1>Create An Availability</h1>

          <p>These are markers for times that the given group is available.</p>

          <form>
            <fieldset className="flex">
              <legend>Applicable Days</legend>
              <fieldset className="inline-block">
                <legend>Start Date</legend>
                <input type="date" name="date.start"/>
              </fieldset>
              <fieldset className="inline-block">
                <legend>End Date</legend>
                <input type="date" name="date.end"/>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>Start Time</legend>
              <label htmlFor="start.earliest">Earliest Start Time</label>
              <input type="time" name="start.earliest"/>
              <label htmlFor="start.latest">Latest Start Time</label>
              <input type="time" name="start.latest"/>
            </fieldset>
            <fieldset>
              <legend>End Time</legend>
              <label htmlFor="end.earliest">Earliest End Time</label>
              <input type="time" name="end.earliest"/>
              <label htmlFor="end.latest">Latest End Time</label>
              <input type="time" name="end.latest"/>
            </fieldset>
          </form>
        </section>
      </main>
    </body>
  )
}

export default App
