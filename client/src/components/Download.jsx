import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { server } from '../redux/store';
import { sendMail, showFile } from '../redux/actions/actions';
import { AiOutlineCopy } from "react-icons/ai";
import copy from "copy-to-clipboard";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Download = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, url, message, error } = useSelector(state => state.details);

    const handlerDownload = (e) => {
        e.preventDefault();
        window.open(`${server}/files/download/${id}`, "_self");
    }

    const handlerShow = (e) => {
        e.preventDefault();
        try {
            dispatch(showFile(id));
        } catch (err) {
            dispatch({
                type: "Error",
                payload: err.message || "Something went wrong!"
            });
        }
    }

    const [emailTo, setEmailTo] = useState("");
    const handlerMail = (e) => {
        e.preventDefault();
        try {
            const email = "fileX.admin@gmail.com"
            dispatch(sendMail(id, emailTo, email));
        } catch (err) {
            dispatch({
                type: "Error",
                payload: err.message || "Something went wrong!"
            });
        }
    }

    useEffect(() => {
        if (loading === false) {
            if (error) {
                toast.error(error);
                dispatch({
                    type: "clearError"
                });
            } else if (message) {
                setEmailTo("");
                toast.success(message);
                dispatch({
                    type: "clearMessage"
                });
                window.location.reload();
            } else if (url) {
                window.open(`${url}`, "_blank");
                dispatch({
                    type: "clearUrl"
                });
            }
        }
    }, [dispatch, error, loading, message, url])

    const [copyText, setCopyText] = useState('');
    const copyToClipboard = () => {
        copy(copyText);
        toast.success("Copied to Clipboard!");
    }

    useEffect(() => {
        setCopyText(`${server}/share/${id}`);
    }, [id]);


    return (
        <div className='container'>
            <div className='body'>
                <h1>fileX</h1>
                <div className='upload-container'>
                    <div className='border-container pad'>
                        <h4>Only for 24 hours!</h4>
                        <div className='copy'>
                            <input type="text" value={copyText} readOnly />
                            <AiOutlineCopy onClick={copyToClipboard} />
                        </div>
                        <div className='dwnl'>
                            <button onClick={handlerShow}>Show</button>
                            <button onClick={handlerDownload}>Download</button>
                        </div>
                        <div className='email'>
                            <input type="email" name="emailTo" placeholder="abc@gmail.com" autoComplete="off"
                                onChange={(e) => setEmailTo(e.target.value)}
                            />
                            <button onClick={handlerMail}>Send</button> <br />
                        </div>
                        <Link className='whatsapp' to={`https://wa.me/?text=${"Shared via fileX:"}%20${copyText}`} target='_blank'>
                            <p>Share via </p>
                            <BsWhatsapp />
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Download