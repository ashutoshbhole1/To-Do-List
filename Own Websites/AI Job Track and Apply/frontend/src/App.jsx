import React, { useEffect, useState } from 'react';

const JobCard = ({ job, onApply, onGenerateMessage }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {job.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{job.company} • {job.location}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${job.status === 'Applied' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-800 text-gray-300 border border-gray-700'}`}>
            {job.status}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags?.map(t => (
            <span key={t} className="px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded text-xs">{t}</span>
          ))}
          <span className="px-2 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded text-xs">{job.experience || 'Entry Level'}</span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
            {job.description}
          </p>
        </div>
        
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-6">
            {job.skills.slice(0, 5).map(s => (
              <span key={s} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">{s}</span>
            ))}
            {job.skills.length > 5 && <span className="px-2 py-0.5 text-gray-500 text-xs">+{job.skills.length - 5}</span>}
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-auto">
        <button onClick={() => onApply(job)} className="btn-primary flex-1">
          {job.status === 'Applied' ? 'Re-Apply / View' : 'Apply Now'}
        </button>
        <button onClick={() => onGenerateMessage(job)} className="btn-secondary flex-1">
          ✨ Generate Message
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageModal, setMessageModal] = useState({ open: false, content: '', job: null });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
    window.open(job.applyLink, '_blank');
    if (job.status !== 'Applied') {
      try {
        await fetch(`http://localhost:5000/api/jobs/${job._id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Applied' })
        });
        fetchJobs(); // Refresh
      } catch (err) {
        console.error('Error updating status', err);
      }
    }
  };

  const generateMessage = async (job) => {
    // Ideally this hits a backend route that calls processJobMessage...
    setMessageModal({ open: true, content: 'Generating message via AI...', job });
    // Simulate backend call
    setTimeout(() => {
      setMessageModal(prev => ({ ...prev, content: `Hi Hiring Team,\n\nI am very interested in the ${job.title} role at ${job.company}. I have hands-on experience with ${job.skills?.slice(0,3).join(', ') || 'React, Node'}.\n\nI’d love to connect.\n\nBest,\n[Your Name]` }));
    }, 1500);
  };

  const handleScrapeSync = async () => {
    try {
      await fetch('http://localhost:5000/api/jobs/scrape', { method: 'POST' });
      alert('Scraper started in the background! Please fetch jobs in a few seconds.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent mb-2">
              AI Job Hunter
            </h1>
            <p className="text-gray-400 text-lg">Your automated entry-level tech job portal.</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <button onClick={handleScrapeSync} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-300 border border-gray-700 transition">
              Run Scraper Sync
            </button>
            <button onClick={fetchJobs} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm text-white transition">
              Refresh Jobs
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? jobs.map(job => (
              <JobCard key={job._id} job={job} onApply={handleApply} onGenerateMessage={generateMessage} />
            )) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-xl">No jobs found. Run the scraper to populate.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {messageModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setMessageModal({ open: false, content: '', job: null })} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">AI Outreach Message</h2>
            <p className="text-sm text-gray-400 mb-4">For {messageModal.job?.title} at {messageModal.job?.company}</p>
            <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 text-gray-300 whitespace-pre-wrap min-h-[150px]">
              {messageModal.content}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                className="btn-primary" 
                onClick={() => {
                  navigator.clipboard.writeText(messageModal.content);
                  setMessageModal({ ...messageModal, open: false });
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
