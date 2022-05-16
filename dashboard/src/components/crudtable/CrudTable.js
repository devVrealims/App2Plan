import CrudTableRow from "../crudtablerow/CrudTableRow";
import "./crudtable.css";
export default function CrudTable({ data, setDb }) {
  return (
    <table className="table" name="table">
      <thead
        style={{
          backgroundColor: "#031122",
          color: "white",
          textAlign: "center",
          opacity: "0.8",
        }}
      >
        <tr>
          <th>Project Address</th>
          <th>Date Created</th>
          <th>Status</th>
          <th>Company</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el) => (
          <CrudTableRow el={el} key={el.id} setDb={setDb} />
        ))}
      </tbody>
    </table>
  );
}
