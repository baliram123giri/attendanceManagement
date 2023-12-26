"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePasswordValidation } from "./validation";
import { useMutation } from "@tanstack/react-query";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import AppInput from "@/components/Inputs/AppInput";
import { myAxios, statusHandler } from "@/utils/utils";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

const PasswordChange = ({ isRest = false, onSubmitCallback, Loading }) => {
    const [showpass, setShowpass] = useState({
        oldPassword: false,
        password: false,
        confirmPassword: false,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updatePasswordValidation(isRest)),
        mode: "onChange",
    });

    //update address
    const { mutate, isLoading } = useMutation(
        async (values) => {
            const { data } = await myAxios.put(`/users/change/password`, values);
            return data;
        },
        {
            ...statusHandler(),
            onSuccess: async function ({ message }) {
                toast(message, { type: "success" });
                await signOut().then(() => {
                    localStorage.clear()
                    location.href = "/"
                })
            },
        }
    );

    const onSubmit = async (value) => {
        try {
            delete value["confirmPassword"];
            if (!isRest) {
                mutate(value);
            } else {
                onSubmitCallback && onSubmitCallback(value)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const ShowHideComp = useCallback(
        function (name) {
            return {
                type: showpass[name] ? "text" : "password",
                endIcon: (
                    <div
                        className="cursor-pointer px-2"
                        onClick={() =>
                            setShowpass({ ...showpass, [name]: !showpass[name] })
                        }
                    >
                        {showpass[name] ? <LuEye /> : <LuEyeOff />}
                    </div>
                ),
            };
        },
        [showpass]
    );

    const inputs = useMemo(
        () => [
            ...(isRest ? [] : [{
                id: 1,
                name: "oldPassword",
                placeholder: "Enter Old Password*",
                // label: "Name",
                required: true,
                ...ShowHideComp("oldPassword"),
            },]),
            {
                id: 2,
                name: "password",
                placeholder: "Enter New Password*",
                // label: "Mobile",
                required: true,
                ...ShowHideComp("password"),
            },
            {
                id: 3,
                name: "confirmPassword",
                placeholder: "Confirm Password*",
                // label: "Email",
                required: true,
                ...ShowHideComp("confirmPassword"),
            },
        ],
        [ShowHideComp, isRest]
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full  ${!isRest ? "lg:w-[48%] border shadow-sm  mt-2 p-4  rounded-md" : ""}   `}
        >
            {!isRest && <h6 className="text-xl font-semibold">Change Password</h6>}
            <div className="flex items-center justify-between lg:py-4 flex-wrap">
                {inputs.map((input) => (
                    <div key={input.id} className={`w-full  mt-3`}>
                        {" "}
                        <AppInput {...input} register={register} errors={errors} />
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between  my-1 lg:m-0  ">
                <button
                    disabled={(isLoading || Loading)}
                    className="bg-main-app-secondary px-5 text-white rounded-full hover:bg-main-app-secondary/80  text-xs p-2"
                >
                    {(isLoading || Loading) ? <LoadingSpinner /> : isRest ? "Change Password" : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default PasswordChange;
