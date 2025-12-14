"use client";
import React from 'react'
import {z} from 'zod';
import { zodResolver} from '@hookform/resolvers/zod';
import {Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn} from 'react-hook-form';


import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import Link from 'next/link';
import FileUpload from './FileUpload';
import { FIELD_NAMES, FIELD_TYPES } from '@/app/constants';

 interface Props<T extends FieldValues>{
  schema:z.ZodType<T>;
  defaultValues: T;
  type: "SIGN_IN" | "SIGN_UP";
  onSubmit: (data:T) => Promise<{success: boolean; error?: string}>;
 }

const AuthForm = <T extends FieldValues>({type,schema,defaultValues,onSubmit}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async(data) => {

  }
  return (

    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold text-white'>
        {isSignIn ? "Welcome back to bookwise!" : "Create your account"}
      </h1>
      <p className='text-light-100'>
        {isSignIn ? 'Access the vast library of books and manage your account.' : 'Join us today and unlock a world of knowledge!'}
      </p>
    <Form {... form}>
        <form  onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 w-full'>



{Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload your ID"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type='submit' className='form-btn'> {isSignIn ? "Sign In" : "Sign UP"}</Button>
        </form>
    </Form>
    <p className='text-center text-base font-medium'>
      {isSignIn ? "Don't have an account? " : "Already have an account? "}

      <Link href = {isSignIn ? "/sign-up" : "/sign-in"} className='font-bold text-primary'>
      {isSignIn ? "Sign up" : "Sign in"}
      </Link>
    </p>
    </div>
  )
}

export default AuthForm;