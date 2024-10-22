import React from 'react';

const DisplayMenu = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  return (
    <div className="display-menu">
      <label>Grouping</label>
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="select-control">
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      <label>Sorting</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select-control">
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>

      <style jsx>{`
        .display-menu {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }
        .select-control {
          margin: 0 10px;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default DisplayMenu;
