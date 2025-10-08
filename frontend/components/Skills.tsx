import React from 'react';
import SkillCard from './SkillCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Skills: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  
  const skillsData = [
    {
      title: "Frontend Development",
      skills: [
        "HTML, CSS, JavaScript",
        "Responsive Web Design",
        "(Bootstrap, Tailwind CSS)",
        "Frameworks (React, Vue.js, Angular)",
        "UI/UX Design Principles"
      ]
    },
    {
      title: "Backend Development",
      skills: [
        "Git & GitHub/GitLab",
        "Agile & Scrum Methodologies",
        "CI/CD Pipelines (GitHub Actions, Jenkins)"
      ]
    },
    {
      title: "Version Control & Collaboration",
      skills: [
        "Integration of Frontend & Backend",
        "Responsive Web Design",
        "Frameworks (React, Vue.js, Angular)",
        "UI/UX Design Principles"
      ]
    },
    {
      title: "Additional Skills",
      skills: [
        "SEO Optimization",
        "Performance Optimization",
        "CMS (WordPress, Joomla)",
        "E-commerce (Shopify, WooCommerce)"
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20 md:py-32 bg-white dark:bg-[#0a192f]">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">SKILLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillsData.map((skillSet, index) => (
                    <SkillCard key={index} title={skillSet.title} skills={skillSet.skills} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default Skills;