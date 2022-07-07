import { Chance } from "chance"

const DIFFICULTY = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
}

const namesNormal = [
  "circle",
  "diamond",
  "heart",
  "hexagon",
  "pentagon",
  "square",
  "star",
  "triangle",
]

const namesFilled = [
  "circle-fill",
  "diamond-fill",
  "heart-fill",
  "hexagon-fill",
  "pentagon-fill",
  "square-fill",
  "star-fill",
  "triangle-fill",
]

const namesHalf = [
  "circle-half",
  "diamond-half",
  "heart-half",
  "hexagon-half",
  "pentagon-half",
  "square-half",
  "star-half",
  "triangle-half",
]

const blankCard = {
  src: "./images/question-lg.svg",
}

function addSrc(arr) {
  return arr.map((s1) => ({
    name: s1,
    src: `./images/${s1}.svg`,
  }))
}

function fetchData(difficulty = DIFFICULTY.EASY, chanceObj) {
  let stuff

  if (difficulty === DIFFICULTY.HARD) {
    stuff = [...chanceObj.shuffle(namesFilled).slice(0, 6), ...chanceObj.shuffle(namesNormal).slice(0, 6)]
  } else if (difficulty === DIFFICULTY.MEDIUM) {
    stuff = chanceObj.shuffle(namesFilled).slice(0, 8)
  } else {
    // EASY
    stuff = (chanceObj.shuffle(namesFilled)).slice(0, 4)
  }

  return addSrc(stuff)
}
export { blankCard, fetchData, DIFFICULTY }
