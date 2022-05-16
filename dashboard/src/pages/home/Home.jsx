import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { userData } from "../../dummyData";
import { useState, useEffect } from "react";
import useAuth from "../../auth/useAuth";
import SearchWidget from "../../components/searchWidget/SearchWidget";
import Title from "../../components/title/Title";
import CrudTable from "../../components/crudtable/CrudTable";
import ReactPaginate from "react-paginate";
import { Loader } from "../../components/loader/Loader";
/* import { Dash } from "../../components/dashboard/Dash"; */
import "./home.css";

const initialDb = [
  {
    id: null,
    projectAddress: "",
    status: "",
    company: "",
    dataCreated: "",
  },
];

export default function Home() {
  const auth = useAuth();
  const [search, setSearch] = useState("");
  const [db, setDb] = useState(initialDb);
  const [user, setUser] = useState(auth.clientid);
  const [items, setItems] = useState([]);
  const [company, setCompany] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [loading, setLoading] = useState(false);

  /*   let urlapigetall = "https://34.125.79.13:5000/api/getallproject";
  let urlapiget = "https://34.125.79.13:5000/api/get"; */
  let urlapigetall = "https://server.vrealism.com:5000/api/getallproject";
  let urlapiget = "https://server.vrealism.com:5000/api/get";

  /*  let urlapigetall = "http://45.33.102.146:5000/api/getallproject";
  let urlapiget = "http://45.33.102.146:5000/api/get"; */

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  const companies = [
    {
      id: 1,
      name: "GMBC",
    },
    {
      id: 2,
      name: "Wisebuilders",
    },
    {
      id: 3,
      name: "Diego Valencia",
    },
    {
      id: 4,
      name: "Bay Remodeling",
    },
    {
      id: 5,
      name: "InnovoBuilders",
    },
    {
      id: 6,
      name: "Liane Carter Interiors",
    },
    {
      id: 7,
      name: "Nuvision Construction",
    },
    {
      id: 8,
      name: "Oasis Home Design",
    },
    {
      id: 9,
      name: "Oro Coast Builders",
    },
    {
      id: 10,
      name: "Velvet Home Staging",
    },
    {
      id: 11,
      name: "Tiffany",
    },
    {
      id: 12,
      name: "Sunny",
    },
    {
      id: 13,
      name: "Sueling",
    },
    {
      id: 14,
      name: "Karen",
    },
    {
      id: 15,
      name: "Mr. & Mrs",
    },
    {
      id: 16,
      name: "Deco Builders",
    },
    {
      id: 17,
      name: "Independent",
    },
    {
      id: 18,
      name: "Architec or Home Designer",
    },
    {
      id: 19,
      name: "Vrealism",
    },
  ];
  const companiestosingle = [
    {
      name: "GMBC",
    },
    {
      name: "Wisebuilders",
    },
    {
      name: "Diego Valencia",
    },
    {
      name: "Bay Remodeling",
    },
    {
      name: "InnovoBuilders",
    },
    {
      name: "Liane Carter Interiors",
    },
    {
      name: "Nuvision Construction",
    },
    {
      name: "Oasis Home Design",
    },
    {
      name: "Oro Coast Builders",
    },
    {
      name: "Velvet Home Staging",
    },
    {
      name: "Tiffany",
    },
    {
      name: "Sunny",
    },
    {
      name: "Sueling",
    },
    {
      name: "Karen",
    },
    {
      name: "Mr. & Mrs",
    },
    {
      name: "Deco Builders",
    },
    {
      name: "Independent",
    },
    {
      name: "Architec or Home Designer",
    },
    {
      name: "Vrealism",
    },
  ];
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

  /*   console.log(auth.user);
  console.log(auth.id);
  console.log(auth.type);
  console.log(auth.role);
  console.log(auth.client);
  console.log(auth.clientid); */

  //Consulta del home que trae el id de la compañia con el id del cliente//
  /*   useEffect(() => {
    fetch("http://34.125.46.204:5000/api/getcompanybyclient", {
      method: "POST",
      body: JSON.stringify({
        user,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setCompany(res[0].Company_com_id);
      });
  }, [user]); */
  //Consulta del home que trae el id de la compañia con el id del cliente//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Consulta del home que trae el nombre de la compañia por su id//
  /*   useEffect(() => {
    fetch("http://34.125.46.204:5000/api/getnamecompanybyid", {
      method: "POST",
      body: JSON.stringify({
        company,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setCompanyname(res[0].com_name);
      });
  }, [company]); */

  //Consulta del home que trae el nombre de la compañia por su id//
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Consulta del home que trae projectos con el id del cliente//
  useEffect(() => {
    fetch(auth.type === "superadmin" ? urlapigetall : urlapiget, {
      method: "POST",
      body: JSON.stringify({
        user,
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
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }, []);
  //Consulta del home que trae projectos con el id del cliente//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  const handlePageClick = (data) => {};
  return (
    <div className="home">
      <br />
      <FeaturedInfo />
      <br />
      <Chart
        data={userData}
        title="Projects this week"
        grid
        dataKey="Project User"
      />
      <br />
      <Title title="Find a project" />
      <SearchWidget search={search} setSearch={setSearch} />
      <br />
      <Title title="Current projects" />
      {loading && <Loader />}
      {db && (
        <CrudTable
          data={db.filter((item) =>
            item.projectAddress.toLowerCase().includes(search.toLowerCase())
          )}
          setDb={setDb}
        />
      )}

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={12}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}
