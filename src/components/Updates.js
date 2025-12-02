import React from 'react';
import '../App.css';

export default function Updates() {
  // Dummy updates data
  const updates = [
    {
      id: 1,
      title: 'New Campaign Launch',
      description: 'We are excited to announce the launch of our latest media campaign featuring cutting-edge content creation techniques.',
      image: 'https://via.placeholder.com/300x200/C1121F/ffffff?text=Update+1',
      date: 'Dec 1, 2025',
    },
    {
      id: 2,
      title: 'Team Expansion',
      description: 'Welcoming 5 new talented creators to our growing team. Together we bring fresh perspectives and innovative ideas.',
      image: 'https://via.placeholder.com/300x200/9b0f18/ffffff?text=Update+2',
      date: 'Nov 28, 2025',
    },
    {
      id: 3,
      title: 'Workshop Series',
      description: 'Join us for our monthly workshop series on social media marketing, content creation, and brand development.',
      image: 'https://via.placeholder.com/300x200/C1121F/ffffff?text=Update+3',
      date: 'Nov 25, 2025',
    },
    {
      id: 4,
      title: 'Client Success Story',
      description: 'One of our clients achieved a 300% increase in engagement with our comprehensive media strategy implementation.',
      image: 'https://via.placeholder.com/300x200/9b0f18/ffffff?text=Update+4',
      date: 'Nov 20, 2025',
    },
    {
      id: 5,
      title: 'Technology Upgrade',
      description: 'We have upgraded our production equipment to support 4K and 8K content creation for premium clients.',
      image: 'https://via.placeholder.com/300x200/C1121F/ffffff?text=Update+5',
      date: 'Nov 15, 2025',
    },
    {
      id: 6,
      title: 'Partnership Announcement',
      description: 'Announcing our strategic partnership with leading international media companies to expand our service offerings.',
      image: 'https://via.placeholder.com/300x200/9b0f18/ffffff?text=Update+6',
      date: 'Nov 10, 2025',
    },
  ];

  return (
    <section className="updates-section">
      <div className="updates-header">
        <h2>UPDATES</h2>
        <p>Latest updates</p>
      </div>

      <div className="updates-grid">
        {updates.map((update) => (
          <article key={update.id} className="update-card">
            <div className="update-image">
              <img src={update.image} alt={update.title} />
            </div>
            <div className="update-content">
              <h3>{update.title}</h3>
              <p>{update.description}</p>
              <div className="update-date">{update.date}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
