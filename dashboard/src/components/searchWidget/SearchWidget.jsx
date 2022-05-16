import "./searchWidget.css";
import { Button } from "react-bootstrap";
export default function SearchWidget({ search, setSearch }) {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="By address"
        id="search"
        type="text"
        role="searchbox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" style={{ color: "#ffffff", marginTop: "-4px" }}>
        Search
      </Button>
    </form>
  );
}
