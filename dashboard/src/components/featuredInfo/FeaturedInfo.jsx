import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div
        className="featuredItem"
        style={{
          backgroundColor: "#031122",
          opacity: "0.8",
          boxShadow: "8px 8px 8px rgb(150, 147, 147)",
        }}
      >
        <span className="featuredTitle" style={{ color: "white" }}>
          Active projects
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" style={{ color: "white" }}>
            8
          </span>
          <span className="featuredMoneyRate">
            <EventAvailableOutlinedIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub" style={{ color: "white" }}>
          Current Month
        </span>
      </div>
      <div
        className="featuredItem"
        style={{
          backgroundColor: "#031122",
          opacity: "0.8",
          boxShadow: "8px 8px 8px rgb(150, 147, 147)",
        }}
      >
        <span className="featuredTitle" style={{ color: "white" }}>
          Pending invoices
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" style={{ color: "white" }}>
            $4,415
          </span>
          <span className="featuredMoneyRate">
            <ReceiptOutlinedIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub" style={{ color: "white" }}>
          Current Month
        </span>
      </div>
      <div
        className="featuredItem"
        style={{
          backgroundColor: "#031122",
          opacity: "0.8",
          boxShadow: "8px 8px 8px rgb(150, 147, 147)",
        }}
      >
        <span className="featuredTitle" style={{ color: "white" }}>
          Files assigned
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" style={{ color: "white" }}>
            82
          </span>
          <span className="featuredMoneyRate">
            <EventAvailableOutlinedIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub" style={{ color: "white" }}>
          Current Month
        </span>
      </div>
      <div
        className="featuredItem"
        style={{
          backgroundColor: "#031122",
          opacity: "0.8",
          boxShadow: "8px 8px 8px rgb(150, 147, 147)",
        }}
      >
        <span className="featuredTitle" style={{ color: "white" }}>
          Total Projects
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" style={{ color: "white" }}>
            1.340
          </span>
          <span className="featuredMoneyRate">
            <FactCheckOutlinedIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub" style={{ color: "white" }}>
          Current Year
        </span>
      </div>
    </div>
  );
}
