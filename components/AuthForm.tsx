"use client";
import React from 'react'
import {z} from 'zod';
import { zodResolver} from '@hookform/resolvers/zod';
import {Controller, DefaultValues, FieldValues, Form, SubmitHandler, useForm, UseFormReturn} from 'react-hook-form';


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import Link from 'next/link';

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
        <form  onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 w-full'>\



          {object.keys(defaultValues).map((key) => (
            
          )
            }
          <FieldGroup>
            <Controller
              name={"title" as any}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={"description" as any}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {(field.value?.length || 0)}/100
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
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