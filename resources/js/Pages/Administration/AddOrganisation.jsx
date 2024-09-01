import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

import Navbar from '@/Components/Navbar';
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton'; 

export default function AddOrganisation({ auth,user }) {
    console.log(user)

    const { data, setData, post, errors } = useForm({
        type: '',
        name: '',
        user: '',
    });

    const [selectedType, setSelectedType] = useState('');
    const [filter, setFilter] = useState('');

    const [filteredUsers, setFilteredUsers] = useState(user);

    const handleSelectionType = (type) => {
        console.log('handleSelectionType:', type); 
        console.log('data handleSelectionType:', data);
        setData('type', type); 
        setSelectedType(type); 
    };

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        setFilteredUsers(user.filter(u => 
            u.name.toLowerCase().includes(value) || 
            u.email.toLowerCase().includes(value)
        ));
    };

    const handleSelectUser = (userId) => {
        setData('user', userId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addOrganisationPost', data));
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white min-h-screen">
            <Navbar user={auth.user} />
            
            <form className="flex flex-col items-center mt-20 space-y-6" onSubmit={handleSubmit}>
                <InputLabel htmlFor="type" value="type" className='text-2xl text-white' />
                <Dropdown>
                    <Dropdown.Trigger>
                        <button type="button" className="px-4 py-2 text-white bg-blue-600 rounded-md">
                            Sélectionner un type
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onClick={() => handleSelectionType('gouvernement')}>gouvernement</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectionType('association')}>association</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectionType('commerce')}>commerce</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>
                <div className="mt-4 text-lg">
                        <div>
                            type sélectionnée : <span className="font-bold">{data.type}</span>
                        </div>
                </div>
                <InputLabel htmlFor="name" value="name" className='text-2xl text-white' />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />

                <InputLabel htmlFor="user-filter" value="Sélectionner un utilisateur ou en créer un" className='text-2xl text-white' />
                <TextInput
                    id="user-filter"
                    type="text"
                    value={filter}
                    placeholder="Rechercher par nom ou email"
                    className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleFilterChange}
                />
                <div className="w-full max-w-lg mt-4">
                    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="p-3 text-left">Nom</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Sélectionner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(u => (
                                <tr key={u.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-3">{u.name}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3">
                                        <SecondaryButton onClick={() => handleSelectUser(u.id)}>
                                            Sélectionner
                                        </SecondaryButton>
                                    </td>
                                </tr>
                            ))}
                            {/*<tr>
                                 <td className="p-3">
                                    <InputLabel htmlFor="user_name" value="user_name" className='text-2xl text-white' />
                                    <TextInput
                                        id="user_name"
                                        type="user_name"
                                        name="user_name"
                                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                </td>
                                <td className="p-3">

                                </td>
                                <td className="p-3">
                                    <SecondaryButton onClick={() => handleSelectUser(u.id)}>
                                        ajouter nouvelle utilisateur
                                    </SecondaryButton>
                                </td>
                            </tr>*/}
                        </tbody>
                    </table>
                </div>

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
