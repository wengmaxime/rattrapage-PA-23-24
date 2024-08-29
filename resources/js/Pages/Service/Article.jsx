// import { t } from 'i18next';
import Navbar from '@/Components/Navbar';

export default function ConseilArticle({ auth, article }) {
    console.log(article);

    return (
        <div>
            <Navbar user={auth.user} />

            <style jsx>{`
                .list-dot {
                    padding-left: 20px;
                    list-style-type: disc;
                }

                .list-num {
                    padding-left: 20px;
                    list-style-type: decimal;
                }

                .list-item {
                    margin-bottom: 4px;
                }
            `}</style>

            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6 mb-6">
                    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                    <p className="text-gray-500 mb-4">
                        Publié le : {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                    </p>
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </div>

            <footer className="w-full py-16 text-center text-sm text-black dark:text-white/70">
                Ahmad Maxime Nathan
            </footer>
        </div>
    );
}
