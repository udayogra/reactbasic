

class AddSessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showAdvancedSettings: false };

  }
  addSession() {
    let sessions = this.props.sessions;
    sessions.push({ id: this.props.sessions.length + 1, speaker: this.refs.speaker.value, topic: this.refs.topic.value, time: this.refs.time.value });
    this.props.sessionsChangedEvent(sessions);
  }
  deleteMultiSessions() {
    let sessions = this.props.sessions;
   
    var filtered = sessions.filter(function (session, index, arr) {
      return !session.isChecked;

    });

    this.props.sessionsChangedEvent(filtered);

  }

  toggleAdvancedSettings() {
    this.setState({ showAdvancedSettings: !this.state.showAdvancedSettings });
  }
  render() {

    return <div>
      <div className='offset-top-1'>
        <button className="btn btn-danger" onClick={(e) => this.deleteMultiSessions()}>Delete Selected Sessions</button>

        <button className="btn btn-secondary"
          onClick={(e) => this.toggleAdvancedSettings()}>Show/Hide Advanced Settings</button>

      </div>
      {this.state.showAdvancedSettings &&
        <div>
          <h1>Add new Session</h1>
          <form >
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Enter Speaker's Name</label>
              <div className="col-sm-8">
                <input className="form-control" ref='speaker' />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Enter Topic</label>
              <div className="col-sm-8">
                <textarea ref='topic' className="form-control" ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Enter Time</label>
              <div className="col-sm-3">
                <input ref='time' className="form-control" />
              </div>
            </div>
            <button type="button" className="btn btn-secondary" onClick={(e) => this.addSession()}>Add Session</button>
          </form></div>}
    </div>
  }
}

class Rating extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  rateSession(id) {
    //this.ratingsMap[id] = this.refs.ratingVal.value;
    console.log(this.refs.ratingVal.value);
    this.setState({ rating: this.refs.ratingVal.value }, function(){
      console.log(this.state.rating);
    });
 
  }

  render() {
    const ratings = [{ value: 1, text: '1 star' }, { value: 2, text: '2 star' }, { value: 3, text: '3 star' }, { value: 4, text: '4 star' }, { value: 5, text: '5 star' }];
    const html = <div><select className='dropDown' ref='ratingVal'>
      {ratings.map((rating, index) => {
        return <option className='col-md-3 offset-top-1' key={index} value={rating.value}>
          {rating.text}
        </option>
      })}
    </select>

      <button className="btn btn-secondary" value='Rate'
        onClick={(e) => this.rateSession(this.props.sessionid)}>Rate</button>

      {this.state.rating  &&
        <div className='rateMsg' >You rated <b>{this.state.rating}</b> stars</div>}

      {!this.state.rating  &&
        <div className='rateMsgNot' >You have not rated yet</div>}

    </div>
    return html;
  }
}

class Speaker extends React.Component {

  render() {
    return <div><img className='speakerImg' src={this.props.img} heigth='100' width='100'></img>
      <div className='speakerName'>{this.props.name}</div>
      <div className='topic'>{this.props.topic}</div><br></br>
      <div className='time'><i>@{this.props.time}</i></div><br></br>
    </div>
  }
}

class Session extends React.Component {

  constructor(props) {
    super(props);
  }

  deleteSession(id) {
    this.props.deleteSession(id);
  }

  checkSession(event) {

    this.props.checkSession(event)
  }



  render() {
    let session = this.props.session
    return <div className='portrait'>
      <input type="checkbox" id={session.id} value={session.isChecked} onClick={this.checkSession.bind(this)} />
      <Speaker img={session.img} name={session.speaker} topic={session.topic} time={session.time} />
      <Rating sessionid={session.id} />
      <button className="btn btn-danger" onClick={(e) => this.deleteSession(session.id)}>Delete</button>
    </div>
  }

}

class SessionsList extends React.Component {


  checkSession = (event) => {
    let sessions = this.props.sessions
    sessions.forEach(session => {
      //console.log(event.target.id);
      if (session.id == event.target.id) {
        //console.log(event.target.checked);
        session.isChecked = event.target.checked;
      }
    })
    this.props.sessionsChangedEvent(sessions)

  }

  deleteSession(id) {
    var filtered = this.props.sessions.filter(function (value, index, arr) {

      return value.id != id;

    });

    this.props.sessionsChangedEvent(filtered);

  }


  render() {
    return <div>
      {this.props.sessions.map((session, index) => {
        let className = 'even';
        if (index % 2 == 1)
          className = 'odd';
        className = 'col-md-3 offset-top-1 ' + className
        return <div className={className} key={index}>
          <Session session={session} sessions={this.props.sessions} checkSession={this.checkSession.bind(this)} deleteSession={this.deleteSession.bind(this)}></Session>
        </div>
      })}
    </div>
  }
}

class SessionsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [
        { id: 100, speaker: 'Uday Ogra', time: '10:00 AM', isChecked: false, topic: 'Integrating modern day Javascript framewroks with ColdFusion', img: 'https://pbs.twimg.com/profile_images/1518734182/uday2_400x400.jpg' },
        {
          id: 101, speaker: 'Suchika Singh', time: '11:00 AM', isChecked: false, topic: 'All about scheduled tasks and using them in ColdFusion', img: 'https://www.adobe.com/content/dam/acom/en/devnet/authors/bio/s/Suchika_Singh.jpg'
        }, {
          id: 102, speaker: 'Pavan Kumar', time: '01:00 PM', isChecked: false, topic: 'Securing your CF applications and using security analyzer tool', img: 'https://www.adobe.com/content/dam/acom/en/devnet/authors/bio/i/Immanuel_noel.jpg'
        }, {
          id: 103, speaker: 'Raj Pandian', time: '01:00 PM', isChecked: false, topic: 'Securing your CF applications and using security analyzer tool', img: 'https://www.adobe.com/content/dam/acom/en/devnet/authors/bio/i/Immanuel_noel.jpg'
        }]
    };

  }

  sessionsChangedEvent(sessions) {
    this.setState({
      sessions: sessions
    }, function () { })

  }

  render() {

    return <div id='app' className='container' >
      <div className='row'>
        <h1>CF Summit Speakers</h1>
        <SessionsList sessions={this.state.sessions} sessionsChangedEvent={this.sessionsChangedEvent.bind(this)} />
      </div>
      <AddSessionForm sessions={this.state.sessions} sessionsChangedEvent={this.sessionsChangedEvent.bind(this)} />

    </div>
  }
}

// ========================================

ReactDOM.render(
  <SessionsWrapper />,
  document.getElementById('root')
);
