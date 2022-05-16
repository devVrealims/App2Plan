import "./label.css";

const Label = ({ text }) => {
  return (
    <div className="label">
      <label>{text}</label>
    </div>
  );
};

export default Label;
