import Navbar from '@/Components/Navbar';
import SecondaryButton from '@/Components/SecondaryButton'; 

export default function AdministrationIndex({ auth }) {

    const sections = [
        {
            title: 'Organisation',
            description: 'Gérez les organisations, leurs informations, et leurs rôles.',
            link: '/organisation',
            boutons:[
                { link: '/addOrganisation', text: 'ajouter une nouvelle organisation' },
                { link: '#', text: 'regardez les organisations' }
            ]
        },
        {
            title: 'Utilisateur',
            description: 'Gérez les utilisateurs, leurs rôles et permissions.',
            link: '/utilisateur',
            boutons:[
                { link: '#', text: 'bouton 1' }
            ]
        },
        {
            title: 'Stock',
            description: 'Gérez le stock, les produits, et les inventaires.',
            link: '/stock',
            boutons:[
                { link: '#', text: 'bouton 1' },
                { link: '#', text: 'bouton 2' }
            ]
        },
    ];

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white min-h-screen">
            <Navbar user={auth.user} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-semibold text-center mb-8">Administration</h1>
                
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{section.title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{section.description}</p>
                            <div className="flex space-x-4"> {/* Aligner les boutons horizontalement */}
                                {section.boutons.map((bouton, idx) => (
                                    <SecondaryButton
                                        key={idx}
                                        onClick={() => window.location.href = bouton.link}
                                    >
                                        {bouton.text}
                                    </SecondaryButton>
                                ))}
                            </div>
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
