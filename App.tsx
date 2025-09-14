import React, { useState, useCallback } from 'react';
import { Game } from './types';
import { games } from './data/games';
import Introduction from './components/Introduction';
import GameCard from './components/GameCard';
import { generateGame, generateImageForGame } from './utils/gemini';

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-50" aria-live="assertive">
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mx-auto mb-4"></div>
      <p className="text-xl text-amber-800 font-patrick-hand">{message}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'game'>('intro');
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const getNewGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let gameData: Partial<Game>;
      const shouldGenerateNewGame = Math.random() < 0.25; // 25% chance to generate a new game

      if (shouldGenerateNewGame) {
        setLoadingMessage('Thinking of a new game...');
        gameData = await generateGame(games);
      } else {
        setLoadingMessage('Picking a game...');
        const availableGames = games.filter(g => g.id !== currentGame?.id);
        const randomIndex = Math.floor(Math.random() * availableGames.length);
        gameData = availableGames.length > 0 ? availableGames[randomIndex] : games[0];
      }

      setLoadingMessage('Creating an illustration...');
      const imageUrl = await generateImageForGame(gameData);
      
      const completeGame: Game = {
          id: 'id' in gameData ? gameData.id! : Date.now(),
          title: gameData.title!,
          rules: gameData.rules!,
          learning: gameData.learning!,
          alternative: gameData.alternative!,
          imageUrl: imageUrl,
      };

      setCurrentGame(completeGame);
      setView('game');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setView('intro');
    } finally {
      setLoading(false);
    }
  }, [currentGame?.id]);


  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-amber-100/50"
      style={{
        backgroundImage: 'radial-gradient(circle at top left, #fffbe9, #fef3c7, #fde68a)',
      }}
    >
      {loading && <LoadingSpinner message={loadingMessage} />}
      {error && (
        <div className="absolute top-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <strong className="font-bold">Oh no! </strong>
            <span className="block sm:inline">{error} Please try again.</span>
        </div>
      )}

      {view === 'intro' ? (
        <Introduction onStart={getNewGame} />
      ) : (
        <GameCard game={currentGame} onNext={getNewGame} />
      )}
    </main>
  );
};

export default App;
