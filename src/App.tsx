import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import 'flowbite'
import './App.css'

export const calculateTimes = (
  ({ start, idx }: { start: number, idx: number }) => {
    const half = idx % 2 === 1
    const hour = start + Math.floor((idx) / 2)
    const time = `${hour}:${half ? '30' : '00'}`
    const short = (
      `–${start + Math.floor((idx + 1) / 2)}`
      + `:${half ? '00' : '30'}`

    )
    const span = `${hour}${half ? ':30' : ''}${short}`

    return { half, hour, time, span, short }
  }
)


export const Day: React.FC<{
  sunrise: DateTime
  sunset: DateTime
  unavailable?: (
    boolean
    | 'before sunrise'
    | 'after sunrise'
    | 'after sunset'
    | 'always'
  )
  selecting?: boolean
  showSpan?: boolean
  iconOnly?: boolean
}> = (
({
  sunrise,
  sunset,
  unavailable = false,
  selecting = false,
  showSpan = false,
  iconOnly = false,
}) => {
  return <>
    {Array.from({
      length: (24) * 2
    }).map((_: unknown, idx: number) => {
      const { span, hour, half, short } = (
        calculateTimes({ start: 0, idx })
      )
      return <>
        {(hour === sunrise.hour && !half) && (
          iconOnly ? <div>🌅</div> : (
            <section className="solar">
              🌅―{sunrise.toFormat('H:mm')}ᴇᴛ―🌅
            </section>
          )
        )}
        {(hour === sunset.hour && !half) && (
          iconOnly ? <div>🌇</div> : (
            <section className="solar">
              🌇―{sunset.toFormat('H:mm')}ᴇᴛ―🌇
            </section>
          )
        )}
        {
          (
            (
              unavailable === 'before sunrise'
              && (idx / 2) < (sunrise.hour)
            )
            || (
              unavailable === 'after sunset'
              && (idx / 2) > sunset.hour)
            || (
              unavailable === 'after sunrise'
              && ((idx + 1) / 2) > sunrise.hour
            )
            || (unavailable === 'always')
          ) ? (
          <div
            className="unavailable"
            key={span}
            title={`Unavailable: ${span}`}
          >
            {showSpan && (idx === 0 ? span : short)}
          </div>
        ) : (
          <label
            key={span}
            title={span}
            onMouseOver={(event) => {
              const label = event.target as HTMLLabelElement
              const [child] = label.children as HTMLCollection
              const box = child as HTMLInputElement
              if(box != null) {
                if(selecting) {
                  if(event.ctrlKey) {
                    box.checked = true
                  } else if(event.shiftKey) {
                    box.checked = false
                  } else {
                    box.checked = !box.checked
                  }
                }
              }
            }}
          >
            <input
              type="checkbox"
              name={`slot.1-${span}`}
            />
          </label>
        )}
      </>
    })}
  </>
})

export const App = () => {
  const sunrise = [
    DateTime.fromISO('2022-11-22T07:14:00-05:00'),
    DateTime.fromISO('2022-11-23T07:15:00-05:00'),
    DateTime.fromISO('2022-11-24T07:16:00-05:00'),
    DateTime.fromISO('2022-11-24T07:17:00-05:00'),
  ]
  const sunset = [
    DateTime.fromISO('2022-11-22T17:16:00-05:00'),
    DateTime.fromISO('2022-11-23T17:16:00-05:00'),
    DateTime.fromISO('2022-11-24T17:15:00-05:00'),
    DateTime.fromISO('2022-11-24T17:14:00-05:00'),
  ]
  const [selecting, setSelecting] = useState(false)

  useEffect(() => {
    const mousedown = () => {
      setSelecting(true)
    }
    const mouseup = () => {
      setSelecting(false)
    }
    document.addEventListener('mousedown', mousedown)
    document.addEventListener('mouseup', mouseup)

    return () => {
      document.removeEventListener('mousedown', mousedown)
      document.removeEventListener('mouseup', mouseup)
    }
  }, [])



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
            <fieldset id="days">
              <legend>Applicable Days</legend>
              <fieldset id="times">
                <legend>Times</legend>
                <Day
                  sunrise={sunrise[0]}
                  sunset={sunset[0]}
                  unavailable="always"
                  showSpan={true}
                  iconOnly={true}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Tuesday, November 22ⁿᵈ, 2022</legend>
                <Day
                  unavailable="before sunrise"
                  sunrise={sunrise[0]}
                  sunset={sunset[0]}
                  {...{ selecting }}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Wednesday, November 23ʳᵈ, 2022</legend>
                <Day
                  sunrise={sunrise[1]}
                  sunset={sunset[1]}
                  {...{ selecting }}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Thursday, November 24ᵗʰ, 2022</legend>
                <Day
                  sunrise={sunrise[2]}
                  sunset={sunset[2]}
                  {...{ selecting }}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Friday, November 25ᵗʰ, 2022</legend>
                <Day
                  unavailable="after sunrise"
                  sunrise={sunrise[3]}
                  sunset={sunset[3]}
                  {...{ selecting }}
                />
              </fieldset>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  )
}

export default App