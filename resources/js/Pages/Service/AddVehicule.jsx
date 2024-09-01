import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function ConseilArticle({ auth,city }) {
    console.log(city)
    const { data, setData, post, errors } = useForm({
        modele: '',
        immatriculation: '',
        city: city,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('addPublicVehiculePost',data))
        };



    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark/100 min-h-screen">
            <Navbar user={auth.user} />

            <form className="flex flex-col items-center mt-20 space-y-6" onSubmit={handleSubmit}>
                <InputLabel htmlFor="modele" value="modele" className='text-2xl text-white' />
                <TextInput
                    id="modele"
                    type="text"
                    name="modele"
                    value={data.modele}
                    className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    isFocused={true}
                    onChange={(e) => setData('modele', e.target.value)}
                />
                <InputLabel htmlFor="immatriculation" value="immatriculation" className='text-2xl text-white' />
                    <TextInput
                        id="immatriculation"
                        type="text"
                        name="immatriculation"
                        value={data.immatriculation}
                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        isFocused={true}
                        onChange={(e) => setData('immatriculation', e.target.value)}
                    />


                <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">
                    Soumettre
                </button>
            </form>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
