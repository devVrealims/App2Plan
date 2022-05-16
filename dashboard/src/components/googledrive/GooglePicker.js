import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

function Goopicker() {
  const [openPicker, data, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "1058919206979-6maneggfujm0ajlm0dgdkuk074vecjod.apps.googleusercontent.com",
      key: "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",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i.name));
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default Goopicker;
