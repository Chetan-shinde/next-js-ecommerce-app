import ComboListQue from "./queComponentByType/ComboListQue";
import ImgQue from "./queComponentByType/ImgQue";
import RadioQue from "./queComponentByType/RadioQue";
import TextAreaQUe from "./queComponentByType/TextAreaQue";

export default function QueWrapper({
  que,
  register,
  showNextQuestion,
  name,
  onChange,
  control,
  setValue,
  listView,
  unregister,
}) {
  let qc = null; //question component
  switch (que.que_input_type) {
    case "RB":
      qc = (
        <RadioQue
          que={que}
          register={register}
          showNextQuestion={showNextQuestion}
          listView={listView}
          unregister={unregister}
        />
      );
      break;
    case "CO":
      qc = (
        <ComboListQue
          que={que}
          register={register}
          showNextQuestion={showNextQuestion}
          listView={listView}
          unregister={unregister}
        />
      );
      break;
    case "TA":
      qc = (
        <TextAreaQUe
          que={que}
          register={register}
          name={name}
          onChange={onChange}
        />
      );
      break;
    case "IMG":
      qc = (
        <ImgQue
          que={que}
          showNextQuestion={showNextQuestion}
          control={control}
          setValue={setValue}
          listView={listView}
        />
      );
      break;
    default:
      break;
  }
  return <>{qc}</>;
}
