import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "../state/Admin/allUsers/Action.js";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pagination } from "@mui/material";

const Customers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold p-4">All Customers</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr className="text-base">
                <th className="px-4 py-2 text-left">User Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 text-xs"
                >
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePaginationChange}
          color="bg-gray-1500"
          size="large"
        />
      </div>
    </div>
  );
};

export default Customers;
