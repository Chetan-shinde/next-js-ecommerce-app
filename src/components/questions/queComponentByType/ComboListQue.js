import { useState } from "react";

export default function ComboListQue({ que, register, showNextQuestion }) {
  const [defaultValue, setDefaultValue] = useState(que.saved_ans);

  function handleChange(v) {
    setDefaultValue(v);
    showNextQuestion(que, v);
  }

  return (
    <div className="combo-list-que que">
      <div className="que_name">
        <h5>{que.que}</h5>
      </div>
      <div className="que_input_box">
        <ul className="list-group">
          {que.que_input_details.map((item, i) => (
            <button
              type="button"
              className={`list-group-item list-group-item-action ${
                defaultValue == item.input_value ? "active" : ""
              }`}
              key={i}
              onClick={() => handleChange(item.input_value)}
            >
              {item.input_value}
            </button>
          ))}
        </ul>
        <input
          type="hidden"
          {...register(`que.que_${que.id}.ans`)}
          value={defaultValue}
        />
      </div>
    </div>
  );
}
