import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "./imageState";
import axios from "axios"
import styles from "./styles.module.css"
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ViewImages = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [dialogImage, setdialogImage] = useState();

    const handleClose = () => {
        setOpen(false);
    };

    let photos = useSelector(state => state.gallery.photos);
    console.log('Phtos --->', photos)

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    //Filter Out all the Photos based Upon Users
    photos = photos.filter((photo) => photo.email === localStorage.getItem("email"))
    const handleView = async (e) => {
        try {
            let res = await axios.post('http://localhost:8080/api/update/view', { "id": e.target.value });
            setdialogImage(res.data);
            setOpen(true);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })}  
        }
    }


    return (
        <div >
            <h1 className={styles.image_h1}>Photos </h1>
            {!photos.length && <h1 className={styles.image_h1}>Please Add Some Pictures</h1>}
            <div className={styles.image_container}>
                <Grid container rowSpacing={3} spacing={3}>

                    {photos.map((photo) =>
                        <Grid item xs={2}>

                            <div className={styles.image_content}>
                                <img key={photo._id}
                                    alt={photo.title}
                                    src={photo.url}
                                    width="200"
                                    height="200"
                                    value={photo._id}
                                 />
                                <div className={styles.btn}>
                                    <Button size="large" variant="contained" key={photo} value={photo._id} onClick={handleView} >
                                        View
                                    </Button>

                                </div>

                                {open && <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>
                                        Image
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            <img key={dialogImage._id}
                                                alt={dialogImage.title}
                                                src={dialogImage.url}
                                                width="500"
                                                height="400"
                                                value={dialogImage._id}
                                                onClick={handleView} />
                                        </DialogContentText>
                                        <h1>View Count: {dialogImage.viewcount + 1}</h1>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>}
                            </div>

                        </Grid>
                    )}

                </Grid>
            </div>
        </div>
    )
}

export default ViewImages