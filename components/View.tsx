import React from 'react'
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { START_UP_QUERY_VIEW } from '@/sanity/lib/queries';

const View = async({id}: {id : string}) => {
    const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(START_UP_QUERY_VIEW, {id})
    return (
        <div className="view-container">
          <div className="absolute -top-2 -right-2">
            <Ping />
          </div>
    
          <p className="view-text">
            <span className="font-black">Views: {totalViews}</span>
          </p>
        </div>
      );
    };

export default View