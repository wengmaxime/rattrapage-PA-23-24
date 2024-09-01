//import { t } from 'i18next';
import Navbar from '@/Components/Navbar';

import Dropdown from '@/Components/Dropdown';
import SecondaryButton from '@/Components/SecondaryButton'; 
import { Link } from 'react-router-dom';

export default function indexService({ auth }) {
    console.log(auth.user);
    const handleButton = (link) => {

        href=(route(link)); 
    }
    const services = [
        {
            category: 'Conseils anti-gaspillage',
            items: [
                {
                    title: 'Conseil Anti-Gaspillage',
                    description: 'Chaque Samedi trouver notre liste de conseil pour réduire le gaspillage.',
                    buttonText: 'Voir Conseil',
                    buttonLink: '/conseil_anti_gaspi',
                    categorie: 'gaspi'
                },
                {
                    title: 'Conseils en Économie d\'Énergie',
                    description: 'Chaque Samedi trouver des conseils pour réduire votre consommation d\'énergie à la maison et réduire votre facture d\'élécrticité.',
                    buttonText: 'Voir Conseil',
                    buttonLink: '/conseil_economie_energie',
                    categorie: 'energie'
                },
            ],
        },
        {
            category: 'Cours de Cuisine',
            items: [
                {
                    title: 'Cours de Cuisine',
                    description: 'Envie de devenir un cordon bleu? d\'élargir votre horizon culinaire? Découvrez nos divers recettes',
                    buttonText: 'Voir recette',
                    buttonLink: '/tuto_cuisine',
                }
            ],
        },
        {
            category: 'Location/Partage de Véhicules',
            items: [
                {
                    title: 'Location de Voitures',
                    description: 'Louez une voiture à prix abordable et réduisez votre empreinte carbone.',
                    buttonText: 'Louer',
                    buttonLink: '/listeVehicule',
                    drowpdown: true
                },
            ],
        },
        {
            category: 'Services et entraide entre Particuliers',
            items: [
                {
                    title: 'Demande de Services',
                    description: 'Demander un service et obtenez une de l\'aide de la part de particulier.',
                    buttonText: 'En savoir plus',
                    buttonLink: '#',
                },
                {
                    title: 'Offre de Services',
                    description: 'Consulter les services actuellement sur demande.',
                    buttonText: 'En savoir plus',
                    buttonLink: '#',
                },
            ],

        },
        {
            category: 'Services Généraux', //{t('general service')}
            items: [
                {
                    title: '',
                    description: 'Nous proposons les services de jardinnages, de garde d\'enfant et d\'animaux à domicile et de rénovation à des tarifs très abordables',
                    buttonText: 'Profitez',
                    buttonLink: 'serviceChoice',
                }
            ],
        },
    ];

    const handleSelectionCity = (city, link) =>{
        console.log(city)
        console.log(link)
        if (link && city) {
            window.location.href = link + '/' + city;
        } else {
            console.error("Invalid link or city");
        }    }

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white/100 min-h-screen flex flex-col">
            <Navbar user={auth.user} />
            

            <div className="flex flex-col gap-8 p-8">
                {services.map((serviceCategory, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-bold mb-4">{serviceCategory.category}</h2>
                        <div className="flex flex-col gap-4">
                            {serviceCategory.items.map((service, idx) => (
                                <div key={idx} className="border p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                    <p className="mb-4">{service.description}</p>
                                    {service.drowpdown ? (
                                        <form className="flex flex-col items-center space-y-6" >
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button type="button" className="px-4 py-2 text-white bg-blue-600 rounded-md">
                                                    Sélectionner une ville
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link onClick={() => handleSelectionCity('Paris',service.buttonLink)}>Paris</Dropdown.Link>
                                                <Dropdown.Link onClick={() => handleSelectionCity('Limoges',service.buttonLink)}>Limoges</Dropdown.Link>
                                                <Dropdown.Link onClick={() => handleSelectionCity('Nantes',service.buttonLink)}>Nantes</Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                        </form>
                                    ):
                                    (
                                        <SecondaryButton
                                            className="mt-2"
                                            onClick={() => window.location.href = service.buttonLink} // edit ?
                                        >
                                            {service.buttonText}
                                        </SecondaryButton>
                                        
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
