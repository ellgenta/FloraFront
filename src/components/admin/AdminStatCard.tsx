import { Link } from "react-router-dom";

type AdminStatCardProps = {
  title: string;
  value: string | number;
  iconSrc: string;
  iconAlt: string;
  to: string;
};

const AdminStatCard = ({
  title,
  value,
  iconSrc,
  iconAlt,
  to,
}: AdminStatCardProps) => {
  return (
    <Link to={to} className="admin-stat-card">
      <div className="admin-stat-icon">
        <img src={iconSrc} alt={iconAlt} />
      </div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </Link>
  );
};

export default AdminStatCard;