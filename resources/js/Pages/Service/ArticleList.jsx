// import { t } from 'i18next';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import SecondaryButton from '@/Components/SecondaryButton'; 


export default function ArticleList({ auth, articles,titre }) {
    const { data, setData, get, post, errors } = useForm({
        type: '',
    })
    console.log(articles);
    console.log("titre : ",titre);
    let link;
    let type;

    if(titre=='recette cuisine'){
        link="article_cuisine"
        type="gaspi"
    }
    if(titre=='conseil anti gaspi'){
        link="article_anti_gaspi"
        type="gaspi"
    }
    if(titre=='conseil economie energie'){
        link="article_economie_energie"
        type="energie"
    }

    const handleAddArticle = (e) => {
        e.preventDefault();
        console.log("type : ",type)
        setData('type', type);
        console.log(data)
        post(route('checkTypeConseil',data))
    };

    return (
        <div  className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark:text-white/100 min-h-screen">
            <Navbar user={auth.user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
            {titre === 'conseil anti gaspi' || titre === 'conseil economie energie' ? ( 
                <SecondaryButton
                    className="mt-2"
                    onClick={() => window.location.href = `/addConseil?type=${type}`} 
                >
                    Ajouter nouvelle article
                </SecondaryButton>
            ) : (
                <SecondaryButton
                    className="mt-2"
                    onClick={() => window.location.href = `/addRecette`} 
                >
                    Ajouter nouvelle recette
                </SecondaryButton>
            )}
            </div>
            

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">{titre}</h1>

                <div className="divide-y divide-gray-300"> {/* Utilisez divide-y pour les séparateurs */}
                    {articles.map((article, index) => (
                        <a 
                            key={index} 
                            href={`${link}/${article.id}`}
                            className="block bg-white border-t border-b border-gray-300 p-4 hover:bg-gray-100 transition duration-150 ease-in-out"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-indigo-600">
                                    {article.title}
                                </h2>
                                <span className="text-sm text-gray-500">{article.date_publication}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{article.introduction}</p>
                        </a>
                    ))}
                </div>
            </div>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
