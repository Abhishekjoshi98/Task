import ChangesDropdown from './ChangesDropdown'
import ContributorChangesGraph from './ContributorChangesGraph'
import TotalChangesGraph from './TotalChangesGraph'
import { useParams } from 'react-router-dom'
function Details() {
 const {userName,repoName} = useParams();
 
  return (
    <>
    <ChangesDropdown/>
    <TotalChangesGraph user={userName} repo={repoName}/>
    <ContributorChangesGraph user={userName} repo={repoName}/>
    
    </>
  )
}

export default Details;