import "./modal.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SaveIcon from "@mui/icons-material/Save";
import DatePicker from "react-datepicker";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import moment from "moment";
import {
  Form,
  Button,
  FloatingLabel,
  FormGroup,
  Label,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { width } from "@mui/system";
import Geocode from "react-geocode";

export default function Modal() {
  //*********************************************************** //
  /////////////////CONSTANTS//////////////////////////////////////
  //*********************************************************** //
  const auth = useAuth();
  const navigate = useNavigate();
  const [idproj, setIdproj] = useState(auth.projid);
  const [form, setForm] = useState([]);
  const [services, setServices] = useState([]);
  const [servicestable, setServicestable] = useState([]);
  const [homeaddress, setHomeaddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [resultsto, setResultsto] = useState([]);
  const [sqft, setSqft] = useState("");
  const [homeownername, setHomeownername] = useState("");
  const [homeownerphone, setHomeownerphone] = useState("");
  const [homeowneremail, setHomeowneremail] = useState("");
  const [projecthouseownername, setProjecthouseownername] = useState("");
  const [jobday, setJobday] = useState(new Date());
  const [time, setTime] = useState("");
  const [contractor, setContractor] = useState("");
  const [clientcliid, setClientcliid] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [surveyor, setSurveyor] = useState("");
  const [architec, setArchitec] = useState("");
  const [surveyors, setSurveyors] = useState([]);
  const [architecs, setArchitecs] = useState([]);
  const [currentclient, setCurrentclient] = useState(auth.clientid);
  const [currentservices, setCurrentservices] = useState([]);
  const [vrnotes, setVrnotes] = useState("");
  const [projectfolders, setProjectfolders] = useState([]);
  const [linkmatterport, setLinkmatterport] = useState("");
  const [linkpolycam, setLinkpolycam] = useState("");
  const [linkdronedeploy, setLinkdronedeploy] = useState("");
  const [linkgoogledrive, setLinkgoogledrive] = useState("");
  const [finalplantype, setFinalplantype] = useState("");
  const [finalplanlink, setFinalplanlink] = useState("");
  const [invoiceid, setInvoiceid] = useState("");
  const [invoicelink, setInvoicelink] = useState("");
  const [invoicestatus, setInvoicestatus] = useState("");
  const [waveappid, setWaveappid] = useState("");
  const [waveapplink, setWaveapplink] = useState("");
  const [waveappstatus, setWaveappstatus] = useState("");
  const [clientsbycompany, setClientsbycompany] = useState([]);
  const initialinvoicestatus = [
    { id: 1, name: "Paid" },
    { id: 2, name: "Pending" },
    { id: 3, name: "Generated" },
    { id: 4, name: "Returned" },
    { id: 5, name: "Posted" },
  ];
  const [invoicelist, setInvoicelist] = useState(initialinvoicestatus);
  const initialstatus = [
    { id: 1, current: "Assigned", checked: false },
    { id: 2, current: "Working", checked: false },
    { id: 3, current: "Renew", checked: false },
    { id: 4, current: "Delivered", checked: false },
    { id: 5, current: "Adjustment", checked: false },
    { id: 6, current: "Cancel", checked: false },
    { id: 7, current: "Created", checked: false },
  ];
  const [statuslist, setStatuslist] = useState(initialstatus);
  const initialChat = [
    {
      id: null,
      client: "",
      sms: "",
    },
  ];

  const [chats, setChats] = useState(initialChat);
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
  const initialboxes = [
    {
      id: 1,
      checked: false,
      item: "Floor Plan",
    },
    {
      id: 2,
      checked: false,
      item: "Site Plan",
    },
    {
      id: 3,
      checked: false,
      item: "Elevation",
    },
    {
      id: 4,
      checked: false,
      item: "Roof Plan(Drone)",
    },
    {
      id: 5,
      checked: false,
      item: "Drone Video",
    },
    {
      id: 6,
      checked: false,
      item: "Drone Photography",
    },
  ];
  const [checkboxes, setCheckboxes] = useState(initialboxes);
  const [chekes, setChekes] = useState([]);
  const [issending, setIssending] = useState(false);

  //*********************************************************** //
  /////////////////CONSTANTS//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring all  proj´s table by projid//
  useEffect(() => {
    fetch("https://server.vrealism.com:5000/api/getprojbyid", {
      /*   fetch("http://34.125.79.13:5000/api/getprojbyid", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setForm(res);
        setClientcliid(res[0].client_cli_id);
        setJobday(res[0].proj_dateAssigned);
        setTime(res[0].sethour);
        setHomeaddress(res[0].proj_address);
        setSqft(res[0].squarefeet);
        setHomeownername(res[0].home_owner_name);
        setHomeownerphone(res[0].home_owner_phone);
        setHomeowneremail(res[0].home_owner_email);
        setProjecthouseownername(res[0].proj_houseOwnerName);
        setSurveyor(res[0].surveyor);
        setArchitec(res[0].architec);
        setDetails(res[0].proj_description);
        setStatus(res[0].proj_status);
        const clientid = res[0].client_cli_id;
        fetch("https://server.vrealism.com:5000/api/clientnamebyid", {
          /*    fetch("http://34.125.79.13:5000/api/clientnamebyid", { */
          method: "POST",
          body: JSON.stringify({
            clientid,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((json) => {
            //console.log(json);
            setContractor(json[0].cli_name);
          });
      });
  }, []);
  //Bring all  proj´s table by projid//

  //*********************************************************** //

  //Use Geolocalitation//
  useEffect(() => {
    Geocode.setApiKey("AIzaSyBNPVvrMUVEGNXollqj4pQO0czA8RaRGRk");
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromAddress(homeaddress).then(
      (response) => {
        console.log(response);
        setZipcode(response.results[0].address_components[8].short_name);
        setState(response.results[0].address_components[5].short_name);
        setCity(response.results[0].address_components[3].short_name);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [homeaddress]);
  //Use Geolocalitation//

  /////////////////FUNCTIONS//////////////////////////////////////
  //*********************************************************** //
  //*********************************************************** //

  //Send Invoce//
  const Sendinvoice = (e) => {
    e.preventDefault();
    if (waveappid === "" || waveapplink === "" || waveappstatus === "") {
      alert("Complete the invoice data");
      setWaveappid("");
      setWaveapplink("");
      setWaveappstatus("");
      return false;
    }
    setIssending(true);
    fetch("https://server.vrealism.com:5000/invoice", {
      /*    fetch("http://34.125.79.13:5000/invoice", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
        clientcliid,
        waveappid,
        waveapplink,
        waveappstatus,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setWaveappid("");
        setWaveappstatus("");
        setWaveapplink("");
        setIssending(false);
      });
  };
  //Send Invoice//

  //Render Address & state & city & zipconde //
  const RenderAddress = (e) => {
    if (e.target.value === null) {
      setState(null);
      setCity(null);
      setZipcode(null);
    } else {
      setHomeaddress(e.target.value);
      Geocode.setApiKey("AIzaSyBNPVvrMUVEGNXollqj4pQO0czA8RaRGRk");
      Geocode.setLanguage("en");
      Geocode.setRegion("us");
      Geocode.setLocationType("ROOFTOP");
      Geocode.enableDebug();
      Geocode.fromAddress(e.target.value).then(
        (response) => {
          setResultsto(response);
          setZipcode(response.results[0].address_components[8].short_name);
          setState(response.results[0].address_components[5].short_name);
          setCity(response.results[0].address_components[3].short_name);
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };
  //Render Address & state & city & zipconde //

  //*********************************************************** //

  //Toggle the switchbutton //
  const handleSwitch = (e) => {
    /* const listItems = statuslist.map((el) =>
      el.id === e ? { ...el, checked: !el.checked } : el 
    );*/
    setStatus(e.current);
    //setStatuslist(listItems);
    const currentstatus = e.current;
    fetch("https://server.vrealism.com:5000/update/status", {
      /*  fetch("http://34.125.79.13:5000/update/status", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
        currentstatus,
      }),
      headers: { "Content-Type": "application/json" },
    });
  };
  //Toggle the switchbutton //

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //Toogle the invoice status///
  const handleInvoiceSwitch = (e) => {
    //console.log(e.id);
    setInvoicestatus(e.name);
    setWaveappstatus(e.name);
  };
  //Toogle the invoice status///
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Toggle the checkboxes//
  //flashhang//
  const flashhang = (el) => {
    const listitems = chekes.map((item) =>
      item.id === el.id ? { ...item, checked: !item.checked } : item
    );
    setChekes(listitems);
    const tag = el.label;
    const servid = el.id;
    const checked = el.checked;
    const cliente = clientcliid;
    fetch("https://server.vrealism.com:5000/reinsertservices", {
      /*   fetch("http://34.125.79.13:5000/reinsertservices", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
        tag,
        servid,
        checked,
        cliente,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    //console.log(el.clientcliid);
  };
  //flashhang//
  //Toggle the checkboxes//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////FUNCTIONS//////////////////////////////////////
  //*********************************************************** //

  //Update online surveyor//
  const updateSurveyor = (e) => {
    e.preventDefault();
    setSurveyor(e.target.value);
    const updatesurveyor = e.target.value;
    fetch("https://server.vrealism.com:5000/updatesurveyor", {
      /*    fetch("http://34.125.79.13:5000/updatesurveyor", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
        updatesurveyor,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update online surveyor//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Update online surveyor//
  const updateArchitec = (e) => {
    e.preventDefault();
    setArchitec(e.target.value);
    const updatearchitec = e.target.value;
    fetch("https://server.vrealism.com:5000/updatearchitec", {
      /*   fetch("http://34.125.79.13:5000/updatearchitec", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
        updatearchitec,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update online surveyor//
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  // Matterport send link data   //
  const linkmatterContainer = (e) => {
    e.preventDefault();
    if (linkmatterport === "") {
      alert("Paste a link");
      return false;
    }
    const linktype = e.target.viewportElement.id;
    const description = "tour";
    const link = linkmatterport;
    /*   fetch("http://34.125.79.13:5000/projectfiles", { */
    fetch("https://server.vrealism.com:5000/projectfiles", {
      method: "POST",
      body: JSON.stringify({
        idproj,
        link,
        linktype,
        clientcliid,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setProjectfolders(json));
    setLinkmatterport("Writing db...");
    setTimeout(() => {
      setLinkmatterport("");
    }, 1000);
  };
  // Matterport send link data   //
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //Polycam send link data //
  const linkpolyContainer = (e) => {
    e.preventDefault();
    if (linkpolycam === "") {
      alert("Paste a link");
      return false;
    }
    const linktype = e.target.viewportElement.id;
    const description = "tour";
    const link = linkpolycam;
    fetch("https://server.vrealism.com:5000/projectfiles", {
      /*   fetch("http://34.125.79.13:5000/projectfiles", { */
      method: "POST",
      body: JSON.stringify({
        idproj,
        link,
        linktype,
        clientcliid,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setProjectfolders(json));
    setLinkpolycam("Writing db...");
    setTimeout(() => {
      setLinkpolycam("");
    }, 1000);
  };
  //Polycam send link data //
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //Droneploy send link data //
  const linkdroneContainer = (e) => {
    e.preventDefault();
    if (linkdronedeploy === "") {
      alert("Paste a link");
      return false;
    }
    const linktype = e.target.viewportElement.id;
    const description = "tour";
    const link = linkdronedeploy;
    /*    fetch("http://34.125.79.13:5000/projectfiles", { */
    fetch("https://server.vrealism.com:5000/projectfiles", {
      method: "POST",
      body: JSON.stringify({
        idproj,
        link,
        linktype,
        clientcliid,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setProjectfolders(json));
    setLinkdronedeploy("Writing db...");
    setTimeout(() => {
      setLinkdronedeploy("");
    }, 1000);
  };
  //Droneploy send link data //
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  // Googledrive send link data//
  const linkgoogledriveContainer = (e) => {
    e.preventDefault();
    if (linkgoogledrive === "") {
      alert("Paste a link");
      return false;
    }
    const linktype = e.target.viewportElement.id;
    const description = "tour";
    const link = linkgoogledrive;
    /*   fetch("http://34.125.79.13:5000/projectfiles", { */
    fetch("https://server.vrealism.com:5000/projectfiles", {
      method: "POST",
      body: JSON.stringify({
        idproj,
        link,
        linktype,
        clientcliid,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setProjectfolders(json));
    setLinkgoogledrive("Writing db...");
    setTimeout(() => {
      setLinkgoogledrive("");
    }, 1000);
  };
  // Googledrive send link data//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  // Final plans send link data//
  const linkfinalplanContainer = (e) => {
    e.preventDefault();
    if (finalplanlink === "") {
      alert("Paste a link");
      return false;
    }
    const description = "tour";
    const linktype = finalplantype;
    const link = finalplanlink;
    /*   fetch("http://34.125.79.13:5000/projectfiles", { */
    fetch("https://server.vrealism.com:5000/projectfiles", {
      method: "POST",
      body: JSON.stringify({
        idproj,
        link,
        linktype,
        clientcliid,
        description,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setProjectfolders(json));
    setFinalplanlink("Writing db...");
    setTimeout(() => {
      setFinalplanlink("");
    }, 1000);
  };
  // Final plans send link data//

  //*********************************************************** //
  /////////////////FUNCTIONS//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  // clearSpace of matterport link //
  const clearmatterlinkSpace = () => {
    setLinkmatterport("");
  };
  // clearSpace of matterport link //
  //****************************** //
  //****************************** //
  // clearSpace of polycam link //
  const clearpolylinkSpace = () => {
    setLinkpolycam("");
  };
  // clearSpace of polycam link //
  //**************************** **//
  //****************************** //
  // clearSpace of dronedeploy link //
  const cleardronelinkSpace = () => {
    setLinkdronedeploy("");
  };
  // clearSpace of dronedeploy link //
  //**************************** **//
  //****************************** //
  //clearSpace of googledrive link//
  const cleargoogledrivelinkSpace = () => {
    setLinkgoogledrive("");
  };
  //clearSpace of googledrive link//
  //**************************** **//
  //****************************** //
  //clearSpace of finalplan link//
  const clearfinalplanlinkSpace = () => {
    setFinalplanlink("");
  };
  //clearSpace of finalplan link//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  // delete Links Final  //
  const deletefinalLink = (e) => {
    e.preventDefault();
    const linkid = e.target.viewportElement.id;
    fetch("https://server.vrealism.com:5000/delete/links", {
      /*   fetch("http://34.125.79.13:5000/delete/links", { */
      method: "POST",
      body: JSON.stringify({
        linkid,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => setProjectfolders(json));
  };
  // delete Links Final //

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //////////////UPDATE SECTION ROOT FORM//////////////////
  //Update sqft//
  const updateFormSqft = (e) => {
    const fieldvalue = e.target.value;
    /*  fetch("http://34.125.79.13:5000/update/project/sqft", { */
    fetch("https://server.vrealism.com:5000/update/project/sqft", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update sqft//
  ////////////////////////////////////////////////
  //Update Jobday//
  const updateFormJobday = (e) => {
    const fieldvalue = e.target.value;
    /*    fetch("http://34.125.79.13:5000/update/project/jobday", { */
    fetch("https://server.vrealism.com:5000/update/project/jobday", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update Jobday//
  ///////////////////////////////////////////////
  //Update sethour//
  const updateFormSethour = (e) => {
    const fieldvalue = e.target.value;
    /* fetch("http://34.125.79.13:5000/update/project/sethour", { */
    fetch("https://server.vrealism.com:5000/update/project/sethour", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update sethour//
  //////////////////////////////////////////////
  //Update Project address//
  const updateFormAddress = (e) => {
    const fieldvalue = e.target.value;
    /*    fetch("http://34.125.79.13:5000/update/project/setaddress", { */
    fetch("https://server.vrealism.com:5000/update/project/setaddress", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  // Update Project address//
  /////////////////////////////////////////////
  //Update homeOwner//
  const updateFormHomeowner = (e) => {
    const fieldvalue = e.target.value;
    /*    fetch("http://34.125.79.13:5000/update/project/sethomeowner", { */
    fetch("https://server.vrealism.com:5000/update/project/sethomeowner", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update homeOwner//
  ////////////////////////////////////////////
  //Update homeOwnerPhone//
  const updateFormHomeownerphone = (e) => {
    const fieldvalue = e.target.value;
    /*   fetch("http://34.125.79.13:5000/update/project/sethomeownerphone", { */
    fetch("https://server.vrealism.com:5000/update/project/sethomeownerphone", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update homeOwnerPhone//
  ////////////////////////////////////////////
  //Update homeOwnerPhone//
  const updateFormHomeownermail = (e) => {
    const fieldvalue = e.target.value;
    /* fetch("http://34.125.79.13:5000/update/project/sethomeownermail", { */
    fetch("https://server.vrealism.com:5000/update/project/sethomeownermail", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update homeOwnerPhone//
  ///////////////////////////////////////////////
  //Update contractor//
  const updateFormContractor = (e) => {
    const fieldvalue = e.target.value;
    /*   fetch("http://34.125.79.13:5000/update/project/contractor", { */
    fetch("https://server.vrealism.com:5000/update/project/contractor", {
      method: "POST",
      body: JSON.stringify({
        fieldvalue,
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  //Update contractor//
  ///////////////UPDATE SECTION ROOT FORM//////////////////////

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////USEEFFECTS//////////////////////////////////////
  //*********************************************************** //
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring all table project´s_services by projid//
  useEffect(() => {
    /*     fetch("http://34.125.79.13:5000/api/getservbyid", { */
    fetch("https://server.vrealism.com:5000/api/getservbyid", {
      method: "POST",
      body: JSON.stringify({
        idproj,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setServices(res);
      });
  }, []);
  //Bring all table project´s_services by projid//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring all services table//
  useEffect(() => {
    /* fetch("http://34.125.79.13:5000/api/servicestable") */
    fetch("https://server.vrealism.com:5000/api/servicestable")
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setServicestable(res);
      });
  }, []);
  //Bring all services table//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring all project_file´s table by projid//
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
  }, [idproj]);
  //console.log(projectfolders);
  //Bring all project_file´s table by projid//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring all Vrealism´s suveryors//
  useEffect(() => {
    /*   fetch("http://34.125.79.13:5000/api/surveyors") */
    fetch("https://server.vrealism.com:5000/api/surveyors")
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setSurveyors(res);
      });
  }, []);
  //Bring all Vrealism´s suveryors//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //*********************************************************** //
  //Bring all Vrealism´s architecs//
  useEffect(() => {
    /*  fetch("http://34.125.79.13:5000/api/architecs") */
    fetch("https://server.vrealism.com:5000/api/architecs")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setArchitecs(res);
      });
  }, []);
  //Bring all Vrealism´s architecs//
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring all chats by projid//
  useEffect(() => {
    /*   fetch("http://34.125.79.13:5000/api/getvrnotes", { */
    fetch("https://server.vrealism.com:5000/api/getvrnotes", {
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
      });
  }, []);
  //Bring all chats by projid//
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //Bring all clients by Company//
  useEffect(() => {
    const company = projecthouseownername;
    /* fetch("http://34.125.79.13:5000/bringClient", { */
    fetch("https://server.vrealism.com:5000/bringClient", {
      method: "POST",
      body: JSON.stringify({
        company,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setClientsbycompany(res));
  }, [projecthouseownername]);
  //Bring al  clients by Company//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //Send sms from vrnotes//
  const submitsms = (e) => {
    e.preventDefault();
    if (vrnotes === "") {
      alert("text a sms");
      return false;
    }
    /*  fetch("http://34.125.79.13:5000/chat/vrnotes", { */
    fetch("https://server.vrealism.com:5000/chat/vrnotes", {
      method: "POST",
      body: JSON.stringify({
        idproj,
        vrnotes,
        currentclient,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        const data = json.map((items) => ({
          id: items.id,
          client: clients.find((el) => items.id_client === el.id),
          sms: items.sms,
        }));

        // console.log(data);
        setChats(data);
        setVrnotes("");
      });
  };
  //Send sms from vrnotes//
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //ONLOAD INFO AND UPDATE CURRENT SERVICES //
  useEffect(() => {
    const checkeador = (ex) => {
      if (services.find((ese) => ese.services_serv_id === ex.id)) {
        return true;
      } else {
        return false;
      }
    };
    const foun = checkboxes.map((item) => ({
      id: item.id,
      label: item.item,
      checked: checkeador(item),
      clientcliid: clientcliid,
    }));

    setChekes(foun);
  }, [services]);
  //ONLOAD INFO AND UPDATE CURRENT SERVICES //
  //*********************************************************** //

  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //
  //BRING ALL INVOICE´S TABLE //
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
        console.log(res);
        //setServices(res);
        setInvoiceid(res[0].num_invoice);
        setInvoicestatus(res[0].inv_status);
        setInvoicelink(res[0].linkapp);
        setWaveappid(res[0].num_invoice);
        setWaveapplink(res[0].linkapp);
        setWaveappstatus(res[0].inv_status);
      });
  }, []);
  //Bring the invoice information//
  //BRING ALL INVOICE´S TABLE //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  /////////////////USEEFFECTS//////////////////////////////////////
  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //*********************************************************** //
  /////////////////RENDER RETURN////////////////////////////////
  //*********************************************************** //
  return (
    <div className="initc">
      <Form.Group
        style={{
          width: "1200px",
          height: "190px",
          /*     border: "dotted 2px white", */
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "120px",
            marginLeft: "65px",
          }}
        >
          Edit and update project
        </p>
        {/*  <SaveIcon
          role="button"
          style={{
            marginLeft: "400px",
            fontSize: "40px",
            color: "#eb2b54",
            marginTop: "30px",
          }}
        />
        <small
          role="button"
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            marginTop: "38px",
            fontSize: "15px",
          }}
        >
          Save
        </small> */}
        <KeyboardReturnIcon
          role="button"
          style={{
            marginLeft: "500px",
            fontSize: "40px",
            color: "#eb2b54",
            marginTop: "32px",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <small
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            marginTop: "38px",
            fontSize: "15px",
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
            marginLeft: "20px",
            fontSize: "40px",
            color: "#eb2b54",
            marginTop: "30px",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <small
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            marginTop: "40px",
            marginLeft: "0px",
            fontSize: "15px",
          }}
          role="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit
        </small>
      </Form.Group>
      <hr
        style={{
          color: "white",
          width: "1000px",
          marginLeft: "70px",
          marginTop: "-15px",
        }}
      />
      <Form className="initc-container">
        {/*-------------------------------------------------------------------------*/}
        {/* FORM DB  CURRENT */}
        {form.map((el) => (
          <>
            {/*  */}
            {/*-----------------------------------SEPARATOR--------------------------------------*/}
            {/*  */}
            <div className="firstrow">
              <Form.Group className="mb-1">
                <Form.Label style={{ color: "white", marginLeft: "-50px" }}>
                  Project Id
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "100px",
                    textAlign: "center",
                    marginLeft: "-50px",
                  }}
                  type="text"
                  onChange={(e) => setHomeaddress(e.target.value)}
                  value={el.proj_id}
                />
              </Form.Group>

              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    marginLeft: "5px",
                    width: "200px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  Job Day{" "}
                  {jobday === "0000-00-00 00:00:00" ? (
                    <small style={{ marginLeft: "30px", marginTop: "3px" }}>
                      Date pending
                    </small>
                  ) : null}
                  {/*        <p style={{ marginLeft: "35px", marginTop: "2px" }}>
                    {moment.utc(jobday).format("MMM Do YYYY")}
                  </p> */}
                </Form.Label>
                {jobday === "0000-00-00 00:00:00" ? (
                  <DatePicker selected={new Date()} />
                ) : (
                  <DatePicker selected={new Date()} />
                )}
                {/* <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "200px",
                    marginLeft: "-50px",
                    marginTop: "10px",
                  }}
                  type="date"
                  value={jobday}
                  onChange={(e) => {
                    setJobday(e.target.value);
                  }}
                  onBlur={(e) => {
                    updateFormJobday(e);
                  }}
                /> */}
              </Form.Group>

              <Form.Group className="mb-1">
                <Form.Label style={{ color: "white", marginLeft: "-30px" }}>
                  Time
                  {/*     <p style={{ marginLeft: "50px", marginTop: "-24px" }}>
                    {time}
                  </p> */}
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{ width: "140px", marginLeft: "-30px" }}
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  onBlur={(e) => {
                    updateFormSethour(e);
                  }}
                />
              </Form.Group>
            </div>
            {/*  */}
            {/*------------------------------SEPARATOR-------------------------------------------*/}
            {/*  */}
            <div className="secondrow">
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    marginLeft: "-30px",
                  }}
                >
                  Project Address
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "500px",
                    textAlign: "left",
                    marginLeft: "-30px",
                  }}
                  type="text"
                  onChange={(e) => RenderAddress(e)}
                  onBlur={(e) => updateFormAddress(e)}
                  onMouseUp={(e) => RenderAddress(e)}
                  value={homeaddress}
                />
              </Form.Group>

              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "180px",
                    marginLeft: "-200px",
                  }}
                >
                  State
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "180px",
                    textAlign: "center",
                    marginLeft: "-200px",
                  }}
                  type="text"
                  defaultValue={homeaddress && state}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "180px",
                    marginLeft: "-200px",
                  }}
                >
                  City
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "180px",
                    textAlign: "center",
                    marginLeft: "-200px",
                  }}
                  type="text"
                  defaultValue={homeaddress && city}
                />
              </Form.Group>
            </div>
            {/*  */}
            {/*------------------------------SEPARATOR-------------------------------------------*/}

            {/*  */}
            <div className="fourthrow">
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "300px",
                    marginLeft: "-45px",
                  }}
                >
                  Homeowner Name
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "300px",
                    textAlign: "center",
                    marginLeft: "-45px",
                  }}
                  type="text"
                  onChange={(e) => setHomeownername(e.target.value)}
                  onBlur={(e) => updateFormHomeowner(e)}
                  value={homeownername}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "200px",
                    marginLeft: "-200px",
                  }}
                >
                  Homeowner Phone
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "200px",
                    textAlign: "center",
                    marginLeft: "-200px",
                  }}
                  type="text"
                  onChange={(e) => setHomeownerphone(e.target.value)}
                  onBlur={(e) => updateFormHomeownerphone(e)}
                  value={homeownerphone}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "300px",
                    marginLeft: "-190px",
                  }}
                >
                  Homeowner Email
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "300px",
                    textAlign: "center",
                    marginLeft: "-190px",
                  }}
                  type="text"
                  onChange={(e) => setHomeowneremail(e.target.value)}
                  onBlur={(e) => updateFormHomeownermail(e)}
                  value={homeowneremail}
                />
              </Form.Group>
            </div>
            {/*  */}

            {/*  */}
            <div className="thirdrow">
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "100px",
                    marginLeft: "-45px",
                  }}
                >
                  ZipCode
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "100px",
                    textAlign: "center",
                    marginLeft: "-45px",
                  }}
                  type="text"
                  /* defaultValue={zipcode} */
                  defaultValue={homeaddress && zipcode}
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "200px",
                    marginLeft: "-5px",
                  }}
                >
                  Contractor
                </Form.Label>
                <Form.Select
                  style={{ width: "200px", marginLeft: "0px" }}
                  /* onChange={(e) => setSurveyor(e.target.value)} */
                  /* onChange={(e) => setContractor(e.target.value)} */
                  onChange={(e) => updateFormContractor(e)}
                >
                  <option style={{ color: "#aeb1b4" }}>{contractor}</option>
                  {clientsbycompany.map((el) => (
                    <option value={el.cli_id}>{el.cli_name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    color: "white",
                    width: "100px",
                    marginLeft: "5px",
                  }}
                >
                  House sqft
                </Form.Label>
                <Form.Control
                  key={el.proj_id}
                  style={{
                    width: "100px",
                    textAlign: "center",
                    marginLeft: "5px",
                  }}
                  type="text"
                  value={sqft}
                  onChange={(e) => {
                    setSqft(e.target.value);
                  }}
                  onBlur={(e) => {
                    updateFormSqft(e);
                  }}
                />
              </Form.Group>
            </div>
            {/*  */}

            {/*-------------------------------------------------------------------------*/}

            {/*-------------------------------------------------------------------------*/}

            {/*-------------------------------------------------------------------------*/}
            {/*  */}
          </>
        ))}
        {/* FORM DB  CURRENT */}
        {/*  */}
        {/*-------------------------------------------------------------------------*/}
        {/*  */}
        <p
          style={{
            marginTop: "120px",
            marginLeft: "50px",
            fontWeight: "bold",
            color: "white",
            fontSize: "30px",
          }}
        >
          Current services
        </p>
        <hr
          style={{
            color: "white",
            width: "1000px",
            marginLeft: "50px",
            marginTop: "-10px",
          }}
        />
        {/*  */}
        {/*-----------------------SERVICES-------------------------------------------*/}
        {/*  */}
        <div className="projdesc">
          <Form.Group>
            {chekes.map((el) => (
              <Form.Check
                style={{ fontSize: "20px" }}
                key={el.id}
                type="checkbox"
                label={el.label}
                value={el.label}
                checked={el.checked}
                /*onChange={(e) => handleCheck(el)}*/
                onChange={() => flashhang(el)}
              />
            ))}
          </Form.Group>
          <Form.Group
            className="mb-3"
            style={{
              /* border: "dotted 1px black", */
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Group>
              <Form.Label
                style={{
                  width: "400px",
                  marginLeft: "50px",
                  marginTop: "20px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Details
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ width: "400px", marginLeft: "50px" }}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setDetails("");
                }}
              >
                Clean
              </Button>
              <Button style={{ marginLeft: "2px" }}>Set details</Button>
            </Form.Group>
          </Form.Group>
        </div>

        {/*  */}
        {/*-------------------------------------------------------------------------*/}
        {/*  */}

        {auth.type === "superadmin" ? (
          <p
            style={{
              marginTop: "120px",
              fontWeight: "bold",
              marginLeft: "53px",
              color: "white",
              fontSize: "30px",
            }}
          >
            Vrealism info
          </p>
        ) : (
          <p
            style={{
              marginTop: "120px",
              fontWeight: "bold",
              marginLeft: "53px",
              color: "white",
              fontSize: "30px",
            }}
          >
            Project status info
          </p>
        )}
        <hr
          style={{
            color: "white",
            width: "1000px",
            marginLeft: "50px",
            marginTop: "-10px",
          }}
        />
        {/*  */}
        {/*-------------------------------------------------------------------------*/}
        {/*  */}
        <div className="seventh">
          <Form.Group
            style={{
              width: "200px",
              height: "300px",
              /*   border: "dotted 1px white", */
              marginLeft: "40px",
              marginTop: "15px",
            }}
          >
            <Form.Label
              style={{
                width: "300px",
                marginLeft: "30px",
                marginTop: "25px",
                color: "white",
                fontSize: "20px",
              }}
            >
              Current status
            </Form.Label>
            {/* Render status by type of client and conditional if it have*/}
            {auth.type === "superadmin" ? (
              statuslist.map((rec) => (
                <Form.Group style={{ marginLeft: "30px", marginTop: "5px" }}>
                  <Form.Check
                    key={rec.id}
                    label={rec.current}
                    /*  value={rec.id} */
                    style={{
                      color: "white",
                      marginLeft: "1px",
                      fontSize: "20px",
                    }}
                    type="switch"
                    checked={
                      rec.current === status ? !rec.checked : rec.checked
                    }
                    onChange={() => {
                      handleSwitch(rec);
                    }}
                  />
                </Form.Group>
              ))
            ) : (
              <h5
                style={{
                  marginLeft: "30px",
                  marginTop: "5px",
                  color: "rgb(64, 192, 243)",
                  fontSize: "25px",
                }}
              >
                {status}
              </h5>
            )}
          </Form.Group>
          {/*  */}
          {/* Render status by type of client and conditional if it have*/}
          <Form.Group
            style={{ /* border: "dotted 1px white", */ width: "500px" }}
          >
            <Form.Group
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "initial",
                justifyContent: "initial",
                justifyItems: "initial",
                justifyContent: "initial",
                /*   border: "dotted 1px red", */
                marginTop: "39px",
              }}
            >
              {/* select surveyor and architec zone */}
              <Form.Group
                style={{ /* border: "dotted 1px yellow", */ width: "240px" }}
              >
                <Form.Label
                  style={{
                    width: "auto",
                    marginLeft: "0px",
                    marginTop: "0px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Surveyor
                </Form.Label>
                {surveyor ? (
                  <Form.Select
                    style={{ width: "200px", marginLeft: "0px" }}
                    /* onChange={(e) => setSurveyor(e.target.value)} */
                    onChange={(e) => updateSurveyor(e)}
                  >
                    <option value={surveyor} style={{ color: "#aeb1b4" }}>
                      {surveyor}
                    </option>

                    {surveyors.map((el) => (
                      <option value={el.cli_name}>{el.cli_name}</option>
                    ))}
                    <option value="Remenber">Remenber</option>
                  </Form.Select>
                ) : (
                  <Form.Select
                    style={{ width: "200px", marginLeft: "0px" }}
                    onChange={(e) => updateSurveyor(e)}
                  >
                    <option>Assign a surveyor</option>
                    {surveyors.map((el) => (
                      <option value={el.cli_name}>{el.cli_name}</option>
                    ))}
                    <option value="Remenber">Remenber</option>
                  </Form.Select>
                )}
              </Form.Group>
              <Form.Group
                style={{ /* border: "dotted 1px purple", */ width: "240px" }}
              >
                <Form.Label
                  style={{
                    width: "auto",
                    marginLeft: "0px",
                    marginTop: "0px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Architec
                </Form.Label>
                {architec ? (
                  <Form.Select
                    style={{ width: "200px", marginLeft: "0px" }}
                    onChange={(e) => updateArchitec(e)}
                  >
                    <option value={architec} style={{ color: "#aeb1b4" }}>
                      {architec}
                    </option>

                    {architecs.map((el) => (
                      <option value={el.cli_name}>{el.cli_name}</option>
                    ))}
                    <option value="Remenber">Remenber</option>
                  </Form.Select>
                ) : (
                  <Form.Select
                    style={{ width: "200px", marginLeft: "0px" }}
                    onChange={(e) => updateArchitec(e)}
                  >
                    <option>Assign a architec</option>
                    {architecs.map((el) => (
                      <option value={el.cli_name}>{el.cli_name}</option>
                    ))}
                    <option value="Remenber">Remenber</option>
                  </Form.Select>
                )}
              </Form.Group>
            </Form.Group>
            <Form.Group>
              {auth.type === "superadmin" ? (
                <div className="eigth">
                  <Form.Label
                    style={{
                      width: "300px",
                      marginLeft: "0px",
                      marginTop: "20px",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    Vrealism Notes
                  </Form.Label>
                  <Form.Group
                    style={{
                      width: "450px",
                      height: "auto",
                      /* maxHeight: "200px", */
                      /*   border: "dotted 1px white", */
                      backgroundColor: "#ffffff",
                      padding: "10px",
                    }}
                  >
                    <ul>
                      {chats.map((el) => (
                        <div key={el.id}>
                          <i
                            style={{
                              marginLeft: "0px",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: "15px",
                                marginTop: "2px",
                                marginLeft: "-27px",
                              }}
                            >
                              {el.client.name}{" "}
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
                              {el.sms}
                            </p>
                          </i>
                        </div>
                      ))}
                    </ul>
                  </Form.Group>

                  <Form.Control
                    type="text"
                    style={{ width: "450px" }}
                    placeholder="Send a note"
                    onChange={(e) => setVrnotes(e.target.value)}
                    value={vrnotes}
                  />
                  <Button
                    onClick={(e) => submitsms(e)}
                    variant="outline-primary"
                    style={{ marginTop: "-68px", marginLeft: "390px" }}
                  >
                    Send
                  </Button>
                </div>
              ) : null}
            </Form.Group>
          </Form.Group>
          {/*select surveyor and architec zone  */}
        </div>
        {/*  */}
        {/*-------------------------------------------------------------------------*/}
        {/*  */}
        {auth.type === "superadmin" ? (
          <>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "120px",
                marginLeft: "60px",
                color: "white",
                fontSize: "30px",
              }}
            >
              Links router
            </p>
            <hr
              style={{
                color: "white",
                width: "990px",
                marginLeft: "60px",
                marginTop: "-10px",
              }}
            />
            {/*  MULTISECTION FOR PASTE LINKS */}
            {/*Matterport Link */}

            <div className="nineth">
              <Form.Group>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "70px",
                    marginTop: "85px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Matterport Link
                </Form.Label>
                <Form.Control
                  style={{
                    width: "800px",
                    textAlign: "left",
                    marginLeft: "250px",
                    marginTop: "-40px",
                  }}
                  type="text"
                  value={linkmatterport}
                  onChange={(e) => setLinkmatterport(e.target.value)}
                />
              </Form.Group>
              <AddCircleOutlinedIcon
                role="button"
                id="matterport"
                style={{
                  marginTop: "90px",
                  marginLeft: "5px",
                  color: "rgb(64, 192, 243)",
                }}
                onClick={(e) => linkmatterContainer(e)}
              />
              <CleaningServicesIcon
                role="button"
                style={{
                  marginTop: "88px",
                  marginLeft: "2px",
                  color: "yellow",
                }}
                onClick={clearmatterlinkSpace}
              />
            </div>
          </>
        ) : null}
        <Form.Group style={{ marginLeft: "200px", marginTop: "10px" }}>
          <ul>
            {projectfolders.map((el) =>
              el.projfile_linkType === "matterport" ? (
                <li
                  style={{ color: "white", marginLeft: "30px" }}
                  key={el.projfile_id}
                >
                  <a
                    href={el.projfile_link}
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {el.projfile_link}
                  </a>
                  <RemoveCircleIcon
                    id={el.projfile_id}
                    role="button"
                    style={{
                      color: "rgb(238, 94, 94)",
                      marginLeft: "5px",
                      fontSize: "25px",
                    }}
                    onClick={(e) => deletefinalLink(e)}
                  />
                </li>
              ) : null
            )}
          </ul>
        </Form.Group>
        {/*Matterport Link */}

        {/* Polycam Link */}
        {auth.type === "superadmin" ? (
          <div className="nineth">
            <Form.Group>
              <Form.Label
                style={{
                  width: "200px",
                  marginLeft: "70px",
                  marginTop: "85px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Polycam Link
              </Form.Label>
              <Form.Control
                style={{
                  width: "800px",
                  textAlign: "left",
                  marginLeft: "250px",
                  marginTop: "-40px",
                }}
                type="text"
                value={linkpolycam}
                onChange={(e) => setLinkpolycam(e.target.value)}
              />
            </Form.Group>
            <AddCircleOutlinedIcon
              role="button"
              id="polycam"
              style={{
                marginTop: "90px",
                marginLeft: "5px",
                color: "rgb(64, 192, 243)",
              }}
              onClick={(e) => linkpolyContainer(e)}
            />
            <CleaningServicesIcon
              role="button"
              style={{
                marginTop: "88px",
                marginLeft: "2px",
                color: "yellow",
              }}
              onClick={clearpolylinkSpace}
            />
          </div>
        ) : null}
        <Form.Group style={{ marginLeft: "200px", marginTop: "10px" }}>
          <ul>
            {projectfolders.map((el) =>
              el.projfile_linkType === "polycam" ? (
                <li
                  style={{ color: "white", marginLeft: "30px" }}
                  key={el.projfile_id}
                >
                  <a
                    href={el.projfile_link}
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {el.projfile_link}
                  </a>
                  <RemoveCircleIcon
                    id={el.projfile_id}
                    role="button"
                    style={{
                      color: "rgb(238, 94, 94)",
                      marginLeft: "5px",
                      fontSize: "25px",
                    }}
                    onClick={(e) => deletefinalLink(e)}
                  />
                </li>
              ) : null
            )}
          </ul>
        </Form.Group>
        {/* Polycam Link */}

        {/* Dronedeploy Link */}
        {auth.type === "superadmin" ? (
          <div className="nineth">
            <Form.Group>
              <Form.Label
                style={{
                  width: "200px",
                  marginLeft: "70px",
                  marginTop: "85px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Dronedeploy Link
              </Form.Label>
              <Form.Control
                style={{
                  width: "800px",
                  textAlign: "left",
                  marginLeft: "250px",
                  marginTop: "-40px",
                }}
                type="text"
                value={linkdronedeploy}
                onChange={(e) => setLinkdronedeploy(e.target.value)}
              />
            </Form.Group>
            <AddCircleOutlinedIcon
              role="button"
              id="dronedeploy"
              style={{
                marginTop: "90px",
                marginLeft: "5px",
                color: "rgb(64, 192, 243)",
              }}
              onClick={(e) => linkdroneContainer(e)}
            />
            <CleaningServicesIcon
              role="button"
              style={{
                marginTop: "88px",
                marginLeft: "2px",
                color: "yellow",
              }}
              onClick={cleardronelinkSpace}
            />
          </div>
        ) : null}
        <Form.Group style={{ marginLeft: "210px", marginTop: "10px" }}>
          <ul>
            {projectfolders.map((el) =>
              el.projfile_linkType === "dronedeploy" ? (
                <li
                  style={{ color: "white", marginLeft: "20px" }}
                  key={el.projfile_id}
                >
                  <a
                    href={el.projfile_link}
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {el.projfile_link}
                  </a>
                  <RemoveCircleIcon
                    id={el.projfile_id}
                    role="button"
                    style={{
                      color: "rgb(238, 94, 94)",
                      marginLeft: "5px",
                      fontSize: "25px",
                    }}
                    onClick={(e) => deletefinalLink(e)}
                  />
                </li>
              ) : null
            )}
          </ul>
        </Form.Group>
        {/* Dronedeploy Link */}

        {/* Googledrive Link */}
        {auth.type === "superadmin" ? (
          <div className="nineth">
            <Form.Group>
              <Form.Label
                style={{
                  width: "200px",
                  marginLeft: "70px",
                  marginTop: "85px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Google Drive Folder
              </Form.Label>
              <Form.Control
                style={{
                  width: "800px",
                  textAlign: "left",
                  marginLeft: "255px",
                  marginTop: "-40px",
                }}
                type="text"
                value={linkgoogledrive}
                onChange={(e) => setLinkgoogledrive(e.target.value)}
              />
            </Form.Group>
            <AddCircleOutlinedIcon
              role="button"
              id="googledrive"
              style={{
                marginTop: "90px",
                marginLeft: "5px",
                color: "rgb(64, 192, 243)",
              }}
              onClick={(e) => linkgoogledriveContainer(e)}
            />
            <CleaningServicesIcon
              role="button"
              style={{
                marginTop: "88px",
                marginLeft: "2px",
                color: "yellow",
              }}
              onClick={cleargoogledrivelinkSpace}
            />
          </div>
        ) : null}
        <Form.Group style={{ marginLeft: "230px", marginTop: "10px" }}>
          <ul>
            {projectfolders.map((el) =>
              el.projfile_linkType === "googledrive" ? (
                <li
                  style={{ color: "white", marginLeft: "5px" }}
                  key={el.projfile_id}
                >
                  <a
                    href={el.projfile_link}
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {el.projfile_link}
                  </a>
                  <RemoveCircleIcon
                    id={el.projfile_id}
                    role="button"
                    style={{
                      color: "rgb(238, 94, 94)",
                      marginLeft: "5px",
                      fontSize: "25px",
                    }}
                    onClick={(e) => deletefinalLink(e)}
                  />
                </li>
              ) : null
            )}
          </ul>
        </Form.Group>
        {/* Googledrive Link */}
        {/*  MULTISECTION FOR PASTE LINKS */}
        {/*  ************************SEPARATOR******************************** */}
        {/* VREALISM FINAL PLANS */}
        {auth.type === "superadmin" ? (
          <>
            <p
              style={{
                marginTop: "120px",
                marginLeft: "70px",
                fontWeight: "bold",
                color: "white",
                fontSize: "30px",
              }}
            >
              Vrealism final plans
            </p>
            <hr
              style={{
                color: "white",
                width: "1020px",
                marginLeft: "70px",
                marginTop: "-10px",
              }}
            />
            <div className="tenth">
              <Form.Group>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "70px",
                    color: "white",
                    fontSize: "20px",
                    marginTop: "40px",
                  }}
                >
                  Type of file
                </Form.Label>
                <Form.Select
                  style={{ width: "300px", marginLeft: "70px" }}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setFinalplantype(e.target.value);
                  }}
                >
                  <option style={{ color: "#aeb1b4" }}>Choose a type</option>
                  <option value="floorplan">Floor Plan</option>
                  <option value="siteplan">Site Plan</option>
                  <option value="roofplan">Roof Plan</option>
                  <option value="elevation">Elevation</option>
                  <option value="cad">Cad</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "30px",
                    color: "white",
                    fontSize: "20px",
                    marginTop: "40px",
                  }}
                >
                  Link
                </Form.Label>
                <Form.Control
                  style={{
                    width: "700px",
                    textAlign: "left",
                    marginLeft: "30px",
                  }}
                  type="text"
                  value={finalplanlink}
                  onChange={(e) => setFinalplanlink(e.target.value)}
                />
              </Form.Group>
              <AddCircleOutlinedIcon
                role="button"
                style={{
                  marginTop: "85px",
                  marginLeft: "5px",
                  color: "rgb(64, 192, 243)",
                }}
                onClick={(e) => linkfinalplanContainer(e)}
              />
              <CleaningServicesIcon
                role="button"
                style={{
                  marginTop: "83px",
                  marginLeft: "3px",
                  color: "yellow",
                }}
                onClick={clearfinalplanlinkSpace}
              />
            </div>
            <div className="eleventh">
              <Form.Group style={{ marginLeft: "230px", marginTop: "10px" }}>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Floor Plan:
                </Form.Label>
                <div
                  style={{
                    border: "dotted",
                    width: "700px",
                    marginLeft: "20px",
                    marginTop: "-5px",
                  }}
                >
                  <ul>
                    {projectfolders.map((el) =>
                      el.projfile_linkType === "floorplan" ? (
                        <li
                          style={{
                            color: "white",
                            marginLeft: "5px",
                            marginTop: "2px",
                          }}
                          key={el.projfile_id}
                        >
                          <a
                            href={el.projfile_link}
                            target="_blank"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {el.projfile_link}
                          </a>
                          <RemoveCircleIcon
                            id={el.projfile_id}
                            role="button"
                            style={{
                              color: "rgb(238, 94, 94)",
                              marginLeft: "5px",
                              fontSize: "18px",
                            }}
                            onClick={(e) => deletefinalLink(e)}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </Form.Group>
              <Form.Group style={{ marginLeft: "230px", marginTop: "7px" }}>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Site Plan:
                </Form.Label>
                <div
                  style={{
                    border: "dotted",
                    width: "700px",
                    marginLeft: "20px",
                    marginTop: "-5px",
                  }}
                >
                  <ul>
                    {projectfolders.map((el) =>
                      el.projfile_linkType === "siteplan" ? (
                        <li
                          style={{
                            color: "white",
                            marginLeft: "5px",
                            marginTop: "2px",
                          }}
                          key={el.projfile_id}
                        >
                          <a
                            href={el.projfile_link}
                            target="_blank"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {el.projfile_link}
                          </a>
                          <RemoveCircleIcon
                            id={el.projfile_id}
                            role="button"
                            style={{
                              color: "rgb(238, 94, 94)",
                              marginLeft: "5px",
                              fontSize: "18px",
                            }}
                            onClick={(e) => deletefinalLink(e)}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </Form.Group>
              <Form.Group style={{ marginLeft: "230px", marginTop: "7px" }}>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Roof Plan:
                </Form.Label>
                <div
                  style={{
                    border: "dotted",
                    width: "700px",
                    marginLeft: "20px",
                    marginTop: "-5px",
                  }}
                >
                  <ul>
                    {projectfolders.map((el) =>
                      el.projfile_linkType === "roofplan" ? (
                        <li
                          style={{
                            color: "white",
                            marginLeft: "5px",
                            marginTop: "2px",
                          }}
                          key={el.projfile_id}
                        >
                          <a
                            href={el.projfile_link}
                            target="_blank"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {el.projfile_link}
                          </a>
                          <RemoveCircleIcon
                            id={el.projfile_id}
                            role="button"
                            style={{
                              color: "rgb(238, 94, 94)",
                              marginLeft: "5px",
                              fontSize: "18px",
                            }}
                            onClick={(e) => deletefinalLink(e)}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </Form.Group>
              <Form.Group style={{ marginLeft: "230px", marginTop: "7px" }}>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Elevation:
                </Form.Label>
                <div
                  style={{
                    border: "dotted",
                    width: "700px",
                    marginLeft: "20px",
                    marginTop: "-5px",
                  }}
                >
                  <ul>
                    {projectfolders.map((el) =>
                      el.projfile_linkType === "elevation" ? (
                        <li
                          style={{
                            color: "white",
                            marginLeft: "5px",
                            marginTop: "2px",
                          }}
                          key={el.projfile_id}
                        >
                          <a
                            href={el.projfile_link}
                            target="_blank"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {el.projfile_link}
                          </a>
                          <RemoveCircleIcon
                            id={el.projfile_id}
                            role="button"
                            style={{
                              color: "rgb(238, 94, 94)",
                              marginLeft: "5px",
                              fontSize: "18px",
                            }}
                            onClick={(e) => deletefinalLink(e)}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </Form.Group>
              <Form.Group style={{ marginLeft: "230px", marginTop: "7px" }}>
                <Form.Label
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  Cad:
                </Form.Label>
                <div
                  style={{
                    border: "dotted",
                    width: "700px",
                    marginLeft: "20px",
                    marginTop: "-5px",
                  }}
                >
                  <ul>
                    {projectfolders.map((el) =>
                      el.projfile_linkType === "cad" ? (
                        <li
                          style={{
                            color: "white",
                            marginLeft: "5px",
                            marginTop: "2px",
                          }}
                          key={el.projfile_id}
                        >
                          <a
                            href={el.projfile_link}
                            target="_blank"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {el.projfile_link}
                          </a>
                          <RemoveCircleIcon
                            id={el.projfile_id}
                            role="button"
                            style={{
                              color: "rgb(238, 94, 94)",
                              marginLeft: "5px",
                              fontSize: "18px",
                            }}
                            onClick={(e) => deletefinalLink(e)}
                          />
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </Form.Group>
              {/* <Form.Group style={{ marginTop: "30px" }}></Form.Group> */}
            </div>
          </>
        ) : null}
        {/* VREALISM FINAL PLANS */}
        {auth.type === "superadmin" ? (
          <>
            <p
              style={{
                marginTop: "110px",
                marginLeft: "70px",
                fontWeight: "bold",
                color: "white",
                fontSize: "30px",
              }}
            >
              Invoice information
            </p>
            <hr
              style={{
                color: "white",
                width: "1020px",
                marginLeft: "70px",
                marginTop: "-10px",
              }}
            />

            <Form.Group style={{ display: "flex" }}>
              <Form.Label
                style={{
                  width: "200px",
                  marginLeft: "100px",
                  marginTop: "50px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Wave app invoice ID
              </Form.Label>
              <Form.Control
                type="text"
                style={{ width: "150px", height: "40px", marginTop: "45px" }}
                onChange={(e) => setWaveappid(e.target.value)}
                /* value={waveappid} */
                defaultValue={invoiceid ? invoiceid : null}
              />

              <Form.Label
                style={{
                  width: "200px",
                  marginLeft: "250px",
                  marginTop: "50px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Wave status
              </Form.Label>
              <Form.Group style={{ marginTop: "10px", marginLeft: "-20px" }}>
                {auth.type === "superadmin" ? (
                  invoicelist.map((list) => (
                    <Form.Check
                      key={list.id}
                      type="switch"
                      label={list.name}
                      style={{ color: "white" }}
                      checked={list.name === invoicestatus ? true : false}
                      onChange={(e) => handleInvoiceSwitch(list)}
                    />
                  ))
                ) : (
                  <h1>No admin</h1>
                )}
              </Form.Group>
              {/*    <Form.Select
            style={{
              width: "300px",
              marginLeft: "-60px",
              height: "40px",
              marginTop: "48px",
            }}
            aria-label="Default select example"
            onChange={(e) => {
              setWaveappstatus(e.target.value);
            }}
          >
            <option style={{ color: "#aeb1b4" }}>Invoice status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Generated">Generated</option>
            <option value="Returned">Returned</option>
            <option value="Posted">Posted</option>
          </Form.Select> */}
            </Form.Group>
            <Form.Group style={{ display: "flex" }}>
              <Form.Label
                style={{
                  width: "200px",
                  marginLeft: "150px",
                  marginTop: "50px",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Wave app link
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Paste the invoice link"
                style={{
                  width: "750px",
                  height: "40px",
                  marginTop: "45px",
                  marginLeft: "-50px",
                }}
                defaultValue={invoicelink}
                onChange={(e) => setWaveapplink(e.target.value)}
              />
              <SendIcon
                role="button"
                style={{
                  color: "rgb(238, 94, 94)",
                  marginLeft: "5px",
                  fontSize: "38px",
                  marginTop: "48px",
                }}
                onClick={(e) => Sendinvoice(e)}
              />
              {issending && (
                <p
                  style={{
                    color: "red",
                    marginTop: "55px",
                    marginLeft: "10px",
                  }}
                >
                  Sending ...
                </p>
              )}
            </Form.Group>
            <Form.Group style={{ marginTop: "80px" }}></Form.Group>
          </>
        ) : null}
      </Form>
    </div>
  );
}
