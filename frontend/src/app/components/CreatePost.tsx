'use client'
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import postimage from "@/app/images/image-4.jpg";
import Image from "next/image";

export function CreatePost() {
    const [openModal, setOpenModal] = useState(true);

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header><label htmlFor="userInput">User Selected Prompt</label></Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                        <Image className="w-80 h-auto" src={postimage} alt="placeholder logo"/>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.<br/>

                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button onClick={() => setOpenModal(false)}>Post</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}