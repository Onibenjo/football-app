import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import { firebaseMatches } from '../../firebase';
import { firebaseArrayLoop, reverseArray } from '../UI/misc';

import LeagueTable from './table';
import MatchesList from './matchList';

const TheMatches = () => {
    const [loading, setLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [filterMatches, setFilterMatches] = useState([]);
    const [playedFilter, setPlayedFilter] = useState('All');
    const [resultFilter, setResultFilter] = useState('All');
    // const [state, setState] = useState({
    //     loading: true,
    //     matches:[],
    //     filterMatches:[],
    //     playedFilter:'All',
    //     resultFilter:'All'
    // })

    // const {loading,
    //     matches,
    //     filterMatches,
    //     playedFilter,
    //     resultFilter} = state;

    useEffect(()=>{
        firebaseMatches.once('value').then(snapshot=>{
            const matches = firebaseArrayLoop(snapshot);

            setLoading(false);
            setMatches(reverseArray(matches));
            setFilterMatches(reverseArray(matches));
            // setState({
            //     ...state,
            //     loading: false,
            //     matches: reverseArray(matches),
            //     filterMatches: reverseArray(matches)
            // });
            
        })
        return () => firebaseMatches.off()
    },[])

    const showPlayed = (played) => {
        const list = matches.filter((match)=>{
            return match.final === played
        });
        
        // setState({
        //     ...state,
        //     filterMatches: played === 'All' ? state.matches : list,
        //     playedFilter: played,
        //     resultFilter: 'All'
        // })
        
        setFilterMatches(played === 'All' ? matches : list);
        setPlayedFilter(played);
        setResultFilter('All');
    }

    const showResult = (result) => {
        const list = matches.filter((match)=>{
            return match.result === result
        });
        // setState({
        //     ...state,
        //     filterMatches: result === 'All' ? state.matches : list,
        //     playedFilter: 'All',
        //     resultFilter: result
        // })
        setFilterMatches(result === 'All' ? matches : list);
        setResultFilter(result);
        setPlayedFilter('All');
    }
    
    return (
        <div className="the_matches_container">
            {loading ? (
            <div className="admin_progress">
                <CircularProgress thickness={6} style={{ color: "#98c5e9" }} />
            </div>
            ):
            <Grid container spacing={8}>
                {/* <div className="the_matches_wrapper"> */}
                <Grid item xs={12} sm={12} lg={8} md={6}>
                    <div className="">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match
                                </div>
                                <div className="cont">
                                    <div className={`option ${playedFilter === 'All'?'active':''}`}
                                        onClick={()=> showPlayed('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${playedFilter === 'Yes'?'active':''}`}
                                        onClick={()=> showPlayed('Yes')}>
                                        Played
                                    </div>
                                    <div className={`option ${playedFilter === 'No'?'active':''}`}
                                        onClick={()=> showPlayed('No')}>
                                        Not played
                                    </div>
                                </div>
                            </div>
                            <div className="match_filters_box">
                                <div className="tag">
                                    Result game
                                </div>
                                <div className="cont">
                                    <div className={`option ${resultFilter === 'All'?'active':''}`}
                                        onClick={()=> showResult('All')}
                                    >
                                        All
                                    </div>
                                    <div className={`option ${resultFilter === 'W'?'active':''}`}
                                        onClick={()=> showResult('W')}>
                                        W
                                    </div>
                                    <div className={`option ${resultFilter === 'L'?'active':''}`}
                                        onClick={()=> showResult('L')}>
                                        L
                                    </div>
                                    <div className={`option ${resultFilter === 'D'?'active':''}`}
                                        onClick={()=> showResult('D')}>
                                        D
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                            <MatchesList matches={filterMatches}/>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={4} md={6}>
                        <div className="">
                        <LeagueTable/>
                    </div>
                </Grid>
                {/* </div> */}
            </Grid>
            }
        </div>
        );
}

export default TheMatches;