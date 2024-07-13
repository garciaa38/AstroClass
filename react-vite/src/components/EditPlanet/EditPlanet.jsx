import { editPlanetThunk } from "../../redux/classes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";
import styles from './EditPlanet.module.css';

function EditPlanet({ studentClassId, classId, planet }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [currPlanet, setCurrPlanet] = useState(planet)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPlanet = {
            planet: currPlanet
        }
        
        await dispatch(editPlanetThunk(studentClassId, newPlanet))
        socket.emit('updateClasses', {room: classId, type: 'edit'})
        closeModal()
    }
    
    return (
        <div>
            <h1>Select a new planet</h1>
            <form onSubmit={handleSubmit}>
                <select name="planets" id="planets" value={currPlanet} onChange={(e) => setCurrPlanet(e.target.value)}>
                    <option value="Any">Any</option>
                    <option value="mercury">Mercury</option>
                    <option value="venus">Venus</option>
                    <option value="earth">Earth</option>
                    <option value="mars">Mars</option>
                    <option value="jupiter">Jupiter</option>
                    <option value="saturn">Saturn</option>
                    <option value="uranus">Uranus</option>
                    <option value="neptune">Neptune</option>
                    <option value="pluto">Pluto</option>
                </select>
                <button type='submit'>Change Planet</button>
            </form>

        </div>

    )
}

export default EditPlanet;