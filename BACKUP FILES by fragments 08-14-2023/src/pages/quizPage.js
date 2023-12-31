import "../middleware/quiz/testquiz.css";
import { useState } from "react";
import { Box } from '@mui/material';
import Menu from "../middleware/quiz/Menu";
import Quiz from "../middleware/quiz/Quiz";
import EndScreen from "../middleware/quiz/EndScreen";

import { GameStateContext } from "../middleware/quiz/helpers/Contexts";
// ['menu', 'playing', 'finished']
function QuizPage() {
  const [gameState, setGameState] = useState("playing");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);

  return (
    <Box className="App">
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          userName,
          setUserName,
          score,
          setScore,
        }}
      >
        {gameState === "menu" && <Menu />}
        {gameState === "playing" && <Quiz />}
        {gameState === "finished" && <EndScreen />}
      </GameStateContext.Provider>
    </Box>
  );
}

export default QuizPage;
