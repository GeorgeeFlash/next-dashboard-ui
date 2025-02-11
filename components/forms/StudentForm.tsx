"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { studentSchema, StudentSchema } from "../../lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createStudent, updateStudent } from "../../lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const StudentForm = ({
  setOpen,
  type,
  data,
  relatedData,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentSchema>({ resolver: zodResolver(studentSchema) });

  const [img, setImg] = useState<any>();

  // After React 19 It'll be UseActionState
  const [state, formAction] = useFormState(
    type === "create" ? createStudent : updateStudent,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction({ ...data, img: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created." : "updated."}`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { grades, classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      {type === "create" ? (
        <h1 className="text-xl font-semibold">Create a new Student</h1>
      ) : (
        <h1 className="text-xl font-semibold">Update {data.username}</h1>
      )}
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      {/* TODO: Make sure to show image when updating */}
      <CldUploadWidget
        uploadPreset="school-management"
        onSuccess={(result) => {
          setImg(result?.info);
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              {!img ? (
                <div
                  onClick={() => open()}
                  className="text-xs text-gray-500 flex items-center justify-center gap-2 cursor-pointer mt-8"
                >
                  <Image src={"/upload.png"} alt="" width={28} height={28} />
                  <span className="">Upload a photo</span>
                </div>
              ) : (
                <Image
                  src={img.secure_url}
                  alt=""
                  width={70}
                  height={70}
                  className="rounded-lg bg-cover"
                />
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          type="date"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          error={errors.birthday}
        />
        <InputField
          label="Parent Id"
          name="parentId"
          type="text"
          defaultValue={data?.parentId}
          register={register}
          error={errors.parentId}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500" htmlFor="">
            Sex
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors?.sex?.message && (
            <p className="text-xs text-red-400">
              {errors?.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500" htmlFor="">
            Grade
          </label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: string }) => (
              <option key={grade.id} value={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors?.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors?.gradeId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500" htmlFor="">
            Class
          </label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map(
              (classItem: {
                id: number;
                name: string;
                capacity: number;
                _count: { students: number };
              }) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name} -{" "}
                  {classItem._count.students + "/" + classItem.capacity}{" "}
                  Capacity
                </option>
              )
            )}
          </select>
          {errors?.classId?.message && (
            <p className="text-xs text-red-400">
              {errors?.classId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
