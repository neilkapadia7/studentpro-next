
import { ColumnDef } from "@tanstack/react-table"
import Moment from "moment";
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  name: string
  email: string
  institute: string
  isFreeUser: boolean
  accessType: string
  isAdminUser: string
  expiryDate: Date
}
 
export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("name") ? "-" : row.getValue("name")}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("email") ? "-" : row.getValue("email")}</div>
    },
  },
  {
    accessorKey: "institute",
    header: "Institute",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("institute") ? "-" : row.getValue("institute")}</div>
    },
  },
  {
    accessorKey: "isFreeUser",
    header: "Free User",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("isFreeUser") ? "No" : "Yes"}</div>
    },
  },
  {
    accessorKey: "accessType",
    header: "User Type",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("accessType") ? "-" : row.getValue("accessType")}</div>
    },
  },
  {
    accessorKey: "isAdminUser",
    header: "Admin User",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("isAdminUser") ? "No" : "Yes"}</div>
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      return <div className="font-medium">{!row.getValue("expiryDate") ? "-" : `${Moment(row.getValue("expiryDate"))}`}</div>
    },
  },
]