import React from "react";

export const Pdfviewer = () => {
  return (
    <div>
      <object
        data={require("../pdf/elevation.pdf")}
        /* data="https://drive.google.com/file/d/1bHUz5KKfz0m_mstlqQTZQU9ALEiPKmL4/view" */
        /*     data="http://africau.edu/images/default/sample.pdf" */
        type="application/pdf"
        width="100%"
        height="520px"
      ></object>
    </div>
  );
};
