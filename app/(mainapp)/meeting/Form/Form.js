"use client";
import React from "react";
import { HiCursorArrowRipple } from "react-icons/hi2";
import { SiGooglemeet } from "react-icons/si";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMeetingSchem } from "./validation";
import { useMutation } from "@tanstack/react-query";
import { baseURL, myAxios } from "@/utils/utils";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import io from "socket.io-client";

const Form = ({ data }) => {
    const socket = io(baseURL);
    const { mutate, isLoading } = useMutation(
        async (values) => {
            const { data } = await myAxios.post(`/meeting/create`, values);
            return data;
        },
        {
            onSuccess({ message }) {
                toast(message, { type: "success" });
            },
            onError({
                response: {
                    data: { message },
                },
            }) {
                toast(message, { type: "error" });
            },
            onSettled() {
                socket.emit("meeting", null);
            },
        }
    );

    const { register, watch, handleSubmit } = useForm({
        resolver: yupResolver(createMeetingSchem),
        mode: "onChange",
    });

    const onSubmit = (value) => {
        mutate(value);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" shadow-sm my-2 bg-white flex items-center w-full lg:w-1/2"
        >
            <div className="bg-main-app-error w-14 h-10 text-white flex justify-center items-center">
                <SiGooglemeet size={18} />
            </div>
            <div className="w-full px-3 h-full flex">
                <input
                    {...register("link")}
                    type="text"
                    placeholder="Paste Google meet link*"
                    className="text-sm w-full py-2 focus:outline-none"
                />
                <select {...register("course")} className="text-sm focus:outline-none">
                    <option value="">{"Select Course"}</option>
                    {data &&
                        data.map(({ _id, name }) => (
                            <option key={_id} value={_id}>
                                {name}
                            </option>
                        ))}
                </select>
            </div>
            <div
                className="flex items-center gap-2 ms-auto text-sm text-main-app-primary font-semibold"
            >
                <button
                    disabled={isLoading}
                    className={`border not px-5 p-1 ms-auto flex items-center gap-1 ${watch().link && watch().course
                            ? "bg-main-app-secondary text-white "
                            : "text-gray-600 opacity-40 cursor-not-allowed"
                        } me-2 shadow-md rounded `}
                >
                    <HiCursorArrowRipple /> {isLoading ? <LoadingSpinner /> : `Create`}
                </button>
            </div>
        </form>
    );
};

export default Form;
