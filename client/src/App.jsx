import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import ResourceCard from './components/ResourceCard';

const hardcodedResources = [
  {
    identifier: 'hrtcafe-1',
    title: 'HRT Cafe',
    creator: 'HRTCafe',
    description: `Welcome to HRTCafe.net! We hope you enjoy your stay here.`,
    mediatype: 'text',
    url: 'https://hrtcafe.net/',
    collection: '2-3-23'
  },
  {
    identifier: 'trevorproject-1',
    title: 'The Trevor Project',
    creator: 'Trevor Project',
    description: `The Trevor Project is the leading suicide prevention and crisis intervention nonprofit organization for LGBTQ+ young people. We provide information & support to LGBTQ+ young people 24/7, all year round.`,
    mediatype: 'text',
    url: 'https://www.thetrevorproject.org/',
    collection: '6-8-2007'
  },
  {
    identifier: 'glaad-1',
    title: 'GLAAD',
    creator: 'GLAAD',
    description: `Leading the conversation. Shaping the media narrative. Changing the culture. That’s GLAAD at work.`,
    mediatype: 'text',
    url: 'https://glaad.org/',
    collection: '9-10-2025'
  },
  {
    identifier: 'out-1',
    title: 'Out',
    creator: 'Out',
    description: `Out is an American LGBTQ news, fashion, entertainment, and lifestyle magazine, with the highest circulation of any LGBTQ monthly publication in the United States.`,
    mediatype: 'text',
    url: 'https://www.out.com/gay-news',
    collection: '12-2-2001'
  },
  {
    identifier: 'lgbtqnation-1',
    title: 'LGBTQ Nation',
    creator: 'LGBTQ Nation',
    description: 'Description for LGBTQ Nation Article 1',
    mediatype: 'text',
    url: 'https://www.lgbtqnation.com/',
    collection: '7-7-1776'
  },
  {
    identifier: 'pride-1',
    title: 'Pride',
    creator: 'Pride',
    description: `Pride.com is the socially-driven epicenter of original video, photography and editorial, where all young LGBTQ+ people can find stories to share and connect with people like them.`,
    mediatype: 'text',
    url: 'https://www.pride.com/',
    collection: '4-4-2097'
  }
];

export default function App() {
  const [resources, setResources] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use hardcoded data instead of fetching from API
        setResources(hardcodedResources);
        setTotalPages(1);
      } catch (err) {
        setError('Failed to fetch resources. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-primary to-secondary py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">
            Queer Archive Explorer
          </h1>
          <p className="text-white text-center mt-2 text-lg">
            Discover and explore queer resources from the Internet Archive
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard key={resource.identifier} resource={resource} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center px-4 py-2 bg-white rounded shadow disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Previous
              </button>
              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center px-4 py-2 bg-white rounded shadow disabled:opacity-50"
              >
                Next
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>Data provided by the Internet Archive</p>
        </div>
      </footer>
    </div>
  );
}