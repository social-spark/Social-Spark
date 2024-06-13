"use client"

import {Button, Label, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import React from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {FormDebugger} from "@/app/components/FormDebugger";
import {DisplayError} from "@/app/components/DisplayError";
import {DisplayStatus} from "@/app/components/navigation/DisplayStatus";



const formSchema = z.object({
    profileEmail: z.string({required_error:"email is required to sign-in", invalid_type_error:"email must be text"}).email({ message: 'please provide a valid email' })
        .max(256, { message: 'please provide a valid email (max 256 characters)' }),

    profilePassword: z.string({required_error:"password is required to sign-in", invalid_type_error:"password must be text"})
        .min(8, { message: 'please provide a valid password (min 8 characters)' })
        .max(32, { message: 'please provide a valid password (max 32 characters)' }),

    profileUsername: z.string({required_error: 'profile username is required',
        invalid_type_error: 'please provide a valid username'})
        .trim()
        .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
        .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),
    profileFullName: z.string({required_error: 'profile fullname is required',
        invalid_type_error: 'please provide a valid profile name'})
        .trim()
        .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
        .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),


})

type FormSchema = z.infer<typeof formSchema>

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
//form will give us string content
function form (){

    const router = useRouter()

    const initialValues = {
        profileEmail:'',
        profilePassword: '',
        profileFullName: '',
        profileUsername: ''
    }


    const handleSubmit = async (values: FormSchema, actions: FormikHelpers<FormSchema> ) => {
        const {profileEmail, profilePassword, profileFullName, profileUsername} = values
        const {setStatus, resetForm} = actions

        //call the sign-in API
        fetch('/apis/sign-up', {
            method: 'POST',
            body: JSON.stringify({profileEmail, profilePassword, profileFullName, profileUsername}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok){
                return response.json()
            }
            throw new Error('Network response was not ok.')
        }).then(json => {
            let type = 'failure'
            if (json.status === 200){
                resetForm()
                router.refresh()
                type = 'success'
            }
            setStatus({type,message: json.message})
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={toFormikValidationSchema(formSchema)}>
            {SignUpFormContent}

        </Formik>
    )
}


function SignUpFormContent(props: FormikProps<FormSchema>) {

    const{
        status,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className="flex-col gap-4 flex py-60 items-center">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="fullname" value="Enter your fullname"/>
                    </div>
                    <TextInput autoComplete='fullname' value={values.profileFullName} onBlur={handleBlur}
                               onChange={handleChange} id="fullname" type="fullname" placeholder="FullName"
                               name="profilefullname"/>
                    <DisplayError errors={errors} touched={touched} field={'profileFullName'}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Enter your email address"/>
                    </div>
                    <TextInput autoComplete='email' value={values.profileEmail} onBlur={handleBlur}
                               onChange={handleChange} id="email1" type="email" placeholder="name@example.com"
                               name="profileEmail"/>
                    <DisplayError errors={errors} touched={touched} field={'profileEmail'}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Enter your password"/>
                    </div>
                    <TextInput autoComplete='current-password' value={values.profilePassword} onBlur={handleBlur}
                               onChange={handleChange} name='profilePassword' placeholder="Enter Password"
                               id="password1" type="password"/>
                    <DisplayError errors={errors} touched={touched} field={'profilePassword'}/>
                </div>
                <div className="flex">
                    <Button className='mx-5' color={'success'} type="submit">Submit</Button>
                    <Button className='mx-5' color={'failure'} type={'reset'} onClick={handleReset}>Reset</Button>
                </div>
                <DisplayStatus status={status}/>
            </form>
            <FormDebugger {...props} />
        </>

    )
}






