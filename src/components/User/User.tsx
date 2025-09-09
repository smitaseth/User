import React, { useState, useEffect } from "react";

import useUser from "./useUser";
import Search from "../Search/Search";

import AddUser from "../AddUser/AddUser";

const User = (): React.ReactElement => {
  const { user, loading, error } = useUser();

  const [filteredUser, setFilteredUser] = useState<any[]>(user || []);

  const [favorites, setFavorites] = useState<number[]>([]); // Store favorite user IDs
  const [editingId, setEditingId] = useState<number | null>(null); // Track the user being edited
  const [editedUser, setEditedUser] = useState<any>({}); // Track the edited user data
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Set filteredUser when user data is loaded
  useEffect(() => {
    if (user) {
      setFilteredUser(user);
    }
  }, [user]); // Run this effect only when `user` changes

  const onFiltered = (filtered: any[]) => {
    setFilteredUser(filtered);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleEdit = (id: number) => {
    setEditingId(id); // Set the ID of the user being edited
    const userToEdit = filteredUser.find((item) => item.id === id);
    setEditedUser(userToEdit); // Set the user data to be edited
  };

  const handleSave = async (id: number) => {
    try {
      // Send a PATCH request to update the user on the server
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Update the user in the local state
      setFilteredUser((prev) =>
        prev.map((item) => (item.id === id ? editedUser : item))
      );
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedUser((prev: any) => ({
      ...prev,
      [field]: e.target.value, // Update the specific field being edited
    }));
  };

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <div>
        <AddUser userid={1} />
        <Search user={user || []} onFilter={onFiltered} />
        <div>
          {filteredUser.map((item: any) => (
            <div
              key={item.id}
              className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-2"
            >
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="border p-2 rounded"
                  />
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange(e, "email")}
                    className="border p-2 rounded"
                  />
                  <button
                    onClick={() => handleSave(item.id)}
                    className="cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="cursor-pointer"
                  >
                    {favorites.includes(item.id) ? "Unfavorite" : "Favorite"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
