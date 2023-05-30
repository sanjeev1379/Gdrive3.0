import { useState, useEffect } from "react";
import "./Global.css";

const Display = ({contract, account}) => {
    const [files, setFiles] = useState([]);
    const getUploadedFiles = async () => {
        let filesArray;
        const selectedAddress = document.querySelector(".address").value;
        if(selectedAddress) {
            filesArray =  await contract.display(selectedAddress);
        } else {
            console.log('Display Account',account)
            filesArray = await contract.display(account)
        }

        const isEmpty = Object.keys(filesArray).length === 0;
        if(!isEmpty) {
            const strFiles = filesArray.toString();
            const strArray = strFiles.split(",");
            const images = strArray.map((item, index)=> {
                if(item.substring(7) != 'undefined' && item.substring(7) != undefined) {
                    return (
                        <a href={item} key={index} target="_blank">
                            <img 
                                key={index} 
                                src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                                alt={'Images'}
                                className="image-list" />
                        </a>
                    )
                }
            });
            setFiles(images);
        } else {
            alert('No Image to display!')
        }
    }
    return <>
        <div className="image-list">{files && files.length > 0 ? files : ''} </div>
        <input type="text" placeholder="Enter Address" className="address" />
        <button 
            className="center button" 
            onClick={getUploadedFiles}> Get Uploaded Files </button>
    </>
}

export default Display;