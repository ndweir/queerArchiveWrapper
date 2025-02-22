import React from 'react';

const isAppropriateContent = (text) => {
  if (!text) return true;
  const inappropriateTerms = ['porn', 'xxx', 'nsfw', 'adult content', 'explicit', 'fucking', 'adult', 'offensive', 'erotica', 'naked', 'nude', 'masturbation', 'orgasm', 'anal', 'kink', 'BDSM', 'bondage', 'fetish', 'torture', 'sex'];
  return !inappropriateTerms.some(term => text.toLowerCase().includes(term));
};

export default function ResourceCard({ resource }) {
  // Skip rendering if content seems inappropriate
  if (!isAppropriateContent(resource.title) || !isAppropriateContent(resource.description) || !isAppropriateContent(resource.collection) || !isAppropriateContent(resource.creator) ) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold text-primary mb-2">{resource.title}</h2>
      <p className="text-gray-700 mb-4 line-clamp-3">{resource.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          {resource.collection && (
            <span className="text-sm text-gray-500">
              Date: {Array.isArray(resource.collection) ? resource.collection[0] : resource.collection}
            </span>
          )}
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          View Resource
        </a>
      </div>
    </div>
  );
}
