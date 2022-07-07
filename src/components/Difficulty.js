import React from "react"
import { DIFFICULTY } from "../data"

export default function Difficulty(props) {
  return (
    <div className="difficulty-select">
      <label htmlFor="difficulty">Difficulty:</label>
      <select
        value={props.value}
        onChange={props.handleChange}
        name="difficulty"
        id="difficulty"
      >
        <option value={DIFFICULTY.EASY}>Easy</option>
        <option value={DIFFICULTY.MEDIUM}>Medium</option>
        <option value={DIFFICULTY.HARD}>Hard</option>
      </select>
    </div>
  )
}
