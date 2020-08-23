import React, {Component} from 'react';
import momentTimeZone from 'moment-timezone/builds/moment-timezone-with-data';
import './user_model.css';
import { Calendar,  momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);


class UserModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendarView: false,
        }
    }
    toggleCalenderView = (toggle) => {
        this.setState({
            showCalendarView: toggle,
        });
    }

    componentDidMount() {
    }

    render () {
        const { userData, toggleModal } = this.props;
        const { todayActive } = userData; 
        return (
            <div>
                <div className = 'modal-cont'>
                    <div className='modal'>
                            <div className = 'd-flex justify-content-end'>
                                <button type="button" className="close" aria-label="Close" onClick = { () => toggleModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        {
                        this.state.showCalendarView ? 
                            <Calendar
                                events={userData.events}
                                startAccessor="start"
                                endAccessor="end"
                                defaultDate={moment().toDate()}
                                defaultView="month"
                                localizer={localizer}
                                style={{ height: 500,width: '100%' }}
                            /> : 
                        <div>
                            <div className='card d-flex justify-content-center'>
                            <div className='card-header'>
                                <h1 className='display-2 cardheading'>Today Activity Periods</h1>
                                <h3>User Id: {userData.id}</h3>
                            </div>
                            <div className='card-body'>
                                <h4 className='card-title'>Active Period:</h4>
                                {
                                    todayActive && todayActive.length ? 
                                        todayActive.map((time, start_time) => { 
                                            return (
                                                <div key={time.start_time}>
                                                    <strong>Start Time:</strong>
                                                      {momentTimeZone.tz((time.start_time), 'MMM Do YYYY hA', userData.tz).format()}, 
                                                    <strong>End Time:</strong>
                                                      {momentTimeZone.tz((time.end_time), 'MMM Do YYYY hA', userData.tz).format()}
                                                </div>
                                            );
                                        }) : 
                                        <h2>OPPS! No Activity For Today</h2>
                                }
                            </div>
                            <div>
                                  <button className='btn' onClick = { () => this.toggleCalenderView(true)}>See More Activity</button>
                            </div>
                    </div>  
                        </div>
                    }</div>
                </div>
            </div>
        );
    }
}

export default UserModel;