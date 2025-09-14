import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game | null;
  onNext: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <div className="bg-amber-50/50 p-6 rounded-lg border-2 border-amber-200/50 shadow-inner">
        <h3 className="font-patrick-hand text-3xl text-amber-800 mb-3 flex items-center">
            <span className="text-2xl mr-2" aria-hidden="true">{icon}</span>
            {title}
        </h3>
        <p className="text-amber-700 leading-relaxed">{children}</p>
    </div>
);


const GameCard: React.FC<GameCardProps> = ({ game, onNext }) => {
  if (!game) {
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-amber-700">Loading a game...</p>
        </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-4 md:p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-amber-200">
        <div className="text-center mb-6">
            <h2 className="inline-block bg-amber-200 text-amber-900 text-4xl md:text-5xl px-8 py-2 rounded-full transform -rotate-2 shadow-md">
                {game.title}
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="w-full h-[400px] md:h-full bg-amber-100 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                {game.imageUrl ? (
                    <img 
                        src={game.imageUrl} 
                        alt={game.title} 
                        className="rounded-xl w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-amber-500 font-patrick-hand text-2xl">Creating illustration...</div>
                )}
            </div>

            <div className="space-y-6">
                <Section title="Rules" icon="📜">
                    {game.rules}
                </Section>
                <Section title="What We're Learning" icon="🧠">
                    {game.learning}
                </Section>
                <Section title="Alternative to Try" icon="💡">
                    {game.alternative}
                </Section>
            </div>
        </div>

        <div className="text-center mt-8">
            <button
                onClick={onNext}
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out font-patrick-hand"
            >
                Show Me Another Game!
            </button>
        </div>
    </div>
  );
};

export default GameCard;
