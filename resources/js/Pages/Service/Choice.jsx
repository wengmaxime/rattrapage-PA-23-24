import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Choice({ auth }) {
    const { data, setData, post, errors } = useForm({
        ville: '', 
        service: '',
        address: '',
    });

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const handleSelectionCity = (city) => {
        console.log('handleSelectionCity:', city); 
        console.log('data handleSelectionCity:', data);
        setData('ville', city); 
        setSelectedCity(city); 
    };

    const handleSelectionService = (service) => {
        console.log('handleSelectionService:', service); 
        console.log('data handleSelectionService:', data); 
        if(service){}
        setData('service', service); 
        setSelectedService(service); 
    };

    useEffect(() => {
        console.log('data:', data);
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données à soumettre:', data); 
        post(route('serviceResume', data)); 
    };

    return (
        <div>
            <Navbar user={auth.user} />

            <form className="flex flex-col items-center mt-20 space-y-6" onSubmit={handleSubmit}>
                <Dropdown>
                    <Dropdown.Trigger>
                        <button type="button" className="px-4 py-2 text-white bg-blue-600 rounded-md">
                            Sélectionner une ville
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onClick={() => handleSelectionCity('Paris')}>Paris</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectionCity('Limoges')}>Limoges</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectionCity('Nantes')}>Nantes</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>

                <div className="mt-4 text-lg text-gray-700">
                        <div>
                            Ville sélectionnée : <span className="font-bold">{data.ville}</span>
                        </div>
                </div>

                <Dropdown>
                    <Dropdown.Trigger>
                        <button type="button" className="px-4 py-2 text-white bg-blue-600 rounded-md">
                            Sélectionner un service
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item onClick={() => handleSelectionService('Jardinage')}>Jardinage</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectionService('Réparation')}>Réparation</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectionService('Rénovation')}>Rénovation</Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown>

                <div className="mt-4 text-lg text-gray-700">
                        <div>
                            Service sélectionné : <span className="font-bold">{data.service}</span>
                        </div>
                </div>

                <InputLabel htmlFor="address" value="address" className='text-2xl' />

                <TextInput
                        id="address"
                        type="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        isFocused={true}
                        onChange={(e) => setData('address', e.target.value)}
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
