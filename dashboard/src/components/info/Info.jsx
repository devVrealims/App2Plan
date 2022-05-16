import "./info.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SaveIcon from "@mui/icons-material/Save";
import InfoIcon from "@mui/icons-material/Info";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import {
  Form,
  Button,
  FloatingLabel,
  FormGroup,
  Label,
  Nav,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { width } from "@mui/system";
//import Goopicker from "../googledrive/GooglePicker";
import { Pdfviewer } from "../pdf/Pdfviewer";
import { Pdfview } from "../pdfviewer/Pdfview";
import { Reactpdfs } from "../reactpdf/Reactpdfs";
import Gapi from "../googledrive/Gapi";
//import { Goodrive } from "../googledrive/Goodrive";
//import Goopicker from "../googledrive/GooPicker";

const Info = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [idproj, setIdproj] = useState(auth.projid);
  const [form, setForm] = useState([]);
  const [clientcliid, setClientcliid] = useState("");
  const [homeownername, setHomeownername] = useState("");
  const [homeaddress, setHomeaddress] = useState("");
  const [sqft, setSqft] = useState("");
  const [projdatecreate, setProjectdatecreate] = useState("");
  const [contractor, setContractor] = useState({});
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [services, setServices] = useState([]);
  const [servicestable, setServicestable] = useState([]);
  const [surveyor, setSurveyor] = useState("");
  const [drafter, setDrafter] = useState("");
  const [details, setDetails] = useState("");
  const [note, setNote] = useState("");
  const [iframecontainer, setIframecontainer] = useState([]);
  const [iframecontainertwo, setIframecontainertwo] = useState([]);
  const [downloadcontainer, setDownloadcontainer] = useState([]);
  const [waveappid, setWaveappid] = useState("");
  const [waveappstatus, setWaveappstatus] = useState("");
  const [linkwaveapp, setLinkwaveapp] = useState("");
  const [iframelink, setIframelink] = useState(
    "https://poly.cam/capture/74EDE752-7F6A-415A-85F6-67044198734A"
    /* " https://drive.google.com/drive/u/1/folders/16DJkOuzpV2FM7oldKixoygzpFTdYpool" */
  );
  const [iframelinktwo, setIframelinktwo] = useState(
    /* "https://poly.cam/capture/74EDE752-7F6A-415A-85F6-67044198734A" */
    " https://drive.google.com/drive/u/1/folders/16DJkOuzpV2FM7oldKixoygzpFTdYpool"
  );

  const [projectfolders, setProjectfolders] = useState([]);
  const clients = [
    {
      id: 1,
      name: "admin",
    },
    {
      id: 2,
      name: "wisebuilders",
    },
    {
      id: 3,
      name: "vrealism",
    },
    {
      id: 4,
      name: "diego",
    },
    {
      id: 5,
      name: "amit",
    },
    {
      id: 6,
      name: "karen",
    },
    {
      id: 7,
      name: "liane",
    },
    {
      id: 8,
      name: "sunny",
    },
    {
      id: 9,
      name: "tester",
    },
    {
      id: 10,
      name: "gmbc",
    },
    {
      id: 19,
      name: "Developer",
    },
    {
      id: 20,
      name: "Alejandro Vargas",
    },
    {
      id: 21,
      name: "Alejandro Carvajal",
    },
  ];
  const initialChat = [
    {
      id: null,
      client: "",
      sms: "",
    },
  ];
  const [chats, setChats] = useState(initialChat);
  const [currentclient, setCurrentclient] = useState(auth.clientid);
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

  //useEffect//
  //Bring all  proj´s table by projid//
  useEffect(() => {
    /*  fetch("http://34.125.79.13:5000/api/getprojbyid", { */
    fetch("https://server.vrealism.com:5000/api/getprojbyid", {
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setClientcliid(res[0].client_cli_id);
        setForm(res);
        setClientcliid(res[0].client_cli_id);
        setHomeaddress(res[0].proj_address);
        setSurveyor(res[0].surveyor);
        setDrafter(res[0].architec);
        setSqft(res[0].squarefeet);
        const dateback = res[0].proj_dateCreated;
        const dateformat = new Date(dateback);
        const utc = new Intl.DateTimeFormat("en-US", {
          timeZone: "UTC",
          dateStyle: "full",
          //timeStyle: "long",
        }).format(dateformat);
        setProjectdatecreate(utc);
        setHomeownername(res[0].home_owner_name);
        setDetails(res[0].proj_description);
        setCompany(companiestosingleobject[res[0].proj_houseOwnerName - 1]);
        setStatus(res[0].proj_status);
        const clientid = res[0].client_cli_id;
        fetch("https://server.vrealism.com:5000/api/clientnamebyid", {
          /*  fetch("http://34.125.79.13:5000/api/clientnamebyid", { */
          method: "POST",
          body: JSON.stringify({
            clientid,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((json) => {
            setContractor(json[0].cli_name);
          });
      });
  }, []);
  //Bring all  proj´s table by projid//

  //Bring all chats by projid//
  useEffect(() => {
    /*   fetch("http://34.125.79.13:5000/api/getsms", { */
    fetch("https://server.vrealism.com:5000/api/getsms", {
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.map((items) => ({
          id: items.id,
          client: clients.find((el) => items.id_client === el.id),
          sms: items.sms,
        }));
        setChats(data);
        //console.log(data);
      });
  }, []);
  //Bring all chats by projid//

  //Bring all project_services_table by projid//
  useEffect(() => {
    /*  fetch("http://34.125.79.13:5000/api/getservbyid", { */
    fetch("https://server.vrealism.com:5000/api/getservbyid", {
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setServices(json));
  }, []);
  //Bring all project_services_table by projid//

  //Bring all services table//
  useEffect(() => {
    /*    fetch("http://34.125.79.13:5000/api/servicestable") */
    fetch("https://server.vrealism.com:5000/api/servicestable")
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setServicestable(res);
      });
  }, []);
  //Bring all services table//
  //Bring project link folders by projid //
  useEffect(() => {
    /*  fetch("http://34.125.79.13:5000/api/getprojfilesbyid", { */
    fetch("https://server.vrealism.com:5000/api/getprojfilesbyid", {
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        //setServices(res);
        setProjectfolders(res);
      });
  }, []);
  //Bring project link folders by projid //
  //Bring the invoice information//
  useEffect(() => {
    /* fetch("http://34.125.79.13:5000/api/getinvoice", { */
    fetch("https://server.vrealism.com:5000/api/getinvoice", {
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        //setServices(res);
        setWaveappid(res[0].num_invoice);
        setWaveappstatus(res[0].inv_status);
        setLinkwaveapp(res[0].linkapp);
      });
  }, []);
  //Bring the invoice information//
  //useEffect//

  //Functions//
  //sending sms from chat//
  const submitsms = (e) => {
    e.preventDefault();
    if (note === "") {
      alert("text a sms");
      return false;
    }
    /*  fetch("http://34.125.79.13:5000/chat/sms", { */
    fetch("https://server.vrealism.com:5000/chat/sms", {
      method: "POST",
      body: JSON.stringify({
        idproj,
        note,
        currentclient,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const data = json.map((items) => ({
          id: items.id,
          client: clients.find((el) => items.id_client === el.id),
          sms: items.sms,
        }));

        // console.log(data);
        setChats(data);
        setNote("");
      });
  };
  //sending sms from chat//

  /*  */
  /* SEPARATOR */
  /*  */

  //getting links to iframe zone //
  const iframeContainer = (e) => {
    e.preventDefault();
    const data = projectfolders.filter((elex) => {
      if (elex.projfile_linkType === e.target.id) {
        return {
          key: elex.projfile_id,
          id: elex.projfile_id,
          linktype: elex.projfile_linkType,
          link: elex.projfile_link,
        };
      }
    });
    setIframecontainer(data);
  };
  //getting links to iframe zone //

  /*  */
  /* SEPARATOR */
  /*  */

  //getting links to iframe zone2 //
  const iframeContainertwo = (e) => {
    e.preventDefault();
    const data = projectfolders.filter((elex) => {
      if (elex.projfile_linkType === e.target.id) {
        return {
          key: elex.projfile_id,
          id: elex.projfile_id,
          linktype: elex.projfile_linkType,
          link: elex.projfile_link,
        };
      }
    });
    setIframecontainertwo(data);
  };
  //getting links to iframe zone2 //

  /*  */
  /* SEPARATOR */
  /*  */

  //getting links to files download zone //
  useEffect(() => {
    const data = projectfolders.filter((elex) => {
      if (
        (elex.projfile_linkType === "floorplan") +
        (elex.projfile_linkType === "roofplan") +
        (elex.projfile_linkType === "siteplan") +
        (elex.projfile_linkType === "elevation")
      ) {
        return {
          key: elex.projfile_id,
          id: elex.projfile_id,
          linktype: elex.projfile_linkType,
          link: elex.projfile_link,
        };
      }
    });
    setDownloadcontainer(data);
  }, [projectfolders]);

  //console.log(downloadcontainer);

  //getting links to files download zone //

  //console.log(projectfolders);
  /*  */
  /* SEPARATOR */
  /*  */

  //getting  number of files for badget//
  const callbacklenght = (back) => {
    return projectfolders.filter((typex) => typex.projfile_linkType === back)
      .length;
  };
  //getting  number of files for badget//

  //getting  number of files for download badget//
  const callbackdownloadlenght = (back) => {
    return projectfolders.filter(
      (typex) =>
        /*     typex.projfile_linkType === back && */
        (typex.projfile_linkType === "siteplan") +
        (typex.projfile_linkType === "elevation") +
        (typex.projfile_linkType === "floorplan") +
        (typex.projfile_linkType === "roofplan")
    ).length;
  };
  //getting  number of files for download badget//

  //Functions//

  return (
    /* Main Wrapper Flex Column initial */
    <div className="initial">
      {/* LINKS TITLE Form.Group */}
      <Form.Group
        style={{
          width: "1200px",
          height: "100px",
          /*     border: "dotted 2px white", */
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            color: "#eb2b54",
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "20px",
            marginLeft: "50px",
          }}
        >
          Project details
        </p>
        <KeyboardReturnIcon
          role="button"
          style={{
            marginTop: "35px",
            marginLeft: "650px",
            fontSize: "40px",
            color: "#eb2b54",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <small
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#ffffff",
            marginTop: "35px",
          }}
          role="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Return
        </small>
        <HomeIcon
          role="button"
          style={{
            marginLeft: "30px",
            marginTop: "36px",
            fontSize: "30px",
            color: "#eb2b54",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <small
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#ffffff",
            marginTop: "36px",
          }}
          role="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit
        </small>
      </Form.Group>
      {/* LINKS TITLE Form.Group */}

      {/* MAIN MIDDLE  FORM AND CHAT  form group*/}
      <Form.Group
        style={{
          width: "1200px",
          /* height: "calc(263vh - 50px)", */
          height: "auto",
          /* border: "dotted 2px yellow", */
          marginLeft: "0px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* FORM INFORMATION AND IFRAME */}
        <Form.Group
          style={{
            width: "800px",
            /* height: "calc(252vh - 50px)", */
            height: "auto",
            marginLeft: "20px",
            /*   border: "dotted 2px orange", */
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            borderRadius: "2%",
            paddingTop: "10px",
            paddingLeft: "5px",
          }}
        >
          {/* Project sqft date  */}
          <Form.Group style={{ display: "flex" }}>
            <p
              style={{
                marginTop: "26px",
                fontWeight: "bold",
                marginLeft: "20px",
                /*   border: "dotted 1px blue", */
                fontSize: "20px",
              }}
            >
              Project
            </p>
            <p
              style={{
                fontSize: "14px",
                marginTop: "33px",
                marginLeft: "10px",
                width: "320px",
                /*   border: "dotted 1px black", */
              }}
            >
              {homeaddress}
            </p>
            <p
              style={{
                marginTop: "30px",
                marginLeft: "-1px",
                width: "60px",
                /* border: "dotted 1px green", */
              }}
            >
              {sqft}
            </p>
            <p
              style={{
                marginTop: "30px",
                marginLeft: "-7px",
                fontWeight: "bold",
                /* border: "dotted 1px pink", */
              }}
            >
              sqft
            </p>

            <p
              style={{
                width: "60px",
                marginLeft: "50px",
                marginTop: "30px",
                fontWeight: "bold",
                /*   border: "dotted 1px black", */
              }}
            >
              Date Created
            </p>
            <p
              style={{
                marginTop: "30px",
                marginLeft: "15px",
                marginRight: "15px",
                width: "150px",
                /*   border: "dotted 1px red", */
              }}
            >
              {projdatecreate}
            </p>
          </Form.Group>
          {/* Project sqft date   */}
          {/* id status */}
          <Form.Group style={{ display: "flex" }}>
            <p
              style={{
                marginTop: "-20px",
                fontWeight: "bold",
                marginLeft: "40px",
              }}
            >
              Id
            </p>
            <p
              style={{ marginTop: "-20px", marginLeft: "10px", width: "50px" }}
            >
              {idproj}
            </p>
            <p
              style={{
                marginTop: "-20px",
                fontWeight: "bold",
                marginLeft: "259px",
              }}
            >
              Status
            </p>
            <p
              style={{ marginTop: "-20px", marginLeft: "36px", width: "50px" }}
            >
              {status}
            </p>
          </Form.Group>
          {/* id status */}
          {/* homeowner company services surveyor drafter */}
          <Form.Group style={{ display: "flex" }}>
            <p
              style={{
                marginTop: "-3px",
                fontWeight: "bold",
                marginLeft: "40px",
              }}
            >
              Home Owner
            </p>
            <p
              style={{ marginTop: "-3px", marginLeft: "10px", width: "200px" }}
            >
              {homeownername}
            </p>
            <p
              style={{
                marginTop: "-3px",
                fontWeight: "bold",
                marginLeft: "25px",
              }}
            >
              Company
            </p>
            <p style={{ marginTop: "-3px", marginLeft: "14px" }}>{company}</p>
          </Form.Group>
          <Form.Group>
            <p
              style={{
                marginTop: "40px",
                fontWeight: "bold",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              Services
            </p>
            <Form.Group style={{ display: "flex", marginLeft: "20px" }}>
              <Form.Group>
                <ul
                  style={{
                    width: "170px",
                    height: "175px",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "flex-start",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    marginLeft: "20px",
                    marginTop: "-10px",
                  }}
                >
                  {servicestable.map((el) =>
                    services.find(
                      (item) => item.services_serv_id === el.serv_id
                    ) ? (
                      <Form.Check
                        key={el.serv_id}
                        style={{ marginLeft: "-30px" }}
                        type="radio"
                        checked={true}
                        label={el.serv_name}
                        onChange={() => {
                          return false;
                        }}
                      />
                    ) : null
                  )}
                </ul>
              </Form.Group>
              <Form.Group
                style={{ display: "flex", marginLeft: "165px", width: "150px" }}
              >
                <p style={{ fontWeight: "bold" }}>Surveyor</p>
                <p style={{ marginLeft: "20px" }}>{surveyor}</p>
              </Form.Group>
              <Form.Group
                style={{
                  display: "flex",
                  marginTop: "40px",
                  marginLeft: "-150px",
                  width: "150px",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Drafter</p>
                <p style={{ marginLeft: "33px" }}>{drafter}</p>
              </Form.Group>
            </Form.Group>
          </Form.Group>
          {/* homeowner company services surveyor drafter */}
          {/*DETAILS */}
          <Form.Group style={{ marginTop: "1px" }}>
            <p
              style={{
                marginTop: "30px",
                fontWeight: "bold",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              Details
            </p>{" "}
            <p
              style={{
                width: "750px",
                height: "80px",
                border: "dotted 2px gray",
                marginLeft: "20px",
                marginTop: "-10px",
                borderRadius: "2%",
                paddingLeft: "5px",
                paddingTop: "2px",
              }}
            >
              {details}
            </p>
          </Form.Group>
          {/* DETAILS */}
          {/* buttons matterport polycam dronedeploy  */}
          <p
            style={{
              marginTop: "70px",
              fontWeight: "bold",
              marginLeft: "20px",
              fontSize: "20px",
            }}
          >
            Files Viewer
          </p>
          <Form.Group
            style={{
              display: "flex",
              marginLeft: "20px",
              marginTop: "-10px",
              width: "750px",
              alignContent: "space-between",
            }}
          >
            <Button
              variant="outline-dark"
              style={{ width: "250px" }}
              onClick={(e) => iframeContainer(e)}
              id="matterport"
            >
              Matterport{" "}
              <Badge
                pill
                bg="success"
                style={{ marginBottom: "4px" }}
                id="matterport"
                onClick={(e) => iframeContainer(e)}
              >
                {callbacklenght("matterport")}
              </Badge>
            </Button>
            <Button
              variant="outline-dark"
              style={{ width: "250px" }}
              onClick={(e) => iframeContainer(e)}
              id="polycam"
            >
              Poly Cam{" "}
              <Badge
                pill
                bg="warning"
                style={{ marginBottom: "4px" }}
                id="polycam"
                onClick={(e) => iframeContainer(e)}
              >
                {callbacklenght("polycam")}
              </Badge>
            </Button>
            <Button
              variant="outline-dark"
              style={{ width: "250px" }}
              id="dronedeploy"
              onClick={(e) => iframeContainer(e)}
            >
              Drone Deploy{" "}
              <Badge
                pill
                bg="danger"
                style={{ marginBottom: "4px" }}
                id="dronedeploy"
                onClick={(e) => iframeContainer(e)}
              >
                {callbacklenght("dronedeploy")}
              </Badge>
            </Button>
          </Form.Group>
          {/* buttons matterport polycam dronedeploy   */}
          {/*  GENERATE LINKS ZONE AND IFRAME  */}
          <Form.Group
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              width: "750px",
              height: "530px",
              border: "dotted 1px gray",
            }}
          >
            <Form.Group
              style={{
                marginTop: "20px",
                marginLeft: "-20px",
                display: "flex",
                flexDirection: "column",
                width: "750px",
                height: "70px",
                fontSize: "10px",
              }}
            >
              <ul
                style={{
                  height: "70px",
                  width: "750px",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-around",
                  alignItems: "initial",
                  justifyContent: "space-around",
                  listStyle: "inside lower-roman",
                }}
              >
                {iframecontainer.map((ele) => (
                  <li style={{ fontSize: "12px", width: "220px" }}>
                    {" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href=""
                      key={ele.projfile_id}
                      onClick={(e) => {
                        e.preventDefault();
                        setIframelink(ele.projfile_link);
                      }}
                    >
                      {/*  {ele.projfile_link} */}
                      {ele.projfile_linkType + ele.projfile_link.slice(1, 25)}
                    </a>
                  </li>
                ))}
              </ul>
            </Form.Group>
            {/* IFRAME ZONE THAT SHOWS IFRAME EVERYLINK */}
            <iframe
              src={iframelink}
              style={{
                marginLeft: "5px",
                marginTop: "5px",
                marginBottom: "5px",
                width: "738px",
                height: "410px",
                border: "dotted 1px gray",
              }}
            />
            {/* IFRAME ZONE THAT SHOWS IFRAME EVERYLINK */}
          </Form.Group>
          {/* GENERATE LINKS ZONE AND IFRAME */}
          {/* Floorplan siteplan roofplan elevation ar */}
          <p
            style={{
              marginTop: "100px",
              fontWeight: "bold",
              marginLeft: "20px",
              fontSize: "20px",
            }}
          >
            Pdf Viewer
          </p>
          {/*   <Pdfviewer /> */}
          <Form.Group
            style={{ display: "flex", marginLeft: "20px", width: "750px" }}
          >
            <Button
              variant="outline-dark"
              style={{ width: "250px", marginTop: "-10px" }}
              id="floorplan"
              onClick={(e) => iframeContainertwo(e)}
            >
              Floor Plan{" "}
              <Badge
                pill
                bg="primary"
                style={{ marginBottom: "4px" }}
                id="floorplan"
                onClick={(e) => iframeContainertwo(e)}
              >
                {callbacklenght("floorplan")}
              </Badge>
            </Button>
            <Button
              variant="outline-dark"
              style={{ width: "250px", marginTop: "-10px" }}
              id="siteplan"
              onClick={(e) => iframeContainertwo(e)}
            >
              Site Plan{" "}
              <Badge
                pill
                bg="success"
                style={{ marginBottom: "4px" }}
                id="siteplan"
                onClick={(e) => iframeContainertwo(e)}
              >
                {callbacklenght("siteplan")}
              </Badge>
            </Button>
            <Button
              variant="outline-dark"
              style={{ width: "250px", marginTop: "-10px" }}
              id="roofplan"
              onClick={(e) => iframeContainertwo(e)}
            >
              Roof Plan{" "}
              <Badge
                pill
                bg="warning"
                style={{ marginBottom: "4px" }}
                id="roofplan"
                onClick={(e) => iframeContainertwo(e)}
              >
                {callbacklenght("roofplan")}
              </Badge>
            </Button>
            <Button
              variant="outline-dark"
              style={{ width: "250px", marginTop: "-10px" }}
              id="elevation"
              onClick={(e) => iframeContainertwo(e)}
            >
              Elevations{" "}
              <Badge
                pill
                bg="danger"
                style={{ marginBottom: "4px" }}
                id="elevation"
                onClick={(e) => iframeContainertwo(e)}
              >
                {callbacklenght("elevation")}
              </Badge>
            </Button>
            <Button
              variant="outline-dark"
              style={{ width: "250px", marginTop: "-10px" }}
              id="ar"
              onClick={(e) => iframeContainertwo(e)}
            >
              AR{" "}
              <Badge
                pill
                bg="black"
                style={{ marginBottom: "4px" }}
                id="ar"
                onClick={(e) => iframeContainertwo(e)}
              >
                {callbacklenght("ar")}
              </Badge>
            </Button>
          </Form.Group>
          {/* Floorplan siteplan roofplan elevation ar */}
          <Form.Group
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              width: "750px",
              height: "530px",
              border: "dotted 1px gray",
            }}
          >
            <Form.Group
              style={{
                marginTop: "20px",
                marginLeft: "-20px",
                display: "flex",
                flexDirection: "column",
                width: "750px",
                height: "70px",
                fontSize: "10px",
              }}
            >
              <ul
                style={{
                  height: "70px",
                  width: "750px",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "space-around",
                  alignItems: "initial",
                  justifyContent: "space-around",
                  listStyle: "inside lower-roman",
                }}
              >
                {iframecontainertwo.map((ele) => (
                  <li style={{ fontSize: "12px", width: "220px" }}>
                    {" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href=""
                      key={ele.projfile_id}
                      onClick={(e) => {
                        e.preventDefault();
                        setIframelinktwo(ele.projfile_link);
                      }}
                    >
                      {/*  {ele.projfile_link} */}
                      {ele.projfile_linkType + ele.projfile_link.slice(1, 25)}
                    </a>
                  </li>
                ))}
              </ul>
            </Form.Group>
            {/* IFRAME ZONE THAT SHOWS IFRAME EVERYLINK */}
            {/* <iframe
              src={iframelinktwo}
              style={{
                marginLeft: "5px",
                marginTop: "5px",
                marginBottom: "5px",
                width: "738px",
                height: "410px",
                border: "dotted 1px gray",
              }}
            /> */}
            <Gapi />
            {/*   <Goopicker /> */}
            {/*  <Goopicker /> */}
            {/* <Pdfviewer /> */}
            {/*  <Pdfview /> */}
            {/*  <Reactpdfs /> */}
            {/*<Goodrive />  */}
            {/* IFRAME ZONE THAT SHOWS IFRAME EVERYLINK */}
          </Form.Group>
          {/* DOWNLOAD */}
          <p
            style={{
              marginTop: "120px",
              marginLeft: "20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Files Downloads
          </p>
          <Form.Group
            style={{
              width: "750px",
              height: "150px",
              border: "dotted 1px black",
              marginLeft: "20px",
              marginTop: "-10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                width: "150px",
                marginLeft: "5px",
                marginTop: "30px",
                /*    border: "dotted 1px black", */
              }}
            >
              <CloudDownloadIcon
                style={{
                  fontSize: "60px",
                  marginTop: "-20px",
                  marginLeft: "27px",
                }}
              />
              <Badge
                pill
                bg="secondary"
                style={{
                  marginLeft: "45px",
                }}
              >
                {/* {callbacklenght("cad")} */}
                {callbackdownloadlenght("cad")}
              </Badge>
              <p style={{ marginTop: "5px", marginLeft: "38px" }}>Files</p>
            </p>
            <Form.Group
              style={{
                width: "600px",
                /*   border: "dotted 1px purple", */
                display: "flex",
              }}
            >
              {downloadcontainer.map((ele) =>
                ele.projfile_linkType === "cad" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <a
                      href="#"
                      style={{ textDecoration: "none" }}
                      key={ele.projfile_id}
                    >
                      <p
                        style={{
                          marginLeft: "32px",
                          fontSize: "9px",
                          marginTop: "30px",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setIframelinktwo(ele.projfile_link);
                        }}
                      >
                        Preview
                      </p>
                    </a>
                    <img
                      src="/img/dwg.png"
                      style={{
                        width: "80px",
                        height: "50px",
                        marginTop: "-10px",
                        marginLeft: "10px",
                      }}
                    />
                    <a
                      href="https://drive.google.com/drive/folders/16DJkOuzpV2FM7oldKixoygzpFTdYpool"
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p
                        style={{
                          marginLeft: "30px",
                          fontSize: "9px",
                          marginTop: "7px",
                          fontWeight: "bold",
                        }}
                      >
                        Download
                      </p>
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href="#"
                      style={{ textDecoration: "none" }}
                      key={ele.projfile_id}
                    >
                      {" "}
                      <p
                        style={{
                          marginLeft: "30px",
                          fontSize: "9px",
                          marginTop: "30px",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setIframelinktwo(ele.projfile_link);
                        }}
                      >
                        {ele.projfile_linkType}
                      </p>
                    </a>
                    <img
                      src="/img/pdf.png"
                      style={{
                        width: "60px",
                        height: "50px",
                        marginTop: "-10px",
                        marginLeft: "20px",
                      }}
                    />
                    <a
                      href={ele.projfile_link}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        style={{
                          marginLeft: "28px",
                          fontSize: "9px",
                          marginTop: "7px",
                          fontWeight: "bold",
                        }}
                      >
                        Download
                      </p>
                    </a>
                  </div>
                )
              )}
            </Form.Group>
          </Form.Group>
          {/* DOWNLOAD */}
          {/* INVOICE */}
          <Form.Group style={{ marginBottom: "15px" }}>
            <p
              style={{
                marginTop: "80px",
                fontWeight: "bold",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              Invoce Information
            </p>
            <hr
              style={{ width: "740px", marginLeft: "20px", marginTop: "-10px" }}
            />
            <Form.Group style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "40px",
                  marginTop: "10px",
                }}
              >
                Wave app invoice ID
              </p>
              <p
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                {waveappid}
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "80px",
                  marginTop: "10px",
                }}
              >
                Wave status
              </p>
              <p
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                {waveappstatus}
              </p>
              <Button
                style={{
                  width: "150px",
                  height: "40px",
                  marginLeft: "80px",
                  marginTop: "2px",
                  color: "white",
                }}
                variant="secondary"
              >
                {/*       <a
                  href={linkwaveapp}
                  style={{ textDecoration: "none", color: "white" }}
                  target="_blank"
                >
                  Link WaveApp
                </a> */}
                {/* <Link
                  to={{
                    pathname: linkwaveapp,
                  }}
                  target="_blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Link WaveApp
                </Link> */}
                <a
                  rel={"external"}
                  className="fab fa-instagram"
                  target="_blank"
                  href={linkwaveapp}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Link WaveApp
                </a>
              </Button>
            </Form.Group>
          </Form.Group>
          {/* INVOICE */}
        </Form.Group>
        {/* FORM INFORMATION AND IFRAME */}

        {/* CHAT Form.Group */}
        <Form.Group
          style={{
            width: "330px",
            marginLeft: "25px",
          }}
        >
          {/* CONTAINER CHAT FORMCONTROL AND BUTTON */}
          <Form.Group style={{ display: "flex", flexDirection: "column" }}>
            <Form.Group
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "2%",
                /*  opacity: "0.9", */
              }}
            >
              <div>
                <ul style={{ marginTop: "5px" }}>
                  <p
                    style={{
                      /*  fontWeight: "bold", */
                      marginLeft: "-5px",
                      marginTop: "20px",
                      fontSize: "18px",
                      border: "dotted 1px black",
                      width: "270px",
                      backgroundColor: "#9b9883",
                      color: "#dcd9d6",
                      padding: "5px",
                      borderRadius: "3%",
                    }}
                  >
                    Comments
                  </p>
                  <hr
                    style={{
                      width: "270px",
                      marginBottom: "30px",
                      marginLeft: "-5px",
                      marginTop: "-5px",
                    }}
                  />
                  {chats.map((chat) => (
                    <div key={chat.id}>
                      <i
                        style={{
                          marginLeft: "-10px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          {chat.client.name}{" "}
                        </p>
                        :{" "}
                        <p
                          style={{
                            fontSize: "12px",
                            marginLeft: "5px",
                            marginTop: "4px",
                          }}
                        >
                          {" "}
                          {chat.sms}
                        </p>
                      </i>
                    </div>
                  ))}
                </ul>
              </div>
            </Form.Group>
            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Control
                type="text"
                placeholder="..."
                onChange={(e) => setNote(e.target.value)}
                value={note}
              />
            </Form.Group>
            <Form.Group>
              <Button
                onClick={(e) => submitsms(e)}
                style={{
                  width: "100%",
                  marginTop: "1px",
                  color: "gray",
                }}
                variant="warning"
              >
                Response Comment
              </Button>
            </Form.Group>
          </Form.Group>
          {/* CONTAINER CHAT FORMCONTROL AND BUTTON */}
        </Form.Group>
        {/* CHAT Form.Group */}
      </Form.Group>
      {/* MAIN MIDDLE  FORM AND CHAT  form group*/}
    </div>
    /* Main Wrapper Flex Column initial */
  );
};

export default Info;
