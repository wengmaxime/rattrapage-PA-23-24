import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import Navbar from '@/Components/Navbar';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton'; 
import PrimaryButton from '@/Components/PrimaryButton';


export default function EditMemberOrganisation({ auth, users }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [newMemberEmail, setNewMemberEmail] = useState('');


    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleAddMember = () => {
        setNewMemberEmail('');
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white min-h-screen">
            <Navbar user={auth.user} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-4">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                
                <h1 className="text-3xl font-semibold text-center mb-8">Liste des Membres de l'Organisation</h1>
                
                
 
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Nom</th>
                            <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Email</th>
                            <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="py-2 px-4 text-gray-800 dark:text-gray-300">{user.name}</td>
                                <td className="py-2 px-4 text-gray-800 dark:text-gray-300">{user.email}</td>
                                <td className="py-2 px-4">
                                    <div className="flex space-x-2">
                                        <SecondaryButton onClick={() => console.log(`Retirer ${user.name}`)}>
                                            Retirer
                                        </SecondaryButton>
                                        <SecondaryButton onClick={() => console.log(`Désigner ${user.name} comme manager`)}>
                                            Désigner Nouveau Manager
                                        </SecondaryButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
