import MissionItem from './MissionItem';
import './Mission.scss';

export default function MissionList({launchs, launchPads}) {
  const missionCount = launchs.length;

  //console.log(launchs);
  const displayMissionItems = launchs.map((launch, index)=>{
    let comp;
    if (index < missionCount - 1){
      comp = (<>
        <MissionItem 
          key={launch.flight_number} 
          mission={launch} 
          launchPads={launchPads}
        />
        <div className='mi-spacer'/>
      </>)
    }else{
      comp = (<>
        <MissionItem 
          key={launch.flight_number} 
          mission={launch}
          launchPads={launchPads}
        />
      </>)
    }
    return comp;
  })
  
  return(
    <div className="missionlist-container" id='missionlist-container'>
      <div className='mi-count'>Showing {missionCount} Missions</div>
      {displayMissionItems}
      {/* <MissionItem mission={sampleMission} launchPads={launchPads}/> */}
      {/* <MissionItem/>
      <div className='mi-spacer'/>
      <MissionItem/>
      <div className='mi-spacer'/>
      <MissionItem/>
      <div className='mi-spacer'/>
      <MissionItem/>
      <div className='mi-spacer'/>
      <MissionItem/>
      <div className='mi-spacer'/>
      <MissionItem/> */}
    </div>
  )
}