'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import InputTransparent from '@/app/components/UI/Inputs/InputTransparent';
import Button from '@/app/components/UI/Button/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [fetching, setFetching] = useState<boolean>(false);
    const router = useRouter();

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formType === 'login') {
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get('loginEmail');
            const password = formData.get('loginPassword');

            setFetching(true);
            const promise = signIn('credentials', {
                email,
                password,
                redirect: false
            }).then((res) => {
                setFetching(false);

                if (!res.ok) {
                    return Promise.reject('Неверный пароль или email!');
                } else {
                    router.push('/');
                    return Promise.resolve('Успешный вход!');
                }
            });

            await toast.promise(promise, {
                loading: 'Входим...',
                success: 'Вы успешно вошли!',
                error: (err) => `${err}`
            });
        } else {
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get('registerEmail');
            const password = formData.get('registerPassword');

            setFetching(true);
            const promise = axios
                .post('api/register', { email, password })
                .then((res) => {
                    if (res.status !== 200) {
                        toast.error('Please check your password and email!');
                    } else {
                        setFormType('login');
                    }
                    setFetching(false);
                })
                .catch((err) => {
                    setFetching(false);
                    return Promise.reject(err.response.data.error);
                });

            await toast.promise(promise, {
                loading: 'Регистрируем...',
                success: 'Вы успешно зарегистрированы!',
                error: (err) => `${err}`
            });
        }
    };

    const signWithGoogle = async () => {
        setFetching(true);
        await signIn('google', { callbackUrl: '/' }).then(() =>
            setFetching(false)
        );
    };

    return (
        <div
            className={
                'flex h-full w-full items-center justify-center bg-mainLighter'
            }
        >
            <AnimatePresence mode={'wait'}>
                {formType === 'login' && (
                    <motion.form
                        key={'loginForm'}
                        initial={{
                            opacity: 0,
                            rotateY: '90deg'
                        }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{
                            opacity: 0,
                            rotateY: '90deg'
                        }}
                        transition={{ duration: 0.4, type: 'spring' }}
                        onSubmit={(e) => submitForm(e)}
                        className={
                            'flex h-full w-full min-w-[30rem] flex-col items-center gap-8 rounded-lg bg-white px-16 py-8 shadow-lg md:h-fit md:w-fit md:justify-center'
                        }
                    >
                        <Image
                            src={'/logo.png'}
                            alt={'Logo'}
                            width={50}
                            height={50}
                            className={'object-contain'}
                        />
                        <h1 className={'-mt-4 text-3xl font-bold text-main'}>
                            Вход
                        </h1>

                        <InputTransparent
                            placeholder={'Почта'}
                            type={'email'}
                            name={'loginEmail'}
                            id="loginEmail"
                            disabled={fetching}
                            required={true}
                        />
                        <InputTransparent
                            required={true}
                            placeholder={'Пароль'}
                            type={'password'}
                            disabled={fetching}
                            id="loginPassword"
                            name={'loginPassword'}
                        />

                        <Button
                            variant={'colored'}
                            className={'w-full rounded-md font-bold'}
                            disabled={fetching}
                        >
                            Войти
                        </Button>

                        <div
                            className={
                                'relative flex w-full items-center justify-center'
                            }
                        >
                            <hr className={'w-full'} />
                            <p
                                className={
                                    'absolute bg-white p-2 text-zinc-500'
                                }
                            >
                                или
                            </p>
                        </div>

                        <Button
                            disabled={fetching}
                            variant={'bordered'}
                            type={'button'}
                            onClick={signWithGoogle}
                            className={'relative rounded-full !p-2'}
                        >
                            <Image
                                src={'/google.webp'}
                                alt={'google logo'}
                                width={30}
                                height={30}
                            />
                        </Button>

                        <p className={'-mt-4 flex gap-1 text-zinc-500'}>
                            Нет аккаунта?
                            <span
                                className={`cursor-pointer underline transition-all hover:text-main ${fetching && 'cursor-not-allowed'}`}
                                onClick={
                                    fetching
                                        ? undefined
                                        : () => setFormType('register')
                                }
                            >
                                Создать
                            </span>
                        </p>
                    </motion.form>
                )}

                {formType === 'register' && (
                    <motion.form
                        key={'registerForm'}
                        initial={{
                            opacity: 0,
                            rotateY: '-90deg'
                        }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{
                            opacity: 0,
                            rotateY: '-90deg'
                        }}
                        transition={{ duration: 0.4, type: 'spring' }}
                        onSubmit={(e) => submitForm(e)}
                        className={
                            'flex h-full w-full min-w-[30rem] flex-col items-center gap-8 rounded-lg bg-white px-16 py-8 shadow-lg md:h-fit md:w-fit md:justify-center'
                        }
                    >
                        <Image
                            src={'/logo.png'}
                            alt={'Logo'}
                            width={50}
                            height={50}
                            className={'object-contain'}
                        />
                        <h1 className={'-mt-4 text-3xl font-bold text-main'}>
                            Регистрация
                        </h1>

                        <InputTransparent
                            placeholder={'Почта'}
                            type={'email'}
                            name={'registerEmail'}
                            id="registerEmail"
                            disabled={fetching}
                            required={true}
                        />
                        <InputTransparent
                            required={true}
                            placeholder={'Пароль'}
                            type={'password'}
                            disabled={fetching}
                            name={'registerPassword'}
                            id="registerPassword"
                        />

                        <Button
                            variant={'colored'}
                            className={'w-full rounded-md font-bold'}
                            disabled={fetching}
                        >
                            Зарегистрироваться
                        </Button>

                        <div
                            className={
                                'relative flex w-full items-center justify-center'
                            }
                        >
                            <hr className={'w-full'} />
                            <p
                                className={
                                    'absolute bg-white p-2 text-zinc-500'
                                }
                            >
                                или
                            </p>
                        </div>

                        <Button
                            disabled={fetching}
                            variant={'bordered'}
                            type={'button'}
                            onClick={signWithGoogle}
                            className={
                                'relative rounded-full !p-2 delay-500 hover:delay-0'
                            }
                        >
                            <Image
                                src={'/google.webp'}
                                alt={'google logo'}
                                width={30}
                                height={30}
                            />
                        </Button>

                        <p className={'-mt-4 flex gap-1 text-zinc-500'}>
                            Уже есть аккаунт?
                            <span
                                className={`cursor-pointer underline transition-all hover:text-main ${fetching && 'cursor-not-allowed'}`}
                                onClick={
                                    fetching
                                        ? undefined
                                        : () => setFormType('login')
                                }
                            >
                                Войти
                            </span>
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Page;
