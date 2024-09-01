// import { t } from 'i18next';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import InputLabel from '@/Components/InputLabel';
import Textarea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';

export default function AddConseil({ auth,type }) {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
        type: type,
    });

    console.log(data)
    console.log(type)

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addConseilPost', data)); 
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark/100 min-h-screen">
            <Navbar user={auth.user} />
            <form className="flex flex-col items-center mt-20 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" id="type" name="type" value=''></input>
            <InputLabel htmlFor="title" value="title" className='text-2xl text-white' />
                <TextInput
                        id="title"
                        type="title"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        isFocused={true}
                        onChange={(e) => setData('title', e.target.value)}
                />
                <InputLabel htmlFor="content" value="content" className='text-2xl text-white' />
                    <TextInput
                        id="content"
                        type="content"
                        name="content"
                        value={data.content}
                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        isFocused={true}
                        onChange={(e) => setData('content', e.target.value)}
                />

                <button type="submit" className="px-4 py-2 mt-6 text-white bg-green-600 rounded-md">
                    Valider
                </button>

            </form>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
