import axios from "axios";
import React, { useEffect, useState } from "react";
import { Data } from "./Constant";

const UserData = () => {
    const [user, setUser] = useState<Data[]>([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState<number | undefined>(undefined);
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState<number | undefined>(undefined);;
    const [course, setCourse] = useState("");
    const [updateId, setUpdateId] = useState<number | null>(null);

    const newData = {
        name: name,
        gender: gender,
        age: age,
        course: course,
        mobile: mobile,
    };

    const postData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/user/add",
                newData
            );
            console.log(response.data);
            clearForm();
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/user");
            console.log("getuser", response.data);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteData = async (_id: number) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/user/delete/${_id}`
            );
            console.log(response.data);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/user/update/${updateId}`,
                newData
            );
            console.log(response.data);
            clearForm();
            setUpdateId(null);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (_id: number) => {
        const selectedItem: Data | undefined = user.find(
            (item) => item._id === _id
        );
        if (selectedItem) {
            setName(selectedItem.name);
            setAge(selectedItem.age);
            setCourse(selectedItem.course);
            setGender(selectedItem.gender);
            setMobile(selectedItem.mobile);
            setUpdateId(_id);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updateId) {
            updateData();
        } else {
            postData();
        }
    };

    const clearForm = () => {
        setName("");
        setAge(undefined);
        setCourse("");
        setMobile(undefined);
        setGender("");
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>UserData</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label>Age:</label>
                <input
                    type="number"
                    placeholder="age"
                    value={age !== undefined ? age.toString() : ""}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    required
                />
                <br />
                <label>Course:</label>
                <input
                    type="text"
                    placeholder="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                />
                <br />
                <label>Gender:</label>
                <input
                    type="text"
                    placeholder="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                />
                <br />
                <label>Mobile:</label>
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile !== undefined ? mobile.toString() : ""}
                    onChange={(e) => setMobile(parseInt(e.target.value))}
                    required
                />
                <br />
                <input type="submit" value={updateId ? "Update" : "Submit"} />
            </form>
            <hr />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                }}>
                {user.map((item) => {
                    return (
                        <div
                            key={item._id}
                            style={{
                                border: "1px dotted gray",
                                padding: "10px",
                                textAlign: "center",
                            }}>
                            <h1>{item.name}</h1>
                            <p>{item.age}</p>
                            <p>{item.course}</p>
                            <p>{item.gender}</p>
                            <p>{item.mobile}</p>
                            <button onClick={() => handleUpdate(item._id)}>
                                Edit
                            </button>
                            <button onClick={() => deleteData(item._id)}>
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserData;
