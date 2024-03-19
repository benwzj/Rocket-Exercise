import { useState } from "react";
import DropDown from './atom/DropDown';
import './Mission.scss';

export default function MissionSearch ({lPads, years, onApply}) {
  const [keywords, setKeywords] = useState('');
  const [launchPad, setLaunchPad] = useState({label: 'Any', value: 'Any'});
  const [minYear, setMinYear] = useState({label: 'Any', value: 'Any'});
  const [maxYear, setMaxYear] = useState ({label: 'Any', value: 'Any'});

  const lpOptions = lPads ? lPads.map(pad=>({label: pad.full_name, value: pad.id})) : [];
  lpOptions.unshift ({label: 'Any', value: 'Any'})
  //console.log(lpOptions);
  const yearOptions = years ? years.map(year=>({label: year+'', value: year})) : [];
  yearOptions.unshift ({label: 'Any', value: 'Any'})
  //console.log(yearOptions); 

  const handleKeywords = (e) =>{
    setKeywords (e.target.value);
  }
  const handleLaunchPad = (option) =>{
    setLaunchPad (option);
  }
  const handleMinYear = (option) =>{
    setMinYear (option);
  }
  const handleMaxYear = (option) =>{
    setMaxYear (option);
  }
  const handleApple = ()=>{
    if ((minYear !== 'Any' || maxYear !== 'Any') && minYear.value > maxYear.value){
      alert(" The year range is invalid, please double check it!");
    }else{
      onApply(keywords, launchPad.value, minYear.value, maxYear.value);
    }
  }
  return (
    <div className="Search-container">
      <div className='keyworks'>
        <div className="searchLabel">Keywords</div>
        <input type='text' value={keywords} placeholder='eg Falcon' onChange={handleKeywords}></input>
      </div>
      <div className='launchPad'>
        <div className="searchLabel">Launch Pad</div>
        <DropDown options={lpOptions} value={launchPad} onChange={handleLaunchPad} />
      </div>
      <div className='minYear'>
        <div className="searchLabel">Min Year</div>
        <DropDown options={yearOptions} value={minYear} onChange={handleMinYear} />
      </div>
      <div className='maxYear'>
        <div className="searchLabel">Max Year</div>
        <DropDown options={yearOptions} value={maxYear} onChange={handleMaxYear} />
      </div>
      <div className='apply'>
        <div>&nbsp;</div>
        <button className='button' onClick={handleApple}>Apply</button>
      </div>
    </div>
  )
}
