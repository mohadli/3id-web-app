import React from 'react';
import classes from './FAQCard.module.css';

const FAQCard = ({data, index, isOpen, setIsOpen}) => {

    const openHandler = () =>{
        isOpen === index ? setIsOpen(null) : setIsOpen(index)
    }
    return (
        <div className={`${classes.container} my-1 width-100 px-5 py-3`}>
            <div className={`width-100 row jc-between ai-center`} >
                <span className={`${isOpen === index && 'text-yellow'} fs-02 width-90`}>{data?.title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 51" fill="none" onClick={openHandler}>

                    {isOpen === index ? <><circle cx="25.3309" cy="25.3309" r="25.3309" transform="matrix(1 0 0 -1 0.338257 50.6616)" fill="#6389FF"/>
                            <path d="M17.4125 28.4404L25.6691 20.2212L33.9257 28.4404" stroke="#EAEAEA"
                                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
                        :
                        <>
                            <circle cx="25.6687" cy="25.9925" r="24.8309" fill="#27283B" stroke="#6389FF"/>
                            <path d="M17.4125 22.8828L25.6691 31.1021L33.9257 22.8828" stroke="#EAEAEA"
                                  strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                        </>
                    }
                </svg>
            </div>
            <div className={`pt-2`} style={{display: isOpen === index ? "revert" : "none"}}>
                {isOpen === index  && <div>{data?.content}</div>}
            </div>
        </div>
    );
};

export default FAQCard;
