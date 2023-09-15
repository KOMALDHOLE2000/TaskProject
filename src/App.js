import React, { useState } from 'react';
import './App.css';
import Accordion from './components/Accordion';
import Header from './components/Header';
import { accordionQuestions } from './data/data';

const App = () => {

  const [accordionData, setAccordionData] = useState(accordionQuestions);
  const handleAnswerChange = (accordionIndex, questionIndex, answer) => {

    const updatedAccordionData = [...accordionData];

    updatedAccordionData[accordionIndex].questions[questionIndex].Answer = answer;

    if (updatedAccordionData[accordionIndex].questions[questionIndex].defaultAnswer !== updatedAccordionData[accordionIndex].questions[questionIndex].Answer) {
      updatedAccordionData[accordionIndex].questions[questionIndex].defaultAnswer = updatedAccordionData[accordionIndex].questions[questionIndex].Answer;
    }

    // Check if all questions in the current section are 'Yes' or 'NA'
    if (
      updatedAccordionData[accordionIndex].questions.every(
        (q) => q.Answer === 'Yes' || q.Answer === 'NA'
      )) {
      // Make the next section editable
      if (accordionIndex < accordionData.length - 1) {
        updatedAccordionData[accordionIndex + 1].editable = true;
      }
    } else {
      // If any question is 'No', make the next section non-editable
      if (accordionIndex < accordionData.length - 1) {
        updatedAccordionData[accordionIndex + 1].editable = false;
      }
    }

    setAccordionData(updatedAccordionData);
  };


  return (
    <div className="container flex flex-col">
      <Header />
      <ul>
        <li>
          {accordionData.map((accordion, index) => (
            <Accordion
              className="accordion"
              key={index}
              title={accordion.title}
              questions={accordion.questions}
              onAnswerChange={(questionIndex, answer) => handleAnswerChange(index, questionIndex, answer)}
              editable={accordion.editable}
            />
          ))}
        </li>
      </ul>
    </div>
  );
};

export default App;
