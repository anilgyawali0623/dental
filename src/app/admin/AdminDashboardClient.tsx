"use client";

import Navbar from "@/components/Navbar";
import { useAppointments } from "@/hooks/use-appointments";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
import DoctorsManagement from "../../components/admin/DoctorsManagement";
import AdminStats from "../../components/admin/AdminStats";

function AdminDashboardClient() {
    const { user } = useUser();
    // get doctors , get appoints
    const { data: doctors = [], isLoading: doctorLoading } = useGetDoctors();
    const { data: appointments = [], isLoading: appointmentLoading } = useAppointments();


    const stats = {
        totalDoctors: doctors.length,
        totalAppointments: appointments.length,
        activeDoctors: doctors.filter((doctor) => doctor.isActive).length,
        completedAppointments: appointments.filter((app) => app.status === "COMPLETED").length,
    }

    if (doctorLoading || appointmentLoading) return <div>Loading...</div>



    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
                {/* ADMIN WELCOME SECTION */}
                <div className="mb-12 flex items-center justify-between bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-primary">Admin Dashboard</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                Welcome back, {user?.firstName || "Admin"}!
                            </h1>
                            <p className="text-muted-foreground">
                                Manage doctors, oversee appointments, and monitor your dental practice performance.
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="w-32 h-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                            <SettingsIcon className="w-16 h-16 text-primary" />
                        </div>
                    </div>
                </div>

                <AdminStats
                    totalDoctors={stats.totalDoctors}
                    activeDoctors={stats.activeDoctors}
                    totalAppointments={stats.totalAppointments}
                    completedAppointments={stats.completedAppointments}
                />

                <DoctorsManagement />
            </div>
        </div>
    )
}

export default AdminDashboardClient
