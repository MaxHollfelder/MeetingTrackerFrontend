import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button } from 'antd'
import './style.css'
import Axios from 'axios';

class Candidate extends React.Component {
	
	state = {
		info: {
			meetingID: '',
			MeetingType: '',
			MeetingDate:'',
			StartTime:'',
			EndTime: '',
			Location: '',
			feedback: '',
		},
		data: [],
	}

	columns = [
		{
			title: 'Meeting ID',
			dataIndex: 'Meeting ID',
			key: 'MeetingID',
		},
		{
			title: 'Meeting Type',
			dataIndex: 'Meeting Type',
			key: 'MeetingType',
		},
		{
			title: 'Meeting Date',
			dataIndex: 'Meeting Date',
			key: 'MeetingDate',
		},
		{
			title: 'Start Time',
			dataIndex: 'startTime',
			key: 'startTime',
		},
		{
			title: 'End Time',
			dataIndex: 'endTime',
			key: 'endTime',
		},
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location',
		},
		{
			title: 'feedback',
			dataIndex: 'feedback',
			key: 'feedback',
		},
	]

	componentDidMount() {
		const { info, user, list, isEdit } = this.state
			Axios.post('http://localhost:8080/participant', null, {params: {
		candidate_id: '9'
		}})
		.then((response) =>{
		console.log(response.data);
		var responseData = response.data;  
		console.log(responseData);
		info.meetingID = responseData[0]; 
		info.MeetingType = responseData[1]; 
		info.MeetingDate = responseData[2]; 
		info.StartTime = responseData[3]; 
		info.EndTime = responseData[4]; 
		info.Location = responseData[5]; 
		info.feedback = responseData[6]; 
		console.log(info.meetingID); 

		})
	}

	onNavCenter = () => {
		this.props.history.push('/')
	}

	render() {
		const { data } = this.state
		return (
			<div className="candidate-page">
				<p>
					<Button type="primary" onClick={this.onNavCenter}>
						Logout
					</Button>
				</p>
				<div>
					<Table pagination={false} dataSource={data} columns={this.columns} />
				</div>
			</div>
		)
	}
}

export default withRouter(Candidate)
