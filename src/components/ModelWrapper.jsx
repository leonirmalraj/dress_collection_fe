import React, { useEffect, useRef } from "react";
// import { useTransition, animated, config } from "@react-spring/web";

const ModelWrapper = ({ showModal, handleModalToggle, children }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleModalToggle();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [handleModalToggle]);



    return (
        showModal && (
             
                 <div  ref={modalRef} >
                    {children}
                </div>
        )
    );
};

export default ModelWrapper;