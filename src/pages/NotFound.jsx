import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page">
      <div className="state-card">
        <h1>404</h1>
        <p>The page you requested does not exist.</p>
        <Link className="btn primary" to="/">Go Home</Link>
      </div>
    </div>
  );
}