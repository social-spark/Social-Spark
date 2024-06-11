"use client"

import {Button, Label, TextInput} from "flowbite-react";
import React from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {FormDebugger} from "@/app/components/navigation/FormDebugger";


const formSchema = z.object({
    profileEmail: z.string({required_error:"email is required to sign-in", invalid_type_error:"email must be text"}).email({ message: 'please provide a valid email' })
        .max(256, { message: 'please provide a valid email (max 256 characters)' }),

    profilePassword: z.string({required_error:"password is required to sign-in", invalid_type_error:"password must be text"})
        .min(8, { message: 'please provide a valid password (min 8 characters)' })
        .max(32, { message: 'please provide a valid password (max 32 characters)' })

})

type FormSchema = z.infer<typeof formSchema>



//form will give us string content
export function SignInForm(){

    const router = useRouter()

    const initialValues = {
        profileEmail:'',
        profilePassword: ''
    }


    const handleSubmit = async (values: FormSchema, actions: FormikHelpers<FormSchema> ) => {
        const {profileEmail, profilePassword} = values
        const {setStatus, resetForm} = actions

        //call the sign-in API
        fetch('/api/sign-in', {
            method: 'POST',
            body: JSON.stringify({profileEmail, profilePassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok){
                return response.json()
            }
            throw new Error('Network response was not ok.')
        }).then(json => {
            let type = 'alert-danger'
            if (json.status === 200){
                resetForm()
                router.refresh()
                type = 'alert-success'
            }
            setStatus({type,message: json.message})
        })
    }

    return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={toFormikValidationSchema(formSchema)}>
        {SignInFormContent}

    </Formik>
    )
}


function SignInFormContent(props: FormikProps<FormSchema>) {

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
                        <Label htmlFor="email1" value="Your email"/>
                    </div>
                    <TextInput autoComplete='email' value={values.profileEmail} onBlur={handleBlur}
                               onChange={handleChange} id="email1" type="email" placeholder="name@example.com"
                               name="profileEmail"/>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password"/>
                    </div>
                    <TextInput autoComplete='current-password' value={values.profilePassword} onBlur={handleBlur}
                               onChange={handleChange} id="password1" type="password" required/>
                </div>
                <div className="flex">
                <Button className='mx-5' color={'success'} type="submit">Submit</Button>
                <Button className='mx-5' color={'failure'} type={'reset'} onClick={handleReset}>Reset</Button>
                </div>
            </form>
            <FormDebugger{...props}/>
        </>

    )
}






