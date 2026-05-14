const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage your FloraShop store</p>
      </div>

      <div className="admin-header-right">
        <input
          type="text"
          placeholder="Search..."
          className="admin-search"
        />

        <div className="admin-profile">
          <span>👤</span>
          <p>Admin</p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;