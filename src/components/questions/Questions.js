"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import QueWrapper from "./QueWrapper";
import { getListOfMqToShow } from "./queComponentHelper";

export default function QuestionsComponent({ questions }) {
  const { register, handleSubmit, control, setValue, unregister } = useForm();
  const [questionsList, setQuestionsList] = useState(questions);
  const [currentQueIndex, setCurrentQueIndex] = useState(0);
  const [submitBtnVisibility, setSubmitBtnVisibility] = useState(false);

  function setNextQuestion(questionsList) {
    let flag = true;
    let nextQueIndex = currentQueIndex + 1;

    let lastQuestion = false;
    while (flag) {
      if (nextQueIndex > questionsList.length - 1) {
        flag = false;
        lastQuestion = true;
        break;
      }
      let nextQue = questionsList[nextQueIndex];

      if (nextQue.show) {
        flag = false;
      } else {
        nextQueIndex++;
      }
    }
    if (lastQuestion) {
      setSubmitBtnVisibility(true);
    } else {
      setCurrentQueIndex(nextQueIndex);
    }
  }

  const onSubmit = (data) => console.log(data);

  function showNextQuestion(question, value) {
    const upDateQueList = getListOfMqToShow(question, value, questionsList);

    setQuestionsList(upDateQueList);
    setNextQuestion(upDateQueList);
  }

  const currentQue = questionsList[currentQueIndex];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <QueWrapper
        que={currentQue}
        register={register}
        showNextQuestion={showNextQuestion}
        control={control}
        setValue={setValue}
      ></QueWrapper>
      {submitBtnVisibility && (
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      )}
    </form>
  );
}
