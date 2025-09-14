
import React from 'react';

interface IntroductionProps {
  onStart: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onStart }) => {
  return (
    <div className="text-center p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl text-amber-900 mb-6">Drawing Games for Little Observers</h1>
      
      <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-amber-200 text-left text-amber-800 space-y-6 text-base md:text-lg">
        <p>
          "Drawing Games for Little Observers" is a collection of creative games designed to teach children how to draw by sharpening their observational skills. Each game encourages children to see drawing as a joyful exploration rather than a test of skill or accuracy. However, these games are not solo activities; they require the active participation of an adult to make the experience richer and more engaging. Together, the child and adult can embark on these games, discovering new ways to look at and interpret the world.
        </p>
        <p>
          The aim of this approach is to help children understand that drawing is not simply about copying a photo or imitating an expert's artwork—both of which can feel daunting due to their precision or skill. Instead, these games show that drawing is about creating a unique interpretation of the world. By learning to observe without the pressure of achieving photographic realism, children realize that what they create is their own, unfiltered view—a "first-hand" interpretation. This understanding fosters confidence, as the child sees drawing not as a comparison to others' work but as a direct expression of their own perception.
        </p>
        
        <div className="bg-amber-100/50 p-6 rounded-xl border border-amber-200">
            <h2 className="text-2xl md:text-3xl text-amber-900 mb-3 font-patrick-hand">A Note on How to Use This Book</h2>
            <p className="mb-4">
                "Drawing Games for Little Observers" is designed to be a flexible journey of creativity and observation. There is no specific order to follow—each page contains a unique game that can be explored at any time. Feel free to pick games that spark the most interest or try as many as you like. Repeating favorite games is encouraged, as the aim is to make drawing enjoyable and engaging for both the child and adult.
            </p>
            <p>
                This book is about having fun while learning to see the world differently. If you and your child come up with your own drawing games, that's even better! The main goal is to foster observation, build confidence, and show that drawing isn’t as daunting as it seems. It’s all about exploring together, interpreting the world in your own way, and enjoying the creative process.
            </p>
        </div>
      </div>

      <button
        onClick={onStart}
        className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out font-patrick-hand"
      >
        Let's Play a Game!
      </button>
    </div>
  );
};

export default Introduction;
