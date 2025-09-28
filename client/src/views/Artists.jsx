import DataContainer from "../components/data-container";
import data from '../page-content/artists.json';
import "../css/multiuse.css"

const Artists = () => {
  return (
    <div className="pageContent">
      {/* Page Header */}
      <div className="header">
        <h1>{data.title}</h1>
        <h4>{data.description}</h4>
      </div>
      {/* Item Container */}
      <DataContainer dataGroup={data.items} />
    </div>
  )
}

export default Artists