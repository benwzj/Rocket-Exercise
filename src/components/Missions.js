import { useState, useEffect, useMemo } from 'react';
import MissionSearch from './MissionSearch';
import MissionList from './MissionList';
import { FetchLaunchPads, FetchLaunchs } from '../api/hapi';
import './Mission.scss';

export default function Missions() {
  const [launchs, setLaunchs] = useState([]);
  const [launchPads, setLaunchPads] = useState([]);
  const [displayLaunchs, setDisplayLaunchs] = useState([]);

  const loadLaunches = async()=>{
    const ls = await FetchLaunchs();
    if (ls) {
      setLaunchs (ls);
      setDisplayLaunchs (ls);
    }
  }

  const loadLaunchePads = async()=>{
    const lds = await FetchLaunchPads();
    if (lds) setLaunchPads (lds);
  }

  useEffect(()=>{
    loadLaunches();
  },[]);

  useEffect(()=>{
    loadLaunchePads();
  },[]);

  const getYearsReducer = (a,c)=>{
    const date = new Date(c.launch_date_local);
    a.add (date.getFullYear());
    return a;
  }

  const yearOptions = useMemo(()=>{
    const initSet = new Set();
    const yearSet = launchs.reduce (getYearsReducer, initSet);
    const yearArray = Array.from (yearSet);
    return yearArray;
  }, [launchs]);

  const filterMissions = (keywords, lPad, minYear, maxYear) =>{
    keywords = keywords.trim();
    const keywordsIsNumber = !isNaN (keywords); // including '', ' '

    const filterM = launchs.filter ((mission) => {
      const flight_number = mission.flight_number; 
      const rocket_name = mission.rocket.rocket_name.toLowerCase(); 
      const payload_ids = mission.payloads.reduce((a,c)=> a+c.payload_id, '').toLowerCase();
      const launchPad_id = mission.launch_site.site_id;
      const date = new Date(mission.launch_date_local);
      const launch_year = date.getFullYear();
      
      let bKeywords, bLPad, bMinYear, bMaxYear = false;
      keywords = keywords.toLowerCase();
      // keywords matches flight numbers
      if (keywords === ''){
        bKeywords = true;
      }
      else if (keywordsIsNumber) {
        if (parseInt(keywords) === flight_number ) bKeywords = true;
      }
      else{
        // keywords have any word in rocket name OR in payload id.
        bKeywords = rocket_name.includes(keywords) || payload_ids.includes(keywords);
      }

      // missions launched from the selected launch pad.
      if (lPad === 'Any'){
        bLPad = true;
      }
      else{
        bLPad = (lPad === launchPad_id);
      }

      if (minYear === 'Any'){
        bMinYear = true;
      } else{
        bMinYear = (launch_year >= minYear); 
      }
      if (maxYear === 'Any'){
        bMaxYear = true;
      }else{
        bMaxYear = (launch_year <= maxYear);
      }
      console.log(keywords+'-'+lPad+ '-'+ minYear+'-'+ maxYear)
      console.log(bKeywords)
      console.log(bLPad )
      console.log(bMinYear )
      console.log(bMaxYear)
      return bKeywords && bLPad && bMinYear && bMaxYear;
    });
    console.log('filterMissions: ');
    console.log(filterM);
    setDisplayLaunchs (filterM);
  }

  return (
    <div className='Mission-container' id='mission-container'>
      <MissionSearch lPads={launchPads} years={yearOptions} onApply={filterMissions}/>
      <MissionList launchs={displayLaunchs} launchPads={launchPads} />
    </div>
  )
}