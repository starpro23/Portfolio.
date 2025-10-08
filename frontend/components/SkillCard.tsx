
import React from 'react';

interface SkillCardProps {
  title: string;
  skills: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-8 rounded-2xl shadow-lg h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/40">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2 text-slate-700 dark:text-slate-400">
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;