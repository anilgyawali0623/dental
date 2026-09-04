import { formatPhoneNumber } from "@/lib/utils";
import { useState } from "react";
import { Gender } from "../../../generated/prisma";
import { useCreateDoctor } from "@/hooks/use-doctors";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddDoctorProps {
    isOpen: boolean;
    onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorProps) {
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: '',
        gender: 'MALE' as Gender,
        email: '',
        phone: '',
        isActive: true,
    });

    const createDoctorMutation = useCreateDoctor();

    const handlePhoneChange = (value: string) => {
        const formattedPhoneNumber = formatPhoneNumber(value)
        setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber })

    }

    const handleClose = () => {

        onClose();
        setNewDoctor({
            name: '',
            specialty: '',
            gender: 'MALE',
            email: '',
            phone: '',
            isActive: true,
        });
    }
    const handleSave = () => {
        createDoctorMutation.mutate({ ...newDoctor }, { onSuccess: handleClose })
    }


    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                    <DialogDescription>Add a new doctor to your practice.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-name">Name *</Label>
                            <Input
                                id="new-name"
                                value={newDoctor.name}
                                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                placeholder="Dr. John Smith"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-speciality">Speciality *</Label>
                            <Input
                                id="new-speciality"
                                value={newDoctor.specialty}
                                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                                placeholder="General Dentistry"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-email">Email *</Label>
                        <Input
                            id="new-email"
                            type="email"
                            value={newDoctor.email}
                            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                            placeholder="doctor@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-phone">Phone</Label>
                        <Input
                            id="new-phone"
                            value={newDoctor.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-gender">Gender</Label>
                            <Select
                                value={newDoctor.gender || ""}
                                onValueChange={(value) => setNewDoctor({ ...newDoctor, gender: value as Gender })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="new-status">Status</Label>
                            <Select
                                value={newDoctor.isActive ? "active" : "inactive"}
                                onValueChange={(value) =>
                                    setNewDoctor({ ...newDoctor, isActive: value === "active" })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/90"
                        disabled={
                            !newDoctor.name ||
                            !newDoctor.email ||
                            !newDoctor.specialty ||
                            createDoctorMutation.isPending
                        }
                    >
                        {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddDoctorDialog
