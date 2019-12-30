import React, { useState } from 'react';
import CryptoJS from 'crypto-js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        '& > *': {
            margin: theme.spacing(10),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButtons() {
    const classes = useStyles();
    const [file, setFile] = useState([])
    const [password, setPassword] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function change(e) {
        setFile(e.target.files[0])
        if (e.target && e.target.files && e.target.files[0].size > 1024 * 1024) {
            alert('Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue.');
            return;
        }
        else {
            handleOpen()
        }
    }

    const validate = () => {
        if (password.length < 16) { alert('Your password must have the minimum length of 16!!!!') }
        else {
            var reader = new FileReader();
            reader.onload = function (ee) {
                var encrypted = CryptoJS.AES.encrypt(ee.target.result, password);
                const link = document.createElement('a');
                link.href = 'data:application/octet-stream,' + encrypted;
                link.setAttribute('download', file.name + '.encrypted');
                document.body.appendChild(link);
                link.click();
            };
            reader.readAsDataURL(file);
            handleClose()
        }
    }


    return (
        <div className={classes.root}>
            <h1>Encrypt you file here</h1>
            <div>
                <input
                    accept="*/*"
                    className={classes.input}
                    id="contained-button-file-encrypt"
                    onChange={change}
                    multiple
                    type="file"
                />
                <Tooltip title="Encrypt">
                    <label htmlFor="contained-button-file-encrypt">
                        <Button variant="contained" color="primary" component="span">
                            Encrypt
                        </Button>
                    </label>
                </Tooltip>
                <p style={{ color: "white" }}> <ArrowUpwardIcon />Click the button to upload a file to encrypt</p>
                <Modal
                    aria-labelledby="transition-modal-title1"
                    aria-describedby="transition-modal-description1"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title1">Input your password here</h2>
                            <TextField id="standard-basic1" type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
                            {console.log(password)}
                            <Button onClick={validate} style={{ color: "green" }}>
                                Validate
                            </Button>
                            <Button onClick={handleClose} style={{ color: "red" }}>
                                Close
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}