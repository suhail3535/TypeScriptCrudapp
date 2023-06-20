import axios from "axios";
import React, { useEffect, useState } from "react";
import { Data } from "./Constant";
import style from "./User.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const UserData = () => {
    const [user, setUser] = useState<Data[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState<number | undefined>(undefined);
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState<number | undefined>(undefined);
    const [course, setCourse] = useState("");
    const [updateId, setUpdateId] = useState<number | null>(null);
const toast = useToast();
    const newData = {
        name: name,
        email:email,
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
            setEmail(selectedItem.email);
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
                toast({
                    title: "Details Updated successfully.",
                    description: "",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
        } else {
            postData();
                toast({
                    title: "Details Added successfully.",
                    description: "",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                });
        }





    };

    const clearForm = () => {
        setName("");
        setAge(undefined);
        setCourse("");
        setMobile(undefined);
        setGender("");
        setEmail("");
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div id={style.heading}>
                {" "}
                <h2>Welcome to Students Management System</h2>{" "}
            </div>
            <div id={style.main_container}>
                {/* //Form Input div */}
                <div id={style.formdiv}>
                    <h1>Add New Student</h1>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Age</FormLabel>
                            <Input
                                type="number"
                                placeholder="age"
                                value={age !== undefined ? age.toString() : ""}
                                onChange={(e) =>
                                    setAge(parseInt(e.target.value))
                                }
                                required
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Course</FormLabel>
                            <Input
                                type="text"
                                placeholder="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                placeholder="Select Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required>
                                <option>Male</option>
                                <option>Female</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Mobile</FormLabel>
                            <Input
                                type="number"
                                placeholder="Mobile"
                                value={
                                    mobile !== undefined
                                        ? mobile.toString()
                                        : ""
                                }
                                onChange={(e) =>
                                    setMobile(parseInt(e.target.value))
                                }
                                required
                            />
                        </FormControl>
                        <input
                            id={style.submit}
                            type="submit"
                            value={updateId ? "Update" : "Submit"}
                        />
                    </form>
                </div>

                {/* Students details DIV */}
                <div id={style.detail_maindiv}>
                    <div id={style.carddiv}>
                        <h1>All Students Details</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Course</th>
                                    <th>Gender</th>
                                    <th>Mobile</th>
                                    <th>Actions</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.age}</td>
                                        <td>{item.course}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.mobile}</td>
                                        <td>
                                            <button
                                                className={style.update}
                                                onClick={() =>
                                                    handleUpdate(item._id)
                                                }>
                                                Edit
                                                <FaEdit
                                                    style={{
                                                        marginTop: "5px",
                                                        marginLeft: "8px",
                                                        color: "black",
                                                    }}
                                                />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={style.delete}
                                                onClick={() =>
                                                    deleteData(item._id)
                                                }>
                                                Delete
                                                <MdDelete
                                                    style={{
                                                        marginTop: "5px",
                                                        marginLeft: "8px",
                                                        color: "black",
                                                    }}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserData;
