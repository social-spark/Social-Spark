"use client"

import {Button, Label, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import React from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {FormDebugger} from "@/app/components/FormDebugger";
import {DisplayError} from "@/app/components/DisplayError";
import {DisplayStatus} from "@/app/components/DisplayStatus";
import Link from "next/link";



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

    profilePasswordConfirm: z.string({required_error:"password confirm is required to sign-in", invalid_type_error:"password confirm must be text"})
        .min(8, { message: 'please provide a valid password (min 8 characters)' })
        .max(32, { message: 'please provide a valid password (max 32 characters)' }),
})
    .refine(data => data.profilePassword === data.profilePasswordConfirm, {
        message: 'passwords do not match'
    })

type FormSchema = z.infer<typeof formSchema>

//form will give us string content
export default function form (){

    const router = useRouter()
    const initialValues = {
        profileEmail:'',
        profilePassword: '',
        profileFullName: '',
        profileUsername: '',
        profilePasswordConfirm: ''
    }


    const handleSubmit = async (values: FormSchema, actions: FormikHelpers<FormSchema> ) => {
        const {profileEmail, profilePassword, profilePasswordConfirm, profileFullName, profileUsername} = values
        const {setStatus, resetForm} = actions

        //call the sign-in API
        fetch('/apis/sign-up', {
            method: 'POST',
            body: JSON.stringify({profileEmail, profilePassword, profilePasswordConfirm, profileFullName, profileUsername}),
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
            <form onSubmit={handleSubmit} className="flex-col gap-4 flex py-30 items-center">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="FullName" value="Enter your fullname"/>
                    </div>
                    <TextInput autoComplete='fullname'
                               value={values.profileFullName}
                               onBlur={handleBlur}
                               onChange={handleChange}
                               id="FullName"
                               type="FullName"
                               placeholder="FullName"
                               name="profileFullName"/>
                    <DisplayError errors={errors} touched={touched} field={'profileFullName'}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Username" value="Enter your Username"/>
                    </div>
                    <TextInput autoComplete='username'
                               value={values.profileUsername}
                               onBlur={handleBlur}
                               onChange={handleChange}
                               id="Username"
                               type="Username"
                               placeholder="Username"
                               name="profileUsername"/>
                    <DisplayError errors={errors} touched={touched} field={'profileUserName'}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Enter your email address"/>
                    </div>
                    <TextInput autoComplete='email'
                               value={values.profileEmail}
                               onBlur={handleBlur}
                               onChange={handleChange}
                               id="email1"
                               type="email"
                               placeholder="name@example.com"
                               name="profileEmail"/>
                    <DisplayError errors={errors} touched={touched} field={'profileEmail'}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Enter your password"/>
                    </div>
                    <TextInput autoComplete='current-password'
                               value={values.profilePassword}
                               onBlur={handleBlur}
                               onChange={handleChange}
                               name='profilePassword'
                               placeholder="Enter Password"
                               id="password1"
                               type="password"/>
                    <DisplayError errors={errors} touched={touched} field={'profilePassword'}/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Re-enter your password"/>
                    </div>
                    <TextInput autoComplete='current-password'
                               value={values.profilePasswordConfirm}
                               onBlur={handleBlur}
                               onChange={handleChange}
                               name='profilePasswordConfirm'
                               placeholder="Re-enter Password"
                               id="password2"
                               type="password"/>
                    <DisplayError errors={errors} touched={touched} field={'profilePassword'}/>
                </div>
                <Link href={'/sign-in'}>Already have an account? Sign in here</Link>
                <div className="flex">
                    <Button className='mx-5' color={'success'} type="submit">Submit</Button>
                    <Button className='mx-5' color={'failure'} type={'reset'} onClick={handleReset}>Reset</Button>
                </div>
                <DisplayStatus status={status}/>
            </form>
            {/*<FormDebugger {...props} />*/}
        </>

    )
}






