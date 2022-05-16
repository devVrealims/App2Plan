import { Document, Page } from "react-pdf";

export const Pdfview = () => {
  const uerele =
    "https://drive.google.com/file/d/1bHUz5KKfz0m_mstlqQTZQU9ALEiPKmL4/view";
  return (
    <div>
      <Document file={uerele} />
    </div>
  );
};
