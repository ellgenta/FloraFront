import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import type { User } from "../../types/user";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await userApi.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Load users error:", error);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  if (isLoading) return (
    <div className="admin-page">
      <div className="admin-page-title"><h2>Users</h2><p>Loading users...</p></div>
    </div>
  );

  if (error) return (
    <div className="admin-page">
      <div className="admin-page-title"><h2>Users</h2><p>{error}</p></div>
      <button type="button" className="admin-primary-btn" onClick={loadUsers}>Try Again</button>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Users</h2>
        <p>View registered customers</p>
      </div>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={4} className="admin-empty-cell">No users found</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminUsers;