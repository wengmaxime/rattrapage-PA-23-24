// import { t } from 'i18next';
import Navbar from '@/Components/Navbar';

export default function ConseilList({ auth, articles,titre }) {
    console.log(articles);
    console.log(titre);
    let link;

    if(titre=='conseil anti gaspi'){link="article_anti_gaspi"}
    if(titre=='conseil enconomie energie'){link="article_economie_energie"}

    return (
        <div>
            <Navbar user={auth.user} />

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
