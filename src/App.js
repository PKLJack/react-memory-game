import "./App.css"

import { Chance } from "chance"
import { useEffect } from "react"
import { useState } from "react"

import { DIFFICULTY, fetchData } from "./data"

import Card from "./components/Card"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Difficulty from "./components/Difficulty"

const DEBUG = false

const COUNT_DOWN = 1000
const chance = DEBUG ? new Chance(42) : new Chance()

function App() {
  const [shapesArray, setShapesArray] = useState([])
  const [userChoiceIds, setUserChoiceId] = useState([])
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isPlayerWin, setIsPlayerWin] = useState(false)
  const [myTimer, setMyTimer] = useState(null)
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY)

  useEffect(() => {
    // console.log("effect diffculty", difficulty)
    resetGame()
  }, [difficulty])

  useEffect(() => {
    if (score !== 0 && score === shapesArray.length / 2) {
      // console.log("set is player win")
      setIsPlayerWin(true)

      setIsFinished(true)
    }
  }, [score])

  useEffect(() => {
    if (userChoiceIds.length < 2) {
      return
    }

    /* Stuff */
    const card1 = shapesArray.find((element) => element.id === userChoiceIds[0])
    const card2 = shapesArray.find((element) => element.id === userChoiceIds[1])

    // Check same name
    if (card1.name !== card2.name) {
      // console.log("Incorrect: ", card1.name, "and", card2.name)

      // Disable Clicking
      disableClicking()

      // Add Timer
      const timer = window.setTimeout(() => {
        // Update shapesArray elements' .isHidden
        setShapesArray((prevArray) =>
          prevArray.map((obj) => {
            if (obj.id === card1.id || obj.id === card2.id) {
              return { ...obj, isHidden: true }
            }
            return obj
          })
        )

        // Enable Clicking
        enableClicking()
      }, COUNT_DOWN)

      setMyTimer(timer)
    } else {
      // Update score
      setScore((prevScore) => prevScore + 1)
    }

    // Clear userChoiceIds
    setUserChoiceId([])
  }, [userChoiceIds])

  function handleDifficultyChange(event) {
    // console.log(event.target.value)
    setDifficulty(event.target.value)
  }

  function disableClicking() {
    setShapesArray((prevArray) =>
      prevArray.map((obj) => ({ ...obj, isClickable: false }))
    )
  }

  function enableClicking() {
    setShapesArray((prevArray) =>
      prevArray.map((obj) => ({ ...obj, isClickable: true }))
    )
  }

  function resetGame() {
    /* Initialise and Reset game */

    // Add attributes: hidden, isClickable
    // console.log("resetGame difficulty", difficulty)
    const nonBlanks = fetchData(difficulty, chance).map((obj) => ({
      ...obj,
      isHidden: true,
      isClickable: true,
    }))

    // console.log("resetGame nonBlanks", nonBlanks)

    // Repeat and add id
    const arr1 = [
      ...nonBlanks.map((obj) => ({ ...obj, id: `${obj.name}-1` })),
      ...nonBlanks.map((obj) => ({ ...obj, id: `${obj.name}-2` })),
    ]

    // Shuffle cards
    const newShapesArray = chance.shuffle(arr1)
    setShapesArray(newShapesArray)

    // Reset other states
    setIsFinished(false)
    setIsPlayerWin(false)
    setScore(0)
    setUserChoiceId([])
  }

  function handleCardClick(event, id) {
    // console.log("clicked on", id)

    // Update userChoices
    setUserChoiceId((prevArray) => [...prevArray, id])

    //
    setShapesArray((prevArray) =>
      prevArray.map((obj) => {
        return obj.id === id ? { ...obj, isHidden: false } : obj
      })
    )
  }

  function showSolution() {
    setShapesArray((prevArray) =>
      prevArray.map((obj) => ({ ...obj, isHidden: false }))
    )
    setIsFinished(true)
    window.clearTimeout(myTimer)
    setMyTimer(null)
  }

  const cardElements = shapesArray.map((obj, idx) => {
    return (
      <Card
        key={idx}
        objDebug={obj}
        src={obj.src}
        isHidden={obj.isHidden}
        isClickable={obj.isClickable}
        handleClick={(event) => handleCardClick(event, obj.id)}
      />
    )
  })

  return (
    <div className="App">
      <Header />
      <Difficulty value={difficulty} handleChange={handleDifficultyChange} />
      <div className="container">{cardElements}</div>
      <div>{`Pairs found: ${score}/${shapesArray.length / 2}`}</div>
      <div className="win-text">{isPlayerWin && "You WIN!!"}</div>
      {isFinished ? (
        <button onClick={resetGame}>Again</button>
      ) : (
        <button onClick={showSolution}>Answers!</button>
      )}
      <Footer />
    </div>
  )
}

export default App
