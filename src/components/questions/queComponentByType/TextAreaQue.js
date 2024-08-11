export default function TextAreaQUe({ name, que, register, onChange }) {
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        id={`ta_for_${name}`}
        {...register(name, { required: true, onChange: (e) => onChange(e) })}
      ></textarea>
    </div>
  );
}
