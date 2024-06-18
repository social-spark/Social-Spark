
'use client'

import {Session} from "@/utils/fetchSession";
import {useRouter} from "next/navigation";
import {Post, PostSchema} from "@/utils/models/post.model";
import {z} from "zod";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {DisplayError} from "@/app/components/DisplayError";
import {DisplayStatus} from "@/app/components/DisplayStatus";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {FormDebugger} from "@/app/components/FormDebugger";
import {Prompt} from "@/utils/models/prompt.model";
import React from "react";
import uploadImage from "@/app/images/UploadImage.jpg"
import {DisplayUploadErrorProps, ImageUploadDropZone} from "@/app/components/ImageUploadDropZone";

type Props = {
    session: Session
    prompt: Prompt
}
const FormSchema = PostSchema.omit({postImage: true, postPromptId: true, postId: true, postDate: true, postProfileId: true}).extend({postImage:z.any().optional()})


type FormValues = z.infer<typeof FormSchema>

export function PostForm(props: Props ) {
    const session = props.session
    const prompt = props.prompt
    const router = useRouter()

    const initialValues = {
        postBody: ''
    }

    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        console.log('handle submit is firing')
        const post = {
            postProfileId: session.profile.profileId,
            postId: null,
            postPromptId: prompt.promptId,
            postBody: values.postBody,
            postDate: null,
           postImage: values.postImage
        }

            if(values.postImage) {
                uploadImage(values.postImage)
            }
            else {
                post.postBody = values.postBody
                postPost(post)
            }

        const {setStatus, resetForm} = actions

        function postPost (post: Post) {

        fetch(`/apis/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${session.authorization}`
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(json => {
            let type = 'failure'
            if (json.status === 200) {
                type ='success'
                resetForm()
                router.refresh()
            }
            setStatus({type: type, message: json.message})
        })
    }

        function uploadImage(postImage: any) {
            fetch("/apis/image",{
                method: "POST",
                headers: {
                    'Authorization': session.authorization ?? ""
                },
                body: postImage
            })
                .then(response => response.json())
                .then(json => {
                    if(json.status !== 200) {
                        setStatus({type: 'failure', message: json.message})
                    }
                    else {
                        post.postImage = json.message
                        post.postBody = values.postBody
                        postPost(post)
                    }
                })
        }
    }

    return(
        <>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={toFormikValidationSchema(FormSchema)}>
                {PostFormContent}
            </Formik>
        </>
    )
}

export function PostFormContent(props: FormikProps<FormValues>) {
    const {handleSubmit, handleChange, handleBlur, status, resetForm, errors, touched, setFieldTouched, setFieldValue, setFieldError, values} = props
    const [selectedImage, setSelectedImage] = React.useState<string|null>(null)

    return(
        <>
            <form onSubmit={handleSubmit} className="flex justify-center">
                <div
                    className="max-w-screen-lg rounded mx-auto">
                    <div className="pr-4 pl-6 py-4">
                        <ImageUploadDropZone
                            formikProps={{
                                setFieldError,
                                setFieldTouched,
                                handleBlur,
                                handleChange,
                                setFieldValue,
                                fieldValue: 'postImage'
                            }}
                            setSelectedImage={setSelectedImage}
                            selectedImage={selectedImage}
                        />
                        <DisplayUploadErrorProps errors={errors} field={'postImage'}/>
                        <div className="px-6 py-4 overflow-hidden border-2 dark:bg-gray-800">
                            <label htmlFor="postBody" className="sr-only">Your Post</label>
                            <textarea
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postBody}
                                name={"postBody"}
                                id="postBody"
                                rows={4}
                                className="w-full text-md text-gray-900 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400">
				            </textarea>
                            <DisplayError errors={errors} touched={touched} field={"postBody"}/>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t dark:border-gray-600">
                            <button type="submit"
                                    className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ml-auto">
                                Post Comment
                            </button>
                        </div>
                    </div>
                    </div>
            </form>
            <DisplayStatus status={status}/>
            {/*<FormDebugger {...props} />*/}
        </>
    )

}