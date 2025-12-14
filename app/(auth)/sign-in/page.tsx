"use client";
import { signInSchema } from '@/lib/validation'
import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <AuthForm type="SIGN_IN"  schema={signInSchema} defaultValues={{email: "", password: ""}} onSubmit={() => {}}/>
  )
}

export default page