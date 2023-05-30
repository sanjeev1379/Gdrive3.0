import { useState, useEffect } from "react";
import "./Global.css";

const Modal = ({setModalOpen, contract}) => {

    const shareNow = async () => {
        const selectedAddress = document.querySelector(".address").value;
        await contract.allow(selectedAddress);
        alert('Share Successfully!')
        setModalOpen(false);
    }

    useEffect(()=> {
        const accessList = async () => {
            const addressList =  await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = addressList;

            for(let i=0; i<options.length; i++) {
                let opt = options[i];
                let el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }
        contract && accessList();
    },[])
    return <>
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Share With</div>
                <div className="body">
                    <input 
                        type="text"
                        className="address"
                        placeholder="Enter Address"
                    />
                </div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option className="address">Pepole with Access</option>
                    </select>
                </form>
                <div className="footer">
                    <button
                        onClick={()=>{
                            setModalOpen(false);
                        }}
                        id="cancelBtn">Cancel</button>
                    <button
                        onClick={()=> shareNow()}
                        id="shareBtn">Share</button>
                </div>
            </div>
        </div>
    </>
}

export default Modal;