"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { addAsignments } from "./validation";
import AppInput from "@/components/Inputs/AppInput";
import AppButton from "@/components/Buttons/AppButton";

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm({ resolver: yupResolver(addAsignments) });

    //functions
    const onSubmit = (value) => {
        console.log(value);
    };

    const inputs = useMemo(
        () => [
            {
                id: 1,
                name: "gitUrl",
                placeholder: "Github Url*",
                // label: "Github Url",
                required: true,
            },
            {
                id: 2,
                name: "netlifyUrl",
                placeholder: "Netlify Url*",
                // label: "Netlify Url",
                required: true,
            },
            {
                id: 3,
                name: "title",
                placeholder: "Project Title*",
                // label: "Netlify Url",
                required: true,
            },
        ],
        []
    );
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 ">
            {inputs.map((input) =>
                <div key={input.id} className="w-full lg:w-[20%]"> <AppInput {...input} register={register} errors={errors} /></div>
            )}
            <AppButton>ADD ASSIGNMENT</AppButton>
        </div>
    </form>;
};

export default Form;
