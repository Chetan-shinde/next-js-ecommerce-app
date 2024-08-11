import { useReducer, useState } from "react";
import QueWrapper from "../QueWrapper";

export default function RadioQue({
  que,
  register,
  showNextQuestion,
  listView,
  unregister,
}) {
  const [defaultValue, setDefaultValue] = useState(que.saved_ans);
  const [subQues, setSUbQues] = useState([]);
  const [contibueBtnVisibilty, setContinueBtnVisibility] = useState(false);
  const [state, dispatch] = useReducer();
  const registeroptions = {};

  function handleChange(item) {
    setDefaultValue(item.input_value);
    if (subQues.length > 0) {
      subQues.map((sQue) => {
        unregister(`que.que_${que.id}.subque.subque_${sQue.id}.ans`);
      });
    }
    setSUbQues(item.sub_ques_list);

    if (item.sub_ques_list.length == 0 && !listView) {
      setContinueBtnVisibility(false);
    }

    showNextQuestion(que, defaultValue);
  }

  function handleSubQueChange(e) {
    if (!listView) {
      setContinueBtnVisibility(true);
    }
  }

  function handleContinueChange() {
    if (!listView) {
      showNextQuestion(que, defaultValue);
    }
  }

  let c = 0;
  return (
    <div className="radio_que que">
      <div className="que_name">
        <h5>{que.que}</h5>
      </div>
      <div className="que_input_box">
        {que.que_input_details.map((item, i) => {
          c++;
          return (
            <div className="form-check" key={i}>
              <input
                type="radio"
                className="form-check-input"
                id={`radio_${que.id}_${c}`}
                {...register(`que.que_${que.id}.ans`, { required: true })}
                value={item.input_value}
                checked={item.input_value === defaultValue}
                onChange={() => handleChange(item)}
              />
              <label
                className="form-check-label"
                htmlFor={`radio_${que.id}_${c}`}
              >
                {item.input_value}
              </label>
            </div>
          );
        })}
      </div>
      {subQues &&
        subQues.length > 0 &&
        subQues.map((subQue) => {
          return (
            <QueWrapper
              key={`${que.id}_${subQue.id}`}
              que={subQue}
              register={register}
              name={`que.que_${que.id}.subque.subque_${subQue.id}.ans`}
              onChange={handleSubQueChange}
            ></QueWrapper>
          );
        })}
      {contibueBtnVisibilty && (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleContinueChange}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
