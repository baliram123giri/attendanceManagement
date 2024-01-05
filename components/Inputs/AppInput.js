"use client";
import React from "react";
import MyLabel from "../Texts/MyLabel";

const AppInput = ({
  label,
  name,
  errors,
  placeholder,
  required,
  register,
  type,
  disabled,
  onSelect = false,
  options = [],
  onCheck = false,
  onChange = false,
  endIcon = false,
  edit = true,
  watch,
  customvalue
}) => {
  switch (type) {
    //select
    case "select":
      return (
        <div className="flex flex-col gap-1 text-sm ">
          {label && <MyLabel name={name} label={label} required={required} />}
          {edit ? <select
            disabled={disabled}
            className={`border rounded-sm text-xs p-2 px-1 w-full text-gray-600 focus:outline-none`}
            {...register(name, { onChange: (e) => onSelect && onSelect(e) })}
          >
            <option value="">{`Select ${placeholder || ""}`}</option>
            {Array.isArray(options) &&
              options.map((ele, i) => {
                return (
                  <option key={i} value={ele.value}>
                    {ele.name}
                  </option>
                );
              })}
          </select> : <span>{(watch && watch(name)) || "Na"}</span>}
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-1 ">
          <input
            disabled={disabled}
            type="checkbox"
            {...register(name, { onChange: (e) => onCheck && onCheck(e) })}
            id={name}
          />
          <label
            className="text-b-sm font-semibold hover:text-blue-700"
            htmlFor={name}
          >
            {label}
          </label>
          {errors?.[name] && (
            <span className="text-xs text-red-600">{errors[name].message}</span>
          )}
        </div>
      );
    //defualt
    default:
      return (
        <div className="flex flex-col gap-1 w-full text-sm">
          {label && <MyLabel name={name} label={label} required={required} />}
          {edit ? <div className="flex items-center gap-1  rounded-sm  border">
            <input
              disabled={disabled}
              className='bg-white/5 text-xs focus:outline-none px-2 p-2 w-full'
              type={type}
              placeholder={placeholder}
              {...register(name, { onChange: (e) => onChange && onChange(e) })}
            />
            {endIcon}
          </div> : <span>{(customvalue || (watch && watch(name))) || "Na"}</span>
          }
          {errors?.[name] && (
            <span className="text-xs text-red-400">{errors[name].message}</span>
          )}
        </div>
      );
  }
};

export default AppInput;
