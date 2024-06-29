import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewClassThunk } from "../../redux/classes";
import { useModal } from "../../context/Modal";

function AddClassModal({sessionUser}) {
    const dispatch = useDispatch()
    const [className, setClassName] = useState("")
    const [subject, setSubject] = useState("")
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newClass = {
            class_name: className,
            subject
        }

        await dispatch(addNewClassThunk(sessionUser.id, newClass));
        closeModal()


    }

    return (
        <>
            <h1>Add A New Class!</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </label>
                <button type="submit">Create Class</button>
            </form>
        </>
    )
}

export default AddClassModal;