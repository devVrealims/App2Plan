import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export const AddressAutoComplete = ({ homeaddress, setHomeaddress }) => {
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBNPVvrMUVEGNXollqj4pQO0czA8RaRGRk"
        apiOptions={{ language: "en", region: "ca" }}
        selectProps={{
          onChange: (e) => setHomeaddress(e.label),
        }}
      />
    </div>
  );
};
