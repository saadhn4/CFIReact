import React, { useEffect, useState } from "react";
import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users";
const AUTH_TOKEN = ""; // Replace with your GitHub token

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(GITHUB_API_URL, {
          headers: {
            Authorization: `token ${AUTH_TOKEN}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(
          `${GITHUB_API_URL}/${e.target.value}`,
          {
            headers: {
              Authorization: `token ${AUTH_TOKEN}`,
            },
          }
        );
        setFilteredUsers([response.data]);
      } catch (error) {
        console.error("Error fetching user:", error);
        setFilteredUsers([]);
      }
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        GitHub Profile Searcher
      </h1>
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={search}
        onChange={handleSearch}
        className="mb-4 w-full p-2 border rounded-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <img
                className="w-20 h-20 mb-2 rounded-full border border-gray-300"
                src={user.avatar_url}
                alt={user.login}
              />
              <h2 className="text-lg font-semibold">
                {user.name || user.login}
              </h2>

              <h2 className="text-lg font-semibold">{user.followers}</h2>

              <p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
