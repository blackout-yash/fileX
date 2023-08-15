import React, { useEffect, useState } from 'react';
import { BsFillFileEarmarkTextFill, BsFillFileEarmarkPdfFill, BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../redux/actions/actions';
import ProgressBar from "@ramonak/react-progress-bar";

function FileDropZone() {
    const [range, setRange] = useState(0);
    useEffect(() => {
        setRange(Math.min(range + 1, 90));
    }, [range]);

    const [dragging, setDragging] = useState(false);

    const handleDragStart = (e) => {
        e.dataTransfer.setData('file', e.target.id);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragEnter = (e) => {
        setDragging(true);
    }

    const handleDragLeave = (e) => {
        setDragging(false);
    }

    const dispatch = useDispatch();
    const { loading, id, error } = useSelector(state => state.details);
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        try {
            const file = e.dataTransfer.files[0];
            if (e.dataTransfer.files[1]) {
                dispatch({
                    type: "Error",
                    payload: "You are allowed to drop 1 file only!"
                });
                return;
            }
            handleDrop(file);
        } catch (error) {
            handleDrop(e.target.files[0]);
        }
    };

    const handleDrop = async (file) => {
        try {
            const formData = new FormData();
            formData.append('myfile', file);

            dispatch(uploadFile(formData));
        } catch (err) {
            dispatch({
                type: "Error",
                payload: err.message || "Something went wrong!"
            });
        }
    }

    useEffect(() => {
        console.log(loading);
        if (loading === false) {
            if (error) {
                toast.error(error);
                dispatch({
                    type: "clearError"
                });
            } else if (id) {
                navigate(`/download/${id}`);
                dispatch({
                    type: "clearId"
                });
            }
        }
    }, [dispatch, error, id, loading, navigate]);

    return (
        <div className='container'>
            <div className='body'>
                <h1>Upload a file</h1>
                <div className='upload-container'>
                    {/* onDragStart, onDragOver,.., onDrop => built-in event handler in react  */}
                    <div className='border-container'
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handle}
                    >
                        <div className={`icons ${dragging ? 'dragging' : ''}`}>
                            <div className='start'><BsFillFileEarmarkPdfFill /></div>
                            <div className='middle'><BsFillFileEarmarkImageFill /></div>
                            <div className='end'><BsFillFileEarmarkTextFill /></div>
                        </div>
                        <div className='text'>
                            <p>
                                Drop me something or, &nbsp;
                                <label className='custom-file-upload' htmlFor='file-upload'>browse</label>
                                <input type="file" id="file-upload" onChange={handle} />
                                &nbsp; your computer
                            </p>
                        </div>
                    </div>
                </div>
                {/* https://www.npmjs.com/package/@ramonak/react-progress-bar */}
                {/* isLabelVisible => x% is not visible */}
                <div className='progress'>
                    {loading ? <ProgressBar completed={range} bgColor={'#1629ffbe'} isLabelVisible={false} /> :
                        <ProgressBar completed={60} baseBgColor={'#f9f9f9'} bgColor={'#f9f9f9'} />
                    }
                </div>
            </div>
        </div>
    );
}

export default FileDropZone;
