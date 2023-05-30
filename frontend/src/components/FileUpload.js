import { useState } from "react";
import axios from 'axios';
import './Global.css'

const FileUpload = ({contract, account, provider}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image selected");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `856895410795374e7852`,
                        pinata_secret_api_key: `dde582da50a8a187a0a2d21cbc9b86c93a94d807e840596a00f46f6bf323bbec`,
                        "Content-Type": "miltipart/form-data",
                    }
                });
                const imageHash = `ipfs://${response.data.IpfsHash}`;
                // const signer = contract.connect(provider.getSigner());
                contract.add(account, imageHash);
                alert('Successfully Image Upload');

                setFileName('No image selected');
                setFile(null);
            } catch(error) {
                alert('Unable to upload image to Pinata!')
            }
        }
    }
    const retrieveFile = (event) => {
        const data = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(event.target.files[0]);
        }
        setFileName(event.target.files[0].name);
        event.preventDefault();
    }
    return <>
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">Choose Image</label>
                <input 
                    disabled={!account} 
                    type="file" 
                    id="file-upload" 
                    name="data" 
                    onChange={retrieveFile} 
                />
                <span className="textArea">Image: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>Upload File</button>
            </form>
        </div>
    </>
}

export default FileUpload;