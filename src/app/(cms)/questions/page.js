import QuestionsComponent from "@/components/questions/Questions.js";
import questions from "./questions.js";
import "./questions.css";
import ListQuestionComponent from "@/components/questions/ListQuestionComponent.js";

async function getData() {
  return { listview: true };
}

export default async function Questions() {
  const data = await getData();
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Questions</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>
      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 que-wrap">
              {!data.listview ? (
                <QuestionsComponent questions={questions} />
              ) : (
                <ListQuestionComponent questions={questions} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
