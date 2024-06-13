'use client'
import {Button, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import React from "react";

export function SignUpForm() {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    return (
        <>
            <a className="block cursor-pointer text-blue-500 active:text-purple-500 " onClick={() => {

                console.log("clicked")
                setIsModalOpen(true)
            }}>Dont have an account?</a>
            <Modal id='sign-up-modal' show={isModalOpen} onClose={() => {
                setIsModalOpen(false)
            }}>
                <ModalHeader />
                <ModalBody>

                <form
                className="flex-col gap-4  py-20 flex items-center bg-auto container w-full md:w-1/2 md: mx-auto bg-slate-400 md:mt-16">
                <div>

                    <TextInput id="FullName" type="FullName" placeholder="Full Name" required/>
                </div>
                <div>
                    <TextInput id="User-Name" type="User Name" placeholder="User Name" required/>
                </div>
                <div>
                    <TextInput id="Email" type="Email" placeholder="name@example.com" required/>
                </div>
                <div>
                    <TextInput id="Password" type="Password" placeholder="Password" required/>
                </div>
                <div>
                    <TextInput id="Re-enter-Password" type="Password" placeholder="Re-enter Password"
                               required/>
                </div>
                <Button type="submit">Submit</Button>
            </form>

        </ModalBody>
</Modal>
        </>
    )
}