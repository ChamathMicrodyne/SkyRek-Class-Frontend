import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";

function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setIsLoading(false);
      });
  }, []);

  const deleteUser = (email) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u.email !== email));
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to delete User");
      });
  };

  return (
    <div className="w-full h-full p-6 bg-[#f4f4f5]">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full relative flex flex-col">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="overflow-hidden flex-1 overflow-y-auto hide-scrollbar">
            <div className="overflow-y-auto h-full pr-1 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
              <table className="w-full text-sm text-center">
                <thead className="text-admin-accent bg-admin-secondary sticky top-0 z-10 w-full">
                  <tr>
                    <th className="py-3">Image</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Role</th>
                    <th className="py-3">Is Blocked</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {users.map((user, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-100 transition"
                    >
                      <td className="py-2">
                        <img
                          src={user.image}
                          alt={user.firstName +" "+ user.lastName}
                          className="w-12 h-12 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="py-2">{user.firstName +" "+ user.lastName}</td>
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">{user.role}</td>
                      <td className="py-2">{`${user.isBlocked}`}</td>
                      <td className="py-2">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              navigate("/admin/edit-user", {
                                state: user,
                              })
                            }
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteUser(user.email)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Link to="/admin/add-user">
          <div className="w-[70px] h-[45px] bg-green-400 absolute bottom-10 right-8 flex justify-center items-center border-b-1 border-t-1 rounded-[5px] cursor-pointer">
            <p className="text-4xl mt-[-8px]">+</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default UsersPage;
