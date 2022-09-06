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

export const generateMap = () => {
  const cols = [
    document.querySelectorAll('fieldset fieldset:nth-of-type(2) > *'),
    document.querySelectorAll('fieldset fieldset:nth-of-type(3) > *'),
    document.querySelectorAll('fieldset fieldset:nth-of-type(4) > *'),
    document.querySelectorAll('fieldset fieldset:nth-of-type(5) > *'),
  ]
  const checks = cols.map(
    (col) => Array.from(col).map((elem) => {
      if(!(elem instanceof HTMLLabelElement)) {
        return undefined
      }
      const input = elem.querySelector('input')
      return ({
        checked: input == null ? null : input.checked,
        id: elem.id,
      })
    }).filter((entry) => entry !== undefined)
  )
  console.debug({ checks })
}

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
  setSelecting?: (b: boolean) => void
  showSpan?: boolean
  iconOnly?: boolean
  day?: number
}> = (
({
  sunrise,
  sunset,
  unavailable = false,
  selecting = false,
  setSelecting,
  showSpan = false,
  iconOnly = false,
  day = 0
}) => {
  return <>
    {Array.from({
      length: (24) * 2
    }).map((_: unknown, idx: number) => {
      const { span, hour, half, short } = (
        calculateTimes({ start: 0, idx })
      )
      return <>
        {((hour === sunrise.hour || hour === sunset.hour) && !half) && (
          <section key={`solar-${span}`} className="solar">
            {(hour === sunrise.hour && !half) && (
              iconOnly ? '🌅' : `🌅―${sunrise.toFormat('H:mm')}ᴇᴛ―🌅`
            )}
            {(hour === sunset.hour && !half) && (
              iconOnly ? '🌇' : `🌇―${sunset.toFormat('H:mm')}ᴇᴛ―🌇`
            )}
          </section>
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
            id={`${day}-${span}`}
            key={span}
            title={span}
            onMouseOver={(event) => {
              if(event.buttons === 0) {
                return setSelecting?.(false)
              }
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

  useEffect(() => {
    if(!selecting) {
      generateMap()
    }
  }, [selecting])

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
                  day={0}
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
                  day={1}
                  unavailable="before sunrise"
                  sunrise={sunrise[0]}
                  sunset={sunset[0]}
                  {...{ selecting, setSelecting }}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Wednesday, November 23ʳᵈ, 2022</legend>
                <Day
                  day={2}
                  sunrise={sunrise[1]}
                  sunset={sunset[1]}
                  {...{ selecting, setSelecting }}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Thursday, November 24ᵗʰ, 2022</legend>
                <Day
                  day={3}
                  sunrise={sunrise[2]}
                  sunset={sunset[2]}
                  {...{ selecting, setSelecting }}
                />
              </fieldset>
              <fieldset className="time">
                <legend>Friday, November 25ᵗʰ, 2022</legend>
                <Day
                  day={4}
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