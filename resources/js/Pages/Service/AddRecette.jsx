import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function ConseilArticle({ auth }) {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
        type: 'recette',
    });

    const [ingredients, setIngredients] = useState(['']); 
    const [etapes, setEtapes] = useState(['']); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const contentHtml = `
            <h2 class="text-2xl mb-">Ingrédients</h2>
            <ul class='list-dot'>
                ${ingredients.map(ingredient => `<li class='list-item'>${ingredient}</li>`).join('')}
            </ul>
            <h2 class="text-2xl mb-">Étapes</h2>
            <ol class='list-num'>
                ${etapes.map(etape => `<li class='list-item'>${etape}</li>`).join('')}
            </ol>
        `;
        
        setData('content', contentHtml);
        post(route('addConseilPost', {
            ...data, 
            content: contentHtml, 
        })); 
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']); 
    };

    const addEtape = () => {
        setEtapes([...etapes, '']); 
    };

    const handleChangeIngredient = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value; 
        setIngredients(newIngredients);
    };

    const handleChangeEtape = (index, value) => {
        const newEtapes = [...etapes];
        newEtapes[index] = value; 
        setEtapes(newEtapes);
    };

    return (
        <div className="bg-gray-50 text-black/50 dark:bg-gray-900/80 dark/100 min-h-screen">
            <Navbar user={auth.user} />

            <form className="flex flex-col items-center mt-20 space-y-6" onSubmit={handleSubmit}>
                <InputLabel htmlFor="title" value="Titre" className='text-2xl text-white' />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    isFocused={true}
                    onChange={(e) => setData('title', e.target.value)}
                />

                <InputLabel htmlFor="ingredients" value="Ingrédients" className='text-2xl text-white' />
                {ingredients.map((ingredient, index) => (
                    <TextInput
                        key={index}
                        id={`ingredient-${index}`}
                        type="text"
                        name={`ingredient-${index}`}
                        value={ingredient}
                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleChangeIngredient(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={addIngredient} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                    Ajouter un ingrédient
                </button>

                <InputLabel htmlFor="etapes" value="Étapes" className='text-2xl text-white' />
                {etapes.map((etape, index) => (
                    <TextInput
                        key={index}
                        id={`etape-${index}`}
                        type="text"
                        name={`etape-${index}`}
                        value={etape}
                        className="mt-1 block w-full max-w-lg p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleChangeEtape(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={addEtape} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                    Ajouter une étape
                </button>

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
