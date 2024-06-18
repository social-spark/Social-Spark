'use client'
import { Profile, ProfileSchema} from "@/utils/models/profile.model";
import {Button, Label, Modal, ModalBody, ModalHeader, TextInput} from "flowbite-react";
import React from "react";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {z} from "zod";
import {Session} from "@/utils/fetchSession";
import {DisplayUploadErrorProps, ImageUploadDropZone} from '@/app/components/ImageUploadDropZone';
import {useRouter} from "next/navigation";
import {DisplayError} from "@/app/components/DisplayError";
import {DisplayStatus} from "@/app/components/DisplayStatus";
import {FormDebugger} from "@/app/components/FormDebugger";

type Props = {
   session: Session
    profile: Profile
}




const FormSchema = ProfileSchema
    .pick({profileFullName: true, profileBio: true, profileUsername: true, profileEmail: true}) // only allow these fields to be updated
    .extend({profileImage: z.any().optional()})

type FormValues = z.infer<typeof FormSchema>

export function EditProfileForm(props: Props) {
    const {session, profile} = props
    const router = useRouter()
    console.log(session)

    const initialValues = {
        profileFullName: profile.profileFullName,
        profileBio: profile.profileBio,
        profileImage: profile.profileImage,
        profileUsername: profile.profileUsername,
        profileEmail: profile.profileEmail

    }

    if (session.authorization === undefined ) {
        return <></>
    }

    function handleSubmit(values: FormValues, actions: FormikHelpers<FormValues>) {
        const {setStatus, resetForm} = actions


        if(profile.profileUsername === values.profileUsername) {
            preformUpdate()
        } else {
            fetch(`/apis/profile/profileUsername/${values.profileUsername}`).then(response => response.json())
                .then((json) => {
                    if(json.data === null) {
                        preformUpdate()
                    }
                    else {
                        setStatus({type: 'failure', message: 'Profile Username already exists'})
                    }
                })
        }

        function preformUpdate() {
            if(typeof values.profileImage !== 'string' && values.profileImage !== null) {
                uploadImage(values.profileImage)
            }
            else {
                profile.profileFullName = values.profileFullName
                profile.profileBio = values.profileBio
                profile.profileUsername = values.profileUsername
                profile.profileImage = values.profileImage
                profile.profileEmail = values.profileEmail
                submitUpdatedProfile(profile)
            }

        }
        function submitUpdatedProfile(profile: Profile) {
            // This function should send a request to the backend to update the profile regardless if an image was uploaded or not
            fetch(`/apis/profile/${profile.profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': session.authorization ?? "",
                },
                body: JSON.stringify(profile)
            }).then(
                (response: Response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Network response was not ok.')
                }).then((json) => {
                let type = 'failure'
                if (json.status === 200) {
                    resetForm()
                    type = 'success'
                    if(profile.profileUsername !== values.profileUsername) {
                        setTimeout(() => {
                                router.push(`/profile/${values.profileUsername}`)
                            }
                        )
                    } else {
                        router.refresh()
                    }


                }
                setStatus({type, message: json.message})
            })
        }

        function uploadImage(profileImage: any) {
            fetch("/apis/image",{
                method: "POST",
                headers: {
                    'Authorization': session.authorization ?? ""
                },
                body: profileImage
            })
                .then(response => response.json())
                .then(json => {
                    if(json.status !== 200) {
                        setStatus({type: 'failure', message: json.message})
                    }
                    else {
                        profile.profileImage = json.message
                        profile.profileUsername = values.profileUsername
                        profile.profileBio = values.profileBio
                        console.log(profile)
                        submitUpdatedProfile(profile)
                    }
                })
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(FormSchema)}
        >
            {EditProfileFormContent}
        </Formik>
    )
}


export function EditProfileFormContent(props: FormikProps<FormValues>) {
    const {status, values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, setFieldError, setFieldTouched, initialValues} = props

    const [selectedImage, setSelectedImage] = React.useState<string|null>(initialValues.profileImage )

    return (
        <>

                    <div className="space-y-2">
                        <form onSubmit={handleSubmit} className="flex min-h-auto gap-4 min-w-full flex-col grow">
                            <h1 className="text-3xl font-bold">Edit Profile</h1>
                            <div>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="profileFullName" value="Full Name"/>
                                </div>
                                <TextInput
                                    autoComplete='FullName'
                                    name={'profileFullName'}
                                    id="profileFullName"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profileFullName}
                                />
                                <DisplayError errors={errors} touched={touched} field={'profileFullName'}/>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="profileUsername" value="Username"/>
                                </div>
                                <TextInput
                                    autoComplete='username'
                                    name={'profileUsername'}
                                    id="profileUsername"
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profileUsername}
                                />
                                <DisplayError errors={errors} touched={touched} field={'profileUsername'}/>
                            </div>


                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="profileBio" value={"Profile Bio"}/>
                                </div>
                                <TextInput
                                    id="profileBio"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profileBio ?? ""}
                                    name={'profileBio'}
                                />
                                <DisplayError errors={errors} touched={touched} field={'profileBio'}/>
                            </div>

                            <ImageUploadDropZone
                                formikProps={{
                                    setFieldError,
                                    setFieldTouched,
                                    handleBlur,
                                    handleChange,
                                    setFieldValue,
                                    fieldValue: 'profileImage'
                                }}
                                setSelectedImage={setSelectedImage}
                                selectedImage={selectedImage}/>
                            <DisplayUploadErrorProps errors={errors} field={'profileImage'}/>
                            <div className={"flex"}>
                                <Button className={"mr-1"} type="submit"> Submit</Button>
                                <Button className={'ml-1'} color={"red"} type="reset"> Reset</Button>
                            </div>
                        </form>
                        <DisplayStatus status={status}/>
                        <FormDebugger {...props} />
                    </div>

        </>
    )
}