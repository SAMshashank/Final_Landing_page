import { CheckCircle, Circle } from 'lucide-react'
import { useEffect, useState } from 'react';

// const roadmapItems:PhaseInterface[] = [
//   { phase: 'Phase 1', title: 'Platform Launch', status: 'completed', description: 'Initial release of the Web3 social media platform with basic features.' },
//   { phase: 'Phase 2', title: 'Token Integration', status: 'in-progress', description: 'Implementation of native token and basic economic features.' },
//   { phase: 'Phase 3', title: 'Advanced Avatar System', status: 'upcoming', description: 'Release of the advanced avatar creation and customization tools.' },
//   { phase: 'Phase 4', title: 'Metaverse Integration', status: 'upcoming', description: 'Integration with popular metaverse platforms for seamless experiences.' },
// ]

export default function Roadmap() {

  const [roadmapItems,setRoadMap]  =useState<PhaseInterface[]>([])

  useEffect(() => {

    fetchPartnerData('roadmap').then((partnerData:any) => {
      setRoadMap(partnerData?.metadata);
  })
    // setShowSlider(true)
  }, [])


  const fetchPartnerData = async (title: string) => {
    const url = `/api/admin/dashboard?title=${encodeURIComponent(title)}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // Handle error if response is not successful
        const errorData = await response.json();
        console.error('Error fetching partner data:', errorData);
        return { success: false, message: errorData.error || 'An error occurred' };
      }
  
      const responseData = await response.json();
      console.log('Fetched partner data:', responseData.metadata);
      return { success: true, metadata: responseData.metadata };
    } catch (error) {
      console.error('Network Error:', error);
      return { success: false, message: 'An error occurred while fetching the data' };
    }
  };


  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">Roadmap</h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400"></div>
          <div className="space-y-16">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <h3 className="text-xl font-semibold text-yellow-400">{item.phase}: {item.title}</h3>
                  <p className="text-gray-300 mt-2">{item.description}</p>
                  <span className="text-sm font-medium text-gray-400 capitalize mt-1 inline-block">{item.status.replace('-', ' ')}</span>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-yellow-400 bg-gray-900">
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-yellow-400" />
                  ) : item.status === 'in-progress' ? (
                    <Circle className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}



interface PhaseInterface {
  phase: string;       // Name or identifier for the phase
  title: string;       // Title or brief summary of the phase
  status: 'completed'|'in-progress'|'upcoming';      // Status of the phase (e.g., "completed", "in progress", etc.)
  description: string; // Detailed description of the phase
}