import "../css/multiuse.css"
const BasicButton = ({link, title}) => {
  return (
    <div>
      <a href={link}>
        <button className="containerButton">
          {title}
        </button>
      </a>
    </div>
  );
};

export default BasicButton;