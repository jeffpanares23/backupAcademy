import { useEffect, useState } from 'react';
import Axios from 'axios';

export default function QuizData() {
     const [quizData, setQuizData] = useState({ E: '', email: '' });

     useEffect(() => {
          const fetchQuiz = async () => {
               try {
                    const response = await Axios.get(`http://localhost:8000/fetchQuiz`);
                    const quiz = response.data;
                    if (quiz.length > 0) {
                         // console.log(quiz);
                         setQuizData(quiz);
                    }

               } catch (error) {
                    console.error('Error fetching user data:', error);
               }
          };
          fetchQuiz();
     }, []);

     return quizData;
}
