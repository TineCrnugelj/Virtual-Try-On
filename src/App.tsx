import {Fragment, useState} from 'react'
import './App.css'
import {useMultiStepForm} from "./hooks/useMultiStepForm";
import Questions from "./components/Questions";

const questions: { id: number, question: string, answers: string[] }[]  = [
  {
    id: 1,
    question: "How old are you?",
    answers: [
        "Option one",
        "Option two",
        'Option three'
    ]
  },
  {
    id: 2,
    question: "How tall are you?",
    answers: [
      "Less than 180cm",
      "More than 180cm",
      '180cm'
    ]
  },
  {
    id: 3,
    question: "What's your favourite color?",
    answers: [
      "Blue",
      "Red",
      'Green',
        'Yellow'
    ]
  }
];

function App() {
  return <Fragment>
    <h1>Virtual Try-On</h1>
    <div className='content'>
      <Questions questions={questions} />
    </div>
  </Fragment>
}

export default App;
