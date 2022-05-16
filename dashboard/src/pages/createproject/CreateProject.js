import { useState, useEffect, useRef } from "react";
import { Form, Button, FloatingLabel, FormGroup, Label } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import StorageIcon from "@mui/icons-material/Storage";
import { AddressAutoComplete } from "../../components/addressautocomplete/AddressAutoComplete";
import Geocode from "react-geocode";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

/* Geocode.setApiKey("AIzaSyBNPVvrMUVEGNXollqj4pQO0czA8RaRGRk"); */

import "bootstrap/dist/css/bootstrap.min.css";
import "./createProject.css";
import { padding } from "@mui/system";
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

const CreateProject = () => {
  const [homeaddress, setHomeaddress] = useState("");
  const [homeownername, setHomeownername] = useState("");
  const [homeownerphone, setHomeownerphone] = useState("");
  const [homeownermail, setHomeownermail] = useState("");
  const [housesqft, setHousesqft] = useState("");
  const [projectownername, setProjectownername] = useState("");
  const [clientid, setClientid] = useState("");
  const [companyrequest, setCompanyrequest] = useState("");
  const [projectdescription, setProjectdescription] = useState("");
  const [currentdate, setCurrentdate] = useState(new Date());
  const [checkboxes, setCheckboxes] = useState(initialboxes);
  const [clients, setClients] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [company2client, setCompany2client] = useState("");
  const [results, setResults] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [issending, setIssending] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  //const autoid = Date.now();
  const [independentclient, setIndependentclient] = useState("");
  //console.log(companies);

  /* console.log(companyrequest);
  console.log(projectownername); */
  /////////////////////////////////////////////////////////////////////////////////

  const RenderAddress = (e) => {
    setHomeaddress(e.target.value);
    Geocode.setApiKey("AIzaSyBNPVvrMUVEGNXollqj4pQO0czA8RaRGRk");
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromAddress(e.target.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setZipcode(response.results[0].address_components[8].short_name);
        setState(response.results[0].address_components[5].short_name);
        setCity(response.results[0].address_components[3].short_name);
        setResults(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  console.log(results);

  //////////////////////////////////////////////////////////////////////////////////

  const containerStyle = {
    width: "300px",
    height: "450px",
    marginTop: "-800px",
    marginLeft: "740px",
    border: "solid 3px gray",
    backgroundColor: "white",
  };

  /////////////////////////////////////////////////////

  const createIndClient = (e) => {
    setIndependentclient(e.target.value);
    setProjectownername(e.target.id);
  };

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Toggle the checkboxes//
  const handleCheck = (id) => {
    const listItems = checkboxes.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCheckboxes(listItems);
  };
  //Toggle the checkboxes//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring the companies//
  useEffect(() => {
    fetch("https://server.vrealism.com:5000/api/companies")
      /* https: fetch("http://34.125.79.13:5000/api/companies") */
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        setCompanies(res);
      });
  }, []);
  //console.log(companies);
  //Bring the companies//

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  //Bring the client by company and set company//
  const bringClientFunction = (e) => {
    setCompanyrequest(e);
    setCompany2client(e);
    const company = e;
    /*    fetch("http://34.125.79.13:5000/bringClient", { */
    fetch("https://server.vrealism.com:5000/bringClient", {
      method: "POST",
      body: JSON.stringify({
        company,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      //.then((json) => console.log(json));
      .then((res) => {
        const data = res.map((items) => ({
          name: items.cli_name,
          id: items.cli_id,
        }));
        setClients(data);
      });
  };

  //*********************************************************** //
  /////////////////SEPARATOR//////////////////////////////////////
  //*********************************************************** //

  ///Event of form submit///
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIssending(true);
    }, 1000);
    setTimeout(() => {
      setIssending(false);
    }, 2000);
    //Insert fetch on project first infomation//
    fetch("https://server.vrealism.com:5000/create", {
      /*  fetch("http://34.125.79.13:5000/create", { */
      method: "POST",
      body: JSON.stringify({
        homeaddress,
        homeownername,
        homeownerphone,
        homeownermail,
        housesqft,
        projectownername,
        companyrequest,
        projectdescription,
        currentdate,
        checkboxes,
        independentclient,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    //Insert fetch on project first infomation//
    setHomeaddress("");
    setHomeownername("");
    setHomeownerphone("");
    setHomeownermail("");
    setHousesqft("");
    setProjectownername("");
    setCompanyrequest("");
    setProjectdescription("");
    setCurrentdate("");
    setCheckboxes(initialboxes);
  };
  ///Event of form submit///

  //*********************************************************** //
  ////////////////////SEPARATOR///////////////////////////////////
  //*********************************************************** //
  return (
    <div className="flex-right">
      <Form onSubmit={handleSubmit}>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>
          As Built Service - check list
        </p>
        <Form.Group className="mb-1" controlId="formBasicNamel">
          <FloatingLabel
            controlId="floatingInput"
            label="House Address"
            className="mb-1"
          >
            <Form.Control
              style={{
                width: "700px",
                textAlign: "left",
              }}
              type="text"
              /* onChange={(e) => setHomeaddress(e.target.value)} */
              onChange={(e) => RenderAddress(e)}
              onBlur={(e) => RenderAddress(e)}
              onMouseUp={(e) => RenderAddress(e)}
              value={homeaddress}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicNamel">
          <FloatingLabel
            controlId="floatingInput"
            label="House Sqft (Approx, Type it in floating form  2,400)"
            className="mb-1"
          >
            <Form.Control
              style={{ width: "700px" }}
              type="text"
              onChange={(e) => setHousesqft(e.target.value)}
              value={housesqft}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicNamel">
          <FloatingLabel
            controlId="floatingInput"
            label="Homeowner Name"
            className="mb-1"
          >
            <Form.Control
              style={{ width: "700px" }}
              type="text"
              onChange={(e) => setHomeownername(e.target.value)}
              value={homeownername}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicNamel">
          <FloatingLabel
            controlId="floatingInput"
            label="Homeowner Phone"
            className="mb-1"
          >
            <Form.Control
              style={{ width: "700px" }}
              type="text"
              onChange={(e) => setHomeownerphone(e.target.value)}
              value={homeownerphone}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicNamel">
          <FloatingLabel
            controlId="floatingInput"
            label="Homeowner Email"
            className="mb-1"
          >
            <Form.Control
              style={{ width: "700px" }}
              type="text"
              onChange={(e) => setHomeownermail(e.target.value)}
              value={homeownermail}
            />
          </FloatingLabel>
        </Form.Group>
        {/*//*********************************************************** //
        /////////////////SEPARATOR//////////////////////////////////////
        //*********************************************************** //*/}
        {/* Bring  Companies */}
        <Form.Group className="mb-1" controlId="formBasicNamel">
          <Form.Select
            style={{ width: "700px" }}
            aria-label="Default select example"
            //onChange={(e) => setCompanyrequest(e.target.value)}
            onChange={(e) => bringClientFunction(e.target.value)}
          >
            <option style={{ color: "#aeb1b4" }}>
              Company requesting service
            </option>
            {companies.map((element) => (
              <option value={element.com_id} key={element.com_id}>
                {element.com_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* Bring  Companies */}
        {/*//*********************************************************** //
        /////////////////SEPARATOR//////////////////////////////////////
        //*********************************************************** //*/}
        {/* Bring Clients by Company */}
        <Form.Group className="mb-1" controlId="formBasicNamel">
          {company2client === "17" ? (
            <FloatingLabel label="Project owner name" className="mb-1">
              <Form.Control
                id={Date.now()}
                style={{ width: "700px" }}
                type="text"
                onChange={(e) => createIndClient(e)}
              />
            </FloatingLabel>
          ) : (
            <Form.Select
              style={{ width: "700px" }}
              aria-label="Default select example"
              onChange={(e) => setProjectownername(e.target.value)}
            >
              <option style={{ color: "#aeb1b4" }}>
                Choose a project owner
              </option>
              {clients.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </Form.Select>
          )}
        </Form.Group>
        {/* Bring Clients by Company */}
        {/*//*********************************************************** //
        /////////////////SEPARATOR//////////////////////////////////////
        //*********************************************************** //*/}
        <Form.Group className="mt-4">
          <FloatingLabel className="pb-3 pt-2" style={{ fontWeight: "bold" }}>
            Type of Service
          </FloatingLabel>
          {checkboxes.map((item) => (
            <Form.Check
              key={item.id}
              type="checkbox"
              label={item.item}
              checked={item.checked}
              value={item.item}
              onChange={() => handleCheck(item.id)}
            />
          ))}
        </Form.Group>
        <Form.Group className="mb-1 mt-5" controlId="formBasicNamel">
          <FloatingLabel
            controlId="floatingInput"
            label="Input project´s description"
            className="mb-1"
          >
            <Form.Control
              style={{ width: "700px" }}
              as="textarea"
              aria-label="With textarea"
              value={projectdescription}
              onChange={(e) => setProjectdescription(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicNamel">
          {/* <FloatingLabel
            controlId="floatingInput"
            label="Current day "
            className="mb-1"
          >
            <Form.Control
              required={true}
              style={{ width: "200px" }}
              type="date"
              value={currentdate}
              onChange={(e) => setCurrentdate(e.target.value)}
            />
          </FloatingLabel> */}
          <Form.Label
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            Current Day
          </Form.Label>
          <DayPicker
            mode="single"
            selected={currentdate}
            value={currentdate}
            onSelect={setCurrentdate}
          />
        </Form.Group>
        <Button
          variant="danger"
          type="submit"
          className="mt-20 buttonhover"
          style={{ marginTop: "30px", marginLeft: "20px" }}
        >
          Rec
        </Button>
        {issending ? (
          <h3
            style={{
              color: "red",
              marginTop: "-32px",
              marginLeft: "120px",
              fontSize: "20px",
            }}
          >
            Stored
            <StorageIcon
              style={{ marginLeft: "10px", fontSize: "20px", color: "black" }}
            />
          </h3>
        ) : null}
      </Form>
      {homeaddress && (
        <>
          <Form.Group
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "-300px",
            }}
          >
            <LoadScript googleMapsApiKey="AIzaSyBNPVvrMUVEGNXollqj4pQO0czA8RaRGRk">
              <GoogleMap
                mapTypeId="satellite"
                zoom={200}
                mapContainerStyle={containerStyle}
                center={{ lat: latitude, lng: longitude }}
              >
                <Marker position={{ lat: latitude, lng: longitude }} />
              </GoogleMap>
            </LoadScript>
          </Form.Group>
          {homeaddress && (
            <Form.Group
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                marginLeft: "750px",
                marginTop: "-340px",
                padding: "-5px",
              }}
            >
              <p style={{ display: "flex", flexDirection: "row" }}>
                <p style={{ fontWeight: "bold" }}>State:</p> {/*  */}{" "}
                <small style={{ marginTop: "2px", marginLeft: "5px" }}>
                  {state}
                </small>
              </p>
              <p
                style={{
                  marginTop: "-28px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p style={{ fontWeight: "bold" }}>City:</p>
                {/*  */}
                <small style={{ marginTop: "2px", marginLeft: "5px" }}>
                  {" "}
                  {city}
                </small>
              </p>
              <p
                style={{
                  marginTop: "-25px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Zipcode:</p> {/*  */}
                <small style={{ marginTop: "2px", marginLeft: "5px" }}>
                  {" "}
                  {zipcode}
                </small>
              </p>
            </Form.Group>
          )}
        </>
      )}
    </div>
  );
};

export default CreateProject;
