import "./crudtablerow.css";
import { useState, useEffect } from "react";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import moment from "moment";
export default function CrudTableRow({ el, setDb }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [backdate, setBackdate] = useState(el.dataCreated);
  const [deleteid, setDeleteid] = useState("");
  const companiestosingleobject = [
    "GMBC",
    "Wisebuilders",
    "Diego Valencia",
    "Bay Remodeling",
    "InnovoBuilders",
    "Liane Carter Interiors",
    "Nuvision Construction",
    "Oasis Home Design",
    "Oro Coast Builders",
    "Velvet Home Staging",
    "Tiffany",
    "Sunny",
    "Sueling",
    "Karen",
    "Mr. & Mrs",
    "Deco Builders",
    "Independent",
    "Architec or Home Designer",
    "Vrealism",
  ];

  const handleClick = (e) => {
    e.preventDefault();
    auth.setProjid(el.id);
    navigate("/edit");
  };
  const handleInfo = (e) => {
    e.preventDefault();
    auth.setProjid(el.id);
    navigate("/info");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    //auth.setProjid(el.id);
    setDeleteid(el.id);
  };

  useEffect(() => {
    fetch("https://server.vrealism.com:5000/delete/home/project", {
      method: "POST",
      body: JSON.stringify({
        deleteid,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.map((items) => ({
          id: items.proj_id,
          projectAddress: items.proj_address,
          status: items.proj_status,
          company: companiestosingleobject[items.proj_houseOwnerName - 1],
          dataCreated: items.proj_dateCreated,
        }));
        setDb(data);
      });
  }, [deleteid]);

  return (
    <tr className="tablerow">
      <td>
        <a href="" onClick={(e) => handleInfo(e)}>
          {el.projectAddress}
        </a>
      </td>
      <td>{moment.utc(backdate).format("MMM Do YYYY")}</td>
      <td>{el.status}</td>
      <td>{el.company}</td>
      <td>
        <InfoIcon
          role="button"
          style={{ color: "orange" }}
          onClick={(e) => handleInfo(e)}
        />
        <EditIcon
          role="button"
          style={{ color: "rgb(64, 192, 243)" }}
          onClick={(e) => handleClick(e)}
        />
        <DeleteForeverIcon
          role="button"
          style={{ color: "#eb2b54" }}
          onClick={(e) => handleDelete(e)}
        />
      </td>
    </tr>
  );
}
