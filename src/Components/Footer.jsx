import React from 'react';
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer bg-primary p-10 flex flex-col items-center  mt-10">
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row md:flex-row justify-between items-start border-b-1 pb-14 border-white">
                <div>
                    <p className="text-3xl font-bold text-white mb-4">Find<span className='text-secondary'>RoomMate</span></p>
                    <p className='text-white text-base'>Helping people connect and share spaces</p>
                </div>
                <div>
                    <h3 className="text-2xl text-secondary font-bold mb-4">Contact</h3>
                    <a className="text-white text-base">support@findroommate.com</a>
                    <br />
                    <a className="text-white text-base">019********</a>
                </div>
                <div>
                    <h3 className="text-2xl text-secondary font-bold mb-4">Legal</h3>
                    <a className="text-white text-base">Terms of use</a>
                    <br />
                    <a className="text-white text-base">Privacy policy</a>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-2xl text-secondary font-bold mb-4">Follow Us On</h3>
                <div className="flex space-x-4 space-y-4 justify-center text-white">
                    <a href="https://www.facebook.com/maanvia.khan/" target="_blank">
                        <FaFacebookF className="text-2xl " />
                    </a>
                    <a href="https://x.com/RahimaKhatun97" target="_blank">
                        <FaXTwitter className="text-2xl" />
                    </a>
                    <a href="https://www.linkedin.com/in/rahima-khatun28/ " target="_blank">
                        <FaLinkedinIn className="text-2xl" />
                    </a>
                </div>
                <p className='text-center text-sm text-white'>FindRoommate ⓒ 2025. All rights reserved</p>
            </div>
        </footer>
    );
};


export default Footer;