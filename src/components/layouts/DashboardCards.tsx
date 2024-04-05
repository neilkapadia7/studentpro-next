import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import DashboardInputModal from "./DashboardInputModal";

const DashboardCards = (
        {batches, students, users, addBatch}
        : {batches: Array<object>, students: Array<object>, users: Array<object>, addBatch: Function}
    ) => {

    const addUser = async () => {
        console.log("TRIGGERED");
    }

  return (
    <>
        <div className="flex my-5">
            <Card className="flex-1 mx-2">
                <CardHeader>
                    <CardTitle className="text-xl">Users</CardTitle>
                    <CardDescription>Total User in Institute</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>20 Users</p>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <DashboardInputModal buttonTitle="Add User" title="Add User" subtitle="Add User to your institute with the selected role" label="Name" triggerApi={addUser} placeholder="John Doe"/>
                    </div>
                    <p className="text-right w-full text-sm underline cursor-pointer">View All Students</p>
                </CardFooter>
            </Card>

            <Card className="flex-1 mx-2">
                <CardHeader>
                    <CardTitle className="text-xl">Batches</CardTitle>
                    <CardDescription>Total Batches in Institute</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{batches.length} Batches</p>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <DashboardInputModal buttonTitle="Add Batch" title="Add Batch" subtitle="Add a new Batch to your institute" label="Batch Name" triggerApi={addBatch} placeholder="STD-10 2020-21"/>
                    </div>
                    <p className="text-right w-full text-sm underline cursor-pointer">View All Batches</p>
                </CardFooter>
            </Card>
            
            <Card className="flex-1 mx-2">
                <CardHeader>
                    <CardTitle className="text-xl">Students</CardTitle>
                    <CardDescription>Total Students in Institute</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>200 Students</p>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <DashboardInputModal buttonTitle="Add Student" title="Add Student" subtitle="Add a new Student to a batch" label="Student Name" triggerApi={addUser} placeholder="John Doe"/>
                    </div>
                    <p className="text-right w-full text-sm underline cursor-pointer">View All Students</p>
                </CardFooter>
            </Card>
        </div>

        <div className="flex mt-16">
            <Card className="flex-1 mx-2 py-12 px-12">
                <CardHeader>
                    <CardTitle className="text-lg">Total % Amount Recieved</CardTitle>
                    <CardDescription>Getting the percentage of the amount received</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={49}/>
                </CardContent>
                <CardFooter>
                    <p className="w-full">49%</p>
                    <p className="text-right w-full text-sm underline cursor-pointer">View All Payment</p>
                </CardFooter>
            </Card>

            <Card className="flex-1 mx-2 py-12 px-12">
                <CardHeader>
                    <CardTitle className="text-lg">Total % Syllabus Completed</CardTitle>
                    <CardDescription>Percentage of Syllabus Completed</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={23}/>
                </CardContent>
                <CardFooter>
                    <p className="w-full">49%</p>
                    <p className="text-right w-full text-sm underline cursor-pointer">View Syllabus</p>
                </CardFooter>
            </Card>

        </div>
    </>
  )
}

export default DashboardCards