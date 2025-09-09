import React, { useState } from "react";

interface EditUserProps {
  userid: number;
}

const EditUser = ({ userid }: EditUserProps): React.ReactElement => {
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
    <div>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Post Body"
        value={body}
        onChange={handleBodyChange}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};
export default EditUser;
