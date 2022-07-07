import React from "react"
import { ReactSVG } from "react-svg"
import { blankCard } from "../data"

export default function Card(props) {
  // console.log(props.objDebug, props.src)

  const classNames = [
    "card",
    props.isHidden ? "hidden" : "",
    props.isHidden && props.isClickable ? "clickable" : "",
  ].join(" ")

  let handleClick

  if (props.isHidden && props.isClickable) {
    handleClick = props.handleClick
  } else {
    handleClick = () => {}
  }

  return (
    <ReactSVG
      src={props.isHidden ? blankCard.src : props.src}
      className={classNames}
      onClick={handleClick}
      beforeInjection={(svg) => {
        svg.classList.add("shape-icon")
      }}
    />
  )
}
