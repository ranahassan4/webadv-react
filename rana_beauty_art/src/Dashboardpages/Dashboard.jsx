import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Link to="/Product-Create">Create product</Link>
      <Link to="/ProductList">product table</Link>
    </div>
  );
}
