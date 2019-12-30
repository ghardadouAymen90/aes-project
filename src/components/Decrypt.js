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
        setOpen(!open);
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
                var decrypted = CryptoJS.AES.decrypt(ee.target.result, password)
                    .toString(CryptoJS.enc.Latin1);
                if (!/^data:/.test(decrypted)) {
                    alert("Invalid pass phrase or file! Please try again.");
                    return false;
                }
                const link = document.createElement('a');
                link.href = decrypted;
                link.setAttribute('download', file.name.replace('.encrypted', ''));
                document.body.appendChild(link);
                link.click();
            };
            reader.readAsText(file);
        }
    }

    return (
        <div className={classes.root}>
            <h1 style={{fontSize:"40px"}}>Decrypt you file here</h1>
            <div>
                <input
                    accept="*/*"
                    className={classes.input}
                    id="contained-button-file-decrypt"
                    onChange={change}
                    multiple
                    type="file"
                />
                <Tooltip title="Decrypt">
                    <label htmlFor="contained-button-file-decrypt">
                        <Button variant="contained" color="secondary" component="span">
                            Decrypt
                    </Button>
                    </label>
                </Tooltip>
                <p style={{ color: "white" }}> <ArrowUpwardIcon />Click the button to upload a file to decrypt</p>
                <Modal
                    aria-labelledby="transition-modal-title2"
                    aria-describedby="transition-modal-description2"
                    className={classes.modal}
                    open={open}
                    onClose={handleOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title2">Input your password here</h2>
                            <TextField id="standard-basic2" type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
                            {console.log(password)}
                            <Button onClick={validate} style={{ color: "green" }}>
                                Validate
                            </Button>
                            <Button onClick={handleOpen} style={{ color: "red" }}>
                                Close
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}
