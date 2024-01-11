import ButtonPDN from '../Compartidos/ButtonPDN';
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
            <ButtonPDN variant={'outlined'} startIcon={<CloudDownloadIcon style={{color: 'white'}} />} onClick={download}>
                {'Descargar'}
            </ButtonPDN>

        </div>
    );
}

export default DownloadItem