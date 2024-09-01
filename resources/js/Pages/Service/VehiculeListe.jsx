import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import Navbar from '@/Components/Navbar';
import SecondaryButton from '@/Components/SecondaryButton'; 

export default function VehiculeListe({ auth, vehicule,ville }) {
    console.log(ville)
    const { data, setData, post } = useForm({
        vehicule: '',
        date: '',
        user: auth.user.id,
    });

    const [reservations, setReservations] = useState([]);

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0]; // Retourne la date au format YYYY-MM-DD
    };

    const handleDateChange = (vehiculeId, selectedDate) => {
        console.log(`Véhicule ID: ${vehiculeId}, Date sélectionnée: ${selectedDate}`);
        
        fetch(`/allVehiculeReservation/${vehiculeId}/${selectedDate}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && Object.keys(data).length > 0) {
                    console.log(`Réservations pour le véhicule ID ${vehiculeId} à la date ${selectedDate}:`, data);
                } else {
                    console.log(`Aucune réservation trouvée pour le véhicule ID ${vehiculeId} à la date ${selectedDate}.`);
                    setData('date', selectedDate);
                }
                
            })
            .catch(error => console.error('Erreur lors de la récupération des réservations:', error));
    };
            
    const handleSubmit = (e, vehiculeId) => {
        e.preventDefault();
        setData('vehicule', vehiculeId);
        post(route('ReservationVehiculePost', data)); 
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white/100 min-h-screen">
            <Navbar user={auth.user} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
                <SecondaryButton
                    className="mt-2"
                    onClick={() => window.location.href = `/addPublicVehicule?city=${ville}`} 
                >
                    Ajouter un vehicule
                </SecondaryButton>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-semibold text-center mb-8">Liste des Véhicules</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {vehicule.map((veh, index) => (
                        <div key={index} className="bg-white p-4 rounded shadow">
                            <form onSubmit={(e) => handleSubmit(e, veh.id)}>
                                <p className="text-sm text-gray-700">Modèle: {veh.modele}</p>
                                <p className="text-sm text-gray-700">Immatriculation: {veh.immatriculation}</p>

                                <div className="mt-4">
                                    <label htmlFor={`date-${index}`} className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        id={`date-${index}`}
                                        name="date"
                                        min={getTomorrowDate()}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        onChange={(e) => handleDateChange(veh.id, e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Soumettre
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
