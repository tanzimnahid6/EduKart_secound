"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/app/actions/stripe";
const EnrollCourse = ({ asLink, course }) => {
  

  const formAction = async (data) => {
    // call your backend API to enroll the user in the course
    const { url } = await createCheckoutSession(data);
    window.location.href = url; // redirect to the checkout page or wherever you want to redirect after successful payment
  };
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={course?.id} />
        <input type="hidden" name="courseName" value={course?.title} />
        <input type="hidden" name="coursePrice" value={course?.price} />
        {asLink ? (
          <Button
            variant="ghost"
            type="submit"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
