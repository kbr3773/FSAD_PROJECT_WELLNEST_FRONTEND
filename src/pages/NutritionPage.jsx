import { motion } from 'framer-motion';
import { Apple, CheckCircle, Flame, Save, TrendingUp, Utensils, X } from 'lucide-react';
import { nutritionPlans } from '../data/dummyData';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

const NutritionPage = () => {
  const dietTypes = ['All', 'Balanced', 'High Protein', 'Vegetarian', 'Energy'];
  const [plans, setPlans] = useState(nutritionPlans);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.getResources('NUTRITION')
      .then((items) => {
        if (items.length) {
          setPlans(items.map((item) => ({
            id: item.id,
            title: item.title,
            type: item.category,
            image: item.imageUrl,
            description: item.description,
            calories: item.category === 'High Protein' ? 2200 : 2000,
            meals: item.category === 'High Protein' ? 4 : 3,
            protein: item.category === 'High Protein' ? '35%' : '25%',
            carbs: item.category === 'High Protein' ? '40%' : '50%',
            fats: '25%',
          })));
        }
      })
      .catch(() => setPlans(nutritionPlans));
  }, []);

  const filteredPlans = selectedType === 'All'
    ? plans
    : plans.filter((plan) => plan.type === selectedType);

  const mealIdeas = (plan) => {
    if (plan.type === 'High Protein') {
      return [
        'Breakfast: eggs or paneer wrap with fruit',
        'Lunch: rice bowl with lentils, curd, and vegetables',
        'Snack: Greek yogurt, nuts, or peanut butter toast',
        'Dinner: grilled paneer/chicken/tofu with salad',
      ];
    }

    if (plan.type === 'Vegetarian') {
      return [
        'Breakfast: oats with banana and seeds',
        'Lunch: dal, rice, vegetables, and curd',
        'Snack: sprouts chaat or fruit bowl',
        'Dinner: chapati with paneer/tofu and salad',
      ];
    }

    if (plan.type === 'Energy') {
      return [
        'Breakfast: poha/upma with peanuts and fruit',
        'Lunch: whole grains with protein and vegetables',
        'Snack: banana smoothie or trail mix',
        'Dinner: light balanced meal with soup or dal',
      ];
    }

    return [
      'Breakfast: oats or idli with fruit',
      'Lunch: rice/chapati, dal, vegetables, and curd',
      'Snack: nuts, fruit, or yogurt',
      'Dinner: balanced plate with protein and vegetables',
    ];
  };

  const savePlan = () => {
    setStatus(`${selectedPlan.title} saved to your wellness plan.`);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
            <Apple className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Nutrition <span className="gradient-text">Guidance</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert meal plans and nutrition advice tailored for student life
          </p>
        </motion.div>

        {/* Diet Type Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {dietTypes.map((type, index) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === type
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Nutrition Plans Grid */}
        {status && (
          <div className="mb-6 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-200">
            {status}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card group cursor-pointer overflow-hidden"
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-white text-sm font-semibold">
                    {plan.type}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{plan.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Calories</span>
                  <span className="font-semibold flex items-center">
                    <Flame className="w-4 h-4 mr-1 text-orange-500" />
                    {plan.calories}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Meals/Day</span>
                  <span className="font-semibold flex items-center">
                    <Utensils className="w-4 h-4 mr-1 text-blue-500" />
                    {plan.meals}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span>Protein</span>
                  <span className="font-semibold">{plan.protein}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: plan.protein }}></div>
                </div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span>Carbs</span>
                  <span className="font-semibold">{plan.carbs}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: plan.carbs }}></div>
                </div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span>Fats</span>
                  <span className="font-semibold">{plan.fats}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: plan.fats }}></div>
                </div>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPlan(plan);
                }}
                className="w-full mt-4 btn-primary"
              >
                View Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Why Nutrition Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Better Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Proper nutrition enhances cognitive function and academic performance
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Increased Energy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Balanced meals provide sustained energy throughout the day
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Overall Wellness</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Good nutrition supports immune system and mental health
              </p>
            </div>
          </div>
        </motion.div>

        {selectedPlan && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600 dark:text-green-300">
                    {selectedPlan.type}
                  </span>
                  <h2 className="mt-3 text-3xl font-bold">{selectedPlan.title}</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{selectedPlan.description}</p>
                </div>
                <button onClick={() => setSelectedPlan(null)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <img
                src={selectedPlan.image}
                alt={selectedPlan.title}
                className="mb-6 h-64 w-full rounded-xl object-cover"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
                <div className="rounded-xl bg-orange-500/10 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                  <p className="mt-1 text-2xl font-bold">{selectedPlan.calories}</p>
                </div>
                <div className="rounded-xl bg-blue-500/10 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Meals/Day</p>
                  <p className="mt-1 text-2xl font-bold">{selectedPlan.meals}</p>
                </div>
                <div className="rounded-xl bg-green-500/10 p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Focus</p>
                  <p className="mt-1 text-2xl font-bold">{selectedPlan.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <h3 className="mb-4 text-lg font-bold">Meal Ideas</h3>
                  <div className="space-y-3">
                    {mealIdeas(selectedPlan).map((meal) => (
                      <div key={meal} className="flex gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-green-500" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{meal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-700">
                  <h3 className="mb-4 text-lg font-bold">Macro Split</h3>
                  {[
                    ['Protein', selectedPlan.protein, 'bg-blue-500'],
                    ['Carbs', selectedPlan.carbs, 'bg-green-500'],
                    ['Fats', selectedPlan.fats, 'bg-purple-500'],
                  ].map(([label, value, color]) => (
                    <div key={label} className="mb-4">
                      <div className="mb-2 flex justify-between text-sm">
                        <span>{label}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className={`h-2 rounded-full ${color}`} style={{ width: value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={savePlan} className="btn-primary flex-1">
                  <Save className="mr-2 h-5 w-5" />
                  Save This Plan
                </button>
                <button onClick={() => setSelectedPlan(null)} className="btn-secondary flex-1">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPage;
