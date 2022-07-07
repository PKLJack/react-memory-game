import React from "react"
import { ReactComponent as GithubIcon } from "../assets/GithubIcon.svg"

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        Made by
        <a href="https://github.com/PKLJack" className="github-link">
          <GithubIcon />
          PKLJack
        </a>
      </div>
      <div><a href="https://github.com/PKLJack/react-memory-game">view source</a></div>
      <div>
        Build with <strong className="code">React</strong>
      </div>
    </footer>
  )
}
