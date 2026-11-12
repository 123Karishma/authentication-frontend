

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/validations/authSchema";
import Link from "next/link";
import axios from "axios";
import { handleCreateUser } from "@/lib/api/api";
// import axios from "axios";

interface SignupValues {
  name: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const initialValues: SignupValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSignup = async (
    values: SignupValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await handleCreateUser(values);
      router.push("/dashboard");
    } catch (error: unknown) {
     
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Sign up to get started
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block font-medium">
                  Email Address
                </label>

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block font-medium">
                  Password
                </label>

                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Server Error */}
              {serverError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {serverError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}