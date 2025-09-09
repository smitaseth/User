import React, { useState } from "react";

interface AddUserProps {
  userid: number;
}

const AddUser = ({ userid }: AddUserProps): React.ReactElement => {
  const [title, setTitle] = useState<string>(""); // State to store input value
  const [body, setBody] = useState<string>(""); // State to store input value

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value); // Update state on input change
    if (event.target.value === "") {
      //onFilter(user); // If input is cleared, reset the filter
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // Update state on input change
    if (event.target.value === "") {
      //onFilter(user); // If input is cleared, reset the filter
    }
  };
  const handleAddUser = () => {
    alert("Check console for response data");
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userid,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      <input
        type="text"
        placeholder="user name "
        value={title}
        onChange={handleTitleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="user email"
        value={body}
        onChange={handleBodyChange}
        className="border p-2 rounded"
      />
      <button
        onClick={handleAddUser}
        className="rounded bg-blue-600 text-white cursor-pointer"
      >
        Add User
      </button>
    </div>
  );
};
export default AddUser;
