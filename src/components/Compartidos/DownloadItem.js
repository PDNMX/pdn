import {Button} from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import React from "react";


function DownloadItem ({ item }){
    const download = () => {
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(item,null, 4)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'registro.json';
        a.click();
    }

    return (
        <div>
            <Button variant={'outlined'} startIcon={<CloudDownloadIcon />} onClick={download}>
                {'Descargar'}
            </Button>

        </div>
    );
}

export default DownloadItem