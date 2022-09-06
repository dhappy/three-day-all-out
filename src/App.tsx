import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <button>Sign-In With Ethereum</button>
      </header>

      <main>
        <section>
          <h1>Create An Availability</h1>

          <p>These are markers for times that the given group is available.</p>

          <form>
            <fieldset>
              <legend>Applicable Days</legend>
              <fieldset>
                <legend>November 2022</legend>
                <label>
                  22ⁿᵈ
                  <input type="checkbox" name="date.22nd"/>
                </label>
                <label>
                  23ʳᵈ
                  <input type="checkbox" name="date.23rd"/>
                </label>
                <label>
                  24ᵗʰ
                  <input type="checkbox" name="date.24th"/>
                </label>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>Start Time</legend>
              <fieldset>
                <legend>Earliest Start Time</legend>
                <input type="time" name="start.earliest"/>
              </fieldset>
              <fieldset>
                <legend>Latest Start Time</legend>
                <input type="time" name="start.latest"/>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>End Time</legend>
              <fieldset>
                <legend>Earliest End Time</legend>
                <input type="time" name="end.earliest"/>
              </fieldset>
              <fieldset>
                <legend>Latest End Time</legend>
                <input type="time" name="end.latest"/>
              </fieldset>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  )
}

export default App
