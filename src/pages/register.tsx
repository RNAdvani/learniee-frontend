import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/services/user';

// Define the Zod schema for validation
const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be less than 20 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
});

type FormData = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: '',
        password: '',
        name: '',
        username:"",
    },
  })
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await registerUser(data.name, data.email, data.username, data.password);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto h-screen flex justify-center items-center">
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter Name" className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
          />
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter username" className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
          />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter email" type='email' className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
          />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter password" type='password' className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
          />
            <Button className='mt-5 w-full' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
       </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
