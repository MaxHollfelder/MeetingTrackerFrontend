import Axios from 'axios';
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Input, Button, Table, Popconfirm } from 'antd'
import './style.css'

class Schedule extends React.Component {
	state = {
		user: '',
		id: '',
		type: 'add',
		info: {
			candidateName: '',
			participants: '',
			startTime: '',
			endTime: '',
			location: '',
			meetingID: '',
		},
		list: [],
		isEdit: false,
		text: 'Finish Adding',
	}

	columns = [
		{
			title: 'Candidate Name',
			dataIndex: 'candidateName',
			key: 'candidateName',
		},
		{
			title: 'Participants',
			dataIndex: 'participants',
			key: 'participants',
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
		{	title: 'meetingID', 
			dataIndex: 'meetingID', 
			key: 'meetingID',
		},	
		{
			title: 'Option',
			dataIndex: 'option',
			key: '123',
			render: (text, record) => {
				return (
					<span>
						<Button
							type="link"
							onClick={() => {
								this.setState({
									text: 'Finish Editting',
									info: { ...record },
									isEdit: true,
								})
							}}
						>
							Edit
						</Button>
						<Popconfirm
							title="Are you sure delete this schedule?"
							onConfirm={() => this.onConfirm(record)}
							// onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<a href="#">Delete</a>
						</Popconfirm>
					</span>
				)
			},
		},
	]

	onConfirm = (data) => {
		const { index } = data
		const { list } = this.state
		const newList = list.slice(0)
		newList.splice(index, 1)
		this.setState({ list: newList })
	}

	componentDidMount() {
		 //const { name } = this.props.match.params
		 //this.setState({ user: name })
		const search = this.props.location.search
		const type = search.includes('type')
			? search.split('name=')[1].split('&')[0]
			: ''
        const name = search.includes('name')
            ? search.split('name=')[1].split('&')[0]
            : ''
		const id = search.split('id=')[1]
		if (type) {
			const data = window.sessionStorage.getItem(id)
			this.setState({
				user: name,
				id,
				type,
				list: data ? JSON.parse(data) : [],
			})
		} else {
			this.setState({ user: name, id })
		}
	}

	onChange = (e, type) => {
		const { value } = e.target
		const { info } = this.state
		switch (type) {
			case 'candidateName':
				this.setState({
					info: {
						...info,
						candidateName: value,
					},
				})		
				break
			case 'participants':
				this.setState({
					info: {
						...info,
						participants: value,
					},
				})
				break
			case 'startTime':
				this.setState({
					info: {
						...info,
						startTime: value,
					},
				})
				break
			case 'endTime':
				this.setState({
					info: {
						...info,
						endTime: value,
					},
				})
				break
			case 'location':
				this.setState({
					info: {
						...info,
						location: value,
					},
				})
				break
			case 'meetingID':
				this.setState({
					info: {
						...info,
						meetingID: value,
					},
				})		
				break
			default:
				break
		}
	}

	onAdd = () => {
		
		const { info, user, list, isEdit } = this.state
		if (isEdit) {
			const { index } = info
			const newList = list.slice(0)
			newList.splice(index, 1, info)
			this.setState({
				isEdit: false,
				text: 'Finish Adding',
				info: {
					candidateName: '',
					participants: '',
					startTime: '',
					endTime: '',
					location: '',
					meetingID: '',
				},
				list: newList,
			})
			return
		}
		const len = list.length
		info.index = len
		const newArr = list.concat([{ ...info, candidateName: user }])
		this.setState({
			list: newArr,
			info: {
				candidateName: '',
				participants: '',
				startTime: '',
				endTime: '',
				location: '',
				meetingID: '',
			},
		})
		console.log(info.candidateName); 
		console.log(info.participants); 
		console.log(info.startTime); 
		console.log(info.endTime); 
		console.log(info.location); 
		console.log(info.meetingID); 
		Axios.post('http://localhost:8080/Schedule', null, {params: {
		addCandidateName: info.candidateName,
        addParticipants: info.participants,
		addStartTime: info.startTime, 
		addEndTime: info.endTime, 
		addLocation: info.location,
		addMeetingID: info.meetingID,
      }})
      .then(function (repsonse){
        console.log(repsonse);
      //   if(response = "super_admin"){
      //     onNavCenter = () => {
      //       this.props.history.push('/schedule')
      //     }
      //   }
      })
	}

	onNav = () => {
		const { list, id } = this.state
		window.sessionStorage.setItem(id, JSON.stringify(list))
		this.props.history.push('/')
	}

	render() {
		const { info, list, text } = this.state
		return (
			<div>
				<Row>
					<Col span={10}>
						<div className="form">
							<h3>A meeting box</h3>
							<p>
								<Input
									addonBefore="Candidate Name"
									defaultValue={info.candidateName}
									value={info.candidateName}
									onChange={(e) => this.onChange(e, 'candidateName')}
								/>
							</p>
							<p>
								<Input
									addonBefore="Participants"
									defaultValue={info.participants}
									value={info.participants}
									onChange={(e) => this.onChange(e, 'participants')}
								/>
							</p>
							<p>
								<Input
									addonBefore="Start time"
									defaultValue={info.startTime}
									value={info.startTime}
									onChange={(e) => this.onChange(e, 'startTime')}
								/>
							</p>
							<p>
								<Input
									addonBefore="End time"
									defaultValue={info.endTime}
									value={info.endTime}
									onChange={(e) => this.onChange(e, 'endTime')}
								/>
							</p>
							<p>
								<Input
									addonBefore="Location"
									defaultValue={info.location}
									value={info.location}
									onChange={(e) => this.onChange(e, 'location')}
								/>
							</p>
							<p>
								<Input
									addonBefore="meetingID"
									defaultValue={info.meetingID}
									value={info.meetingID}
									onChange={(e) => this.onChange(e, 'meetingID')}
								/>
							</p>
							<p>
								<Button type="primary" onClick={this.onAdd}>
									{text}
								</Button>
							</p>
						</div>
					</Col>
					<Col span={14}>
						<div className="table">
							<p>
								<Button type="primary" onClick={this.onNav}>
									Adding done
								</Button>
							</p>
							<Table
								pagination={false}
								locale={{ emptyText: 'No Data' }}
								dataSource={list}
								columns={this.columns}
							/>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default withRouter(Schedule)
