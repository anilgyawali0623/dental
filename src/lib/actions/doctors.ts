"use client";
import { prisma } from "@/lib/prisma";
import { generateAvatar } from "@/lib/utils";
import { revalidatePath } from "next/cache";
export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: {
          select: {
            appointments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return doctors.map((doctor) => ({
      ...doctor,
      appointmentsCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.log("error fetching doctors", error);
    throw new Error("Error fetching doctors");
  }
}

interface CreateDoctorInput {
  name: string;
  specialty: string;
  gender: "MALE" | "FEMALE";
  email: string;
  phone: string;
  isActive: boolean;
}
export async function createDoctor(input: CreateDoctorInput) {
  try {
    if (!input.name || !input.email) {
      throw new Error("Name and email are required");
    }

    await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });
    revalidatePath("/admin");
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Doctor with this email already exists");
    }

    throw new Error("Error creating doctor");
  }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

export async function updateDoctor(input: UpdateDoctorInput) {
  try {
    if (!input.name || !input.email) {
      throw new Error("name and email is required");
    }

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true },
    });

    if (!currentDoctor) throw new Error("doctor not found");

    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });
      if (existingDoctor) {
        throw new Error("a doctor with this email already exists");
      }
    }

    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        specialty: input.specialty,
        gender: input.gender,
        isActive: input.isActive,
      },
    });

    return doctor;
  } catch (error) {
    throw new Error(" some error in this");
  }
}

export async function getAvailableDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    throw new Error("Failed to fetch available doctors");
  }
}
