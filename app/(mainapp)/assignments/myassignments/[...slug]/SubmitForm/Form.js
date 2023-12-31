"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { addAsignments } from "./validation";
import AppInput from "@/components/Inputs/AppInput";
import AppButton from "@/components/Buttons/AppButton";
import { useMutation } from "@tanstack/react-query";
import { myAxios, setValues, statusHandler } from "@/utils/utils";
import MyLabel from "@/components/Texts/MyLabel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/LoadingSpinner/PageLoader";
import Image from "next/image";

const Form = ({ editId }) => {
    const { replace } = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm({ resolver: yupResolver(addAsignments(editId)) });

    //edit
    const { isLoading: isLoadingEditAssignment, mutate: mutateEditAssignment, data: editData } = useMutation(async () => {
        const { data } = await myAxios.get(`/assignment/${editId}`)
        return data
    }, {
        ...statusHandler(), onSuccess(data) {
            setValues(setValue, data)
        }
    })

    //create
    const { mutate: mutateAssignmetUpload, isLoading: isLoadingAssignmetUpload } = useMutation(async (value) => {
        const { data } = await myAxios.post(`/assignment/create`, value, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    }, {
        ...statusHandler(), onSuccess() {
            replace("/assignments/myassignments")
        }
    })

    //update
    const { mutate: mutateAssignmetUpdate, isLoading: isLoadingAssignmetUpdate } = useMutation(async (value) => {
        const { data } = await myAxios.put(`/assignment/update/${editId}`, value, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    }, {
        ...statusHandler(), onSuccess() {
            replace("/assignments/myassignments")
        }
    })

    //functions
    const onSubmit = (value) => {
        const { gitUrl, netlifyUrl, thumbnail, title } = value
        const formData = new FormData()
        formData.append("gitUrl", gitUrl)
        formData.append("netlifyUrl", netlifyUrl)
        formData.append("thumbnail", thumbnail[0])
        formData.append("title", title)

        //create
        if (!editId) {
            mutateAssignmetUpload(formData)
        } else {
            //update
            mutateAssignmetUpdate(formData)
        }

    };

    const inputs = useMemo(
        () => [
            {
                id: 1,
                name: "gitUrl",
                placeholder: "Github Url*",
                label: "Github Url",
                required: true,
            },
            {
                id: 2,
                name: "netlifyUrl",
                placeholder: "Netlify Url*",
                label: "Netlify Url",
                required: true,
            },
            {
                id: 3,
                name: "title",
                placeholder: "Project Title*",
                label: "Project Title",
                required: true,
            },
        ],
        []
    );


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValue('thumbnail', file);
    };

    //edit 
    useEffect(() => {
        if (editId) {
            mutateEditAssignment()
        }
    }, [editId, mutateEditAssignment])


    if (isLoadingEditAssignment && editId) return <PageLoader />

    return <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-[50%] mx-auto p-4  bg-white shadow rounded-md">
        <h6 className="text-center font-semibold text-main-xl border-b-2 pb-2 border-main-app-secondary inline-block mx-auto">Add New Assignment</h6>
        <div className="flex items-center justify-between lg:py-6 flex-wrap">
            {inputs.map((input) =>
                <div key={input.id} className="w-full lg:w-[48%] my-2"> <AppInput {...input} register={register} errors={errors} /></div>
            )}
            <div className="flex flex-col w-full lg:w-[48%] my-2 text-sm">
                <MyLabel name={"thumbnail"} label={"Thumbnail"} required={true} />
                <input type="file" onChange={handleFileChange} accept="image/*" className="mt-2" {...register("thumbnail")} />
                {errors?.["thumbnail"] && (
                    <span className="text-xs text-red-600  mt-2">{errors["thumbnail"].message}</span>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <AppButton isLoading={isLoadingAssignmetUpload || isLoadingAssignmetUpdate}>{editId ? "UPDATE" : "ADD"} ASSIGNMENT</AppButton>
                <Link href={"/assignments/myassignments"}><AppButton color="bg-main-app-primary">CANCEL</AppButton></Link>
            </div>
            {editData && <div className="w-14 h-14 border rounded-md relative flex-2">
                <Image src={editData?.thumbnail} layout="fill" objectFit="cover" alt="thumbnail" />
            </div>}
        </div>
    </form>;
};

export default Form;
