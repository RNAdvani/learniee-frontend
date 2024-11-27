import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser } from '@/services/user';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '@/components/banner';

// Define the Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
});

type FormData = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {setUser} = useAuth()

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await loginUser(data.email, data.password);
      setUser(res?.data.user);
      navigate('/chat');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col justify-center items-center">
        <Banner />
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    type="email"
                    className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-5 w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
      <div className='flex gap-1'>
        <h1>Don't have an account?</h1>
        <Link to={"/register"} className='underline' onClick={()=>navigate('/register')}>Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
