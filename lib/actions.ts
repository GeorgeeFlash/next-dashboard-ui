"use server";

import { revalidatePath } from "next/cache";
import {clerkClient} from '@clerk/express';

import {
  ClassSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = { success: boolean; error: boolean };

// Subject
export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/subjects");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

// Class
export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    // revalidatePath("/list/class");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

// Teacher
export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {role: "teacher"},
    })
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId:string) => ({
            id: parseInt(subjectId)
          }))
        },
      },
    });

    // revalidatePath("/list/teachers");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {},
    });

    // revalidatePath("/list/teachers");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    // revalidatePath("/list/teachers");

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
