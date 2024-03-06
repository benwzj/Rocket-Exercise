import './Mission.scss'

export default function MissionItem({mission, launchPads}){
  const imgAlt = mission.rocket.rocket_name + ' Logo';
  const success = (mission.launch_success && mission.land_success) ? '' : (<i>Failed Mission</i>);
  const payload_ids = mission.payloads.reduce((a,c)=> a? a+' - '+c.payload_id : c.payload_id, '');
  const title = mission.rocket.rocket_name + ' - ' + payload_ids + (success ? ' - ':'');
  const date = new Date (mission.launch_date_local);
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  const launchedDate = (<b>{date.toLocaleDateString(undefined, options)}</b>);
  const launchedTime = (<b>{date.toLocaleTimeString()}</b>);
  let launchPadName = '';
  for (let pad of launchPads){
    if (pad.id === mission.launch_site.site_id){
      launchPadName = (<b>{pad.full_name}</b>);
      break;
    }
  }
  const links = [];
  if (mission.links.reddit_campaign != null) {
    links.push(<a href={mission.links.reddit_campaign}><div className="mi-button">Reddit Campaign</div></a>)
  }
  if (mission.links.reddit_launch != null) {
    links.push(<a href={mission.links.reddit_launch}><div className="mi-button">Reddit Launch</div></a>)
  }
  if (mission.links.reddit_recovery != null) {
    links.push(<a href={mission.links.reddit_recovery}><div className="mi-button">Reddit Recovery</div></a>)
  }
  if (mission.links.reddit_media != null) {
    links.push(<a href={mission.links.reddit_media}><div className="mi-button">Reddit Media</div></a>)
  }
  if (mission.links.presskit != null) {
    links.push(<a href={mission.links.presskit}><div className="mi-button">Rress Kit</div></a>)
  }
  if (mission.links.article_link != null) {
    links.push(<a href={mission.links.article_link}><div className="mi-button">Article</div></a>)
  }
  if (mission.links.video_link != null) {
    links.push(<a href={mission.links.video_link}><div className="mi-button">Watch Video</div></a>)
  }
  const flightNumber = '#' + mission.flight_number;
  return (
    <div className='missionitem-container'>
      <div className='missionitem-icon'>
        <img alt={imgAlt} src={mission.links.mission_patch}/>
      </div>
      <div className="missionitem-info">
        <div className="mi-title">{title} {success}</div>
        <div className="mi-subtitle">Launched on {launchedDate} at {launchedTime} from {launchPadName}</div>
        <div className="mi-links">
          {links}
        </div>
      </div>
      <div className="missionitem-id">
        {flightNumber}
      </div>
      {/* Launched on [DATE] at [TIME] from [LAUNCH PAD FULL NAME]
      <div className='missionitem-icon'>
        <img alt="Falcon 9 Logo" src="https://spacexpatchlist.space/thumbs/repro_4everworld_f1_001_spacex_first_flight.png"/>
      </div>
      <div className="missionitem-info">
        <div className="mi-title">Falcon 9 - EchoStar 105</div>
        <div className="mi-subtitle">2017-10-11T18:53:00-04:00 at Kennedy Space Center Launch Complex 39A</div>
        <div className="mi-links">
          <div className="mi-button">reddit_campaign</div>
          <div className="mi-button">reddit_launch</div>
          <div className="mi-button">reddit_media</div>
          <div className="mi-button">presskit</div>
          <div className="mi-button">video_link</div>
        </div>
      </div>
      <div className="missionitem-id">
        #49
      </div> */}
    </div>
  )
}