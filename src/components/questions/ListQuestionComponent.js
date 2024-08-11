"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import QueWrapper from "./QueWrapper";
import { getListOfMqToShow } from "./queComponentHelper";

export default function ListQuestionComponent({ questions }) {
  const { register, handleSubmit, control, setValue, unregister } = useForm();
  const [questionsList, setQuestionsList] = useState(questions);

  function showNextQuestion(question, value) {
    const upDateQueList = getListOfMqToShow(question, value, questionsList);
    setQuestionsList(upDateQueList);
  }

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="list-form">
      {questionsList.map((que) => {
        return (
          que.show && (
            <QueWrapper
              que={que}
              register={register}
              control={control}
              setValue={setValue}
              key={que.id}
              showNextQuestion={showNextQuestion}
              listView={true}
              unregister={unregister}
            ></QueWrapper>
          )
        );
      })}

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
