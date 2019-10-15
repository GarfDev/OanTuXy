import React, { useState } from 'react';
import './App.css';
import ChoiceCard from "./components/ChoiceCard";
import HistoryBoard from "./components/HistoryBoard"

export const getRoundOutcome = userChoice => {
  const computerChoice = getRandomChoice().name;
  let result;

  if (userChoice === "rock") {
    result = computerChoice === "scissors" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "paper") {
    result = computerChoice === "rock" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "scissors") {
    result = computerChoice === "paper" ? "Victory!" : "Defeat!";
  }

  if (userChoice === computerChoice) result = "Tie game!";

  return [result, computerChoice];
};
export const getRandomChoice = () => {
  let choiceNames = Object.keys(CHOICES); // returns an array of the keys, so: ['scissors', 'paper', 'rock']
  let randomIndex = Math.floor(Math.random() * 3); // either 0, 1, or 2
  let choiceName = choiceNames[randomIndex];
  return CHOICES[choiceName];
};

export const CHOICES = {
  scissors: {
    name: "scissors",
    url: "http://www.pngmart.com/files/1/Scissors-PNG-Pic.png"
  },
  paper: {
    name: "paper",
    url: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
  },
  rock: {
    name: "rock",
    url:
      "https://opengameart.org/sites/default/files/forum-attachments/very%20simple%20rock_0.png"
  }
};


function App() {
  const [isGameStarted, setGameStarted] = useState(false)
  const [username, setUsername] = useState('')
  const DEFAULT_IMG = "http://www.thewateringhole.co.uk/wp-content/uploads/2012/12/play.png";
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const [prompt, setGamePrompt] = useState("1, 2, 3, SHOOT!");
  const [previousWinner, setPreviousWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  // console.log(gameHistory)

  function NavibarStyler(startedofnot, username){
    if(startedofnot){
        return(<p id="username-p">{`Welcome back, ${username}`}</p>)
    }else{
        return(
        <div>
          <input id="input-username" placeholder="What is your name?" onChange={event => setUsername(event.target.value)}></input>
          <button id="username-button"onClick={() => setGameStarted(true)}><i class="fas fa-play"></i></button>
        </div>
        )
    }
  }

  const onPlayerChoose = playerChoice => {
    if (isGameStarted === true) {
      const [result, compChoice] = getRoundOutcome(playerChoice);
      const newUserChoice = CHOICES[playerChoice];
      const newComputerChoice = CHOICES[compChoice];
      if (result === "Victory!") {
        setPreviousWinner("You");
      } else if (result === "Defeat!") {
        setPreviousWinner("Computer");
      } else {
        setPreviousWinner("Tie");
      }
      setPlayerChoice(newUserChoice);
      setComputerChoice(newComputerChoice);
      setGamePrompt(result);
      gameHistory.unshift({ uChoice: newUserChoice.name, cChoice: newComputerChoice.name, res: result });
      setGameHistory(gameHistory);
    }

  };

  return (
    <div className="App">
      <nav className={`navbar navbar-nav navbar-expand-md sticky-top`}>
        <div className="col-md-4 order-0">
        </div>
        <div className="col-md-4 order-1">
          <a className="navbar-brand" href="#"><img src="https://i.imgur.com/gKiwjFu.png" width="64" id="GarfieldIMG"></img></a>
        </div>
        <div className="col-md-4 order-2">
          {NavibarStyler(isGameStarted, username)}
        </div>
      </nav>

      <div className="result">
        <h1>{prompt}</h1>
      </div>
      <div className="container-fluid main-game">
        <ChoiceCard
          title="Computer"
          previousWinner={previousWinner}
          imgURL={computerChoice && computerChoice.url} />
        <ChoiceCard
          title="You"
          previousWinner={previousWinner}
          imgURL={playerChoice && playerChoice.url} />
      </div>
      <div className="container user-play">
        <button className="btn btn-success btn-lg" onClick={() => onPlayerChoose("rock")}>
          Rock
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => onPlayerChoose("paper")}>
          Paper
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => onPlayerChoose("scissors")}>
          Scissors
        </button>
      </div>
      <HistoryBoard
        his={gameHistory} />
    </div>
  );
}



export default App;


