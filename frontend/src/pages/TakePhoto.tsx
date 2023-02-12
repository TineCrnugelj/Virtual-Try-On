import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaCamera} from "react-icons/fa";

import classes from './TakePhoto.module.css';
import tine3 from '../images/tine3.jpg';

const TakePhoto = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const navigate = useNavigate();

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({video: {
                width: 1920, height: 1080
            }})
            .then(stream => {
                let video = videoRef.current;
                // @ts-ignore
                video.srcObject = stream;
                // @ts-ignore
                video.play();
            })
            .catch(err => console.error(err));
    }

    const takePhoto = () => {
        const width = 768; //640;
        const height = 1024; // width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        // @ts-ignore
        photo.width = width;
        // @ts-ignore
        photo.height = height;

        // @ts-ignore
        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    }

    const closePhoto = () => {
        /*
        let photo = photoRef.current;
        // @ts-ignore
        let ctx = photo.getContext('2d');
        // @ts-ignore
        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);
         */
        navigate('/quiz');
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    return (
        <div style={{ display: 'block' }}>
            <h1>Zajem slike</h1>
            <p className="text-info">Prosimo, da se v kader postavite vidni od pasu navzgor</p>
            <div className={classes.camera}>
                <video className={classes.video} ref={videoRef}/>
            </div>
            <Button style={{ marginBottom: '0.5rem' }} variant='primary' onClick={takePhoto}><FaCamera size={25} /></Button>
            {/*
                <div className={classes.result + (hasPhoto ? classes.hasPhoto : '')}>
                <canvas ref={photoRef}/>
                <img src={tine3} alt="sample" />
            </div>
            */}
            <div className={classes.result + classes.hasPhoto}>
                <img src={tine3} alt="sample" />
            </div>

            <Button variant='primary' onClick={closePhoto}>Nadaljuj</Button>
        </div>
    );
}

export default TakePhoto;
