import styles from './DeletionWarning.module.css';
import { deletePostThunk } from '../../redux/messageBoard';
import { deletePostReplyThunk } from "../../redux/messageBoard";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { socket } from '../../socket';

function DeletionWarning({postId, msgBoardId, classId, type}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deletePost = async () => {

        const deletedPost = {
            id: postId,
            msgBoardId: msgBoardId
        }

        closeModal()
        if (type === 'post') {
            await dispatch(deletePostThunk(deletedPost))
        } else {
            await dispatch(deletePostReplyThunk(deletedPost))
        }
        socket.emit('updateMsgBoard', {room: classId})
    }

    return (
        <div className={styles.deleteLayout}>
            <h1>{`Are you sure you want to delete this ${type === 'post' ? 'post' : 'reply'}?`}</h1>
            <div className={styles.deletionButtons}>
                <button onClick={() => deletePost()}>Yes</button>
                <button onClick={() => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default DeletionWarning;