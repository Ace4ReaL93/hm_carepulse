"use client"

import { ColumnDef } from "@tanstack/react-table"

import { StatusBadge } from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"


export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({row}) => <p className="text-14-medium">{row.index + 1} </p>
  },
  {
    accessorKey: 'patient',
    header:'Patients',
    cell: ({row}) => <p className="text-14-medium">
        {row.original.patient.name}</p>
  },

  {
    accessorKey: "status",
    header: "Statuts",
    cell: ({row}) => (
        <div>
            <StatusBadge status={row.original.status}/>
        </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Rendez-vous",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Docteurs",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: {original:data}}) => {
        return (
            <div className="flex gap-1">
              <AppointmentModal
                patientId={data.patient.$id}
                userId={data.userId}
                appointment={data}
                type="schedule"
              />
              <AppointmentModal
                patientId={data.patient.$id}
                userId={data.userId}
                appointment={data}
                type="cancel"
              />
            </div>
          );
    },
  },

]
