import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button } from 'antd'
import './style.css'

// export default function LoginPage(props){
//   const dispatch = useDispatch();
//   let [email, setEmail] = useState("");
//   let [password, setPassword] = useState("");
//   let errorMessage = useSelector(state => state.errorMessage);

//   function login(){
//     console.log(email); 
//     console.log(password);     
//     Axios.post('http://localhost:8080/', null, {params: {
//       useremail: email,
//       userpassword: password
//     }})
//     .then(function (repsonse){
//       console.log(repsonse);
//     //   if(response = "super_admin"){
//     //     onNavCenter = () => {
//     //       this.props.history.push('/schedule')
//     //     }
//     //   }
//     })
//   }

class Candidate extends React.Component {
  state = {
    data: [],
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
    {
      title: 'Position Id',
      dataIndex: 'positionId',
      key: 'positionId',
    },
    {
      title: 'Position Name',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
  ]

  componentDidMount() {
    // const sPosition = window.sessionStorage.getItem('position')
    // const sUser = window.sessionStorage.getItem('users')
    // if (sPosition && sUser) {
    //   const position = JSON.parse(sPosition)
    //   const user = JSON.parse(sUser)
    //   let arr = []
    //   position.forEach((item) => {
    //     if (user[item.index] && user[item.index].length) {
    //       user[item.index].forEach((el) => {
    //         const sDetail = window.sessionStorage.getItem(
    //           `${item.index}-${el.index}`
    //         )
    //         if (sDetail) {
    //           const detail = JSON.parse(sDetail)
    //           detail.forEach((e) => {
    //             e.positionName = item.positionName
    //             e.positionId = item.positionId
    //             e.department = item.department
    //           })
    //           arr = arr.concat(detail)
    //         }
    //       })
    //     }
    //   })
    //   this.setState({ data: arr })
    // }
  }

  onNavCenter = () => {
    this.props.history.push('/')
  }

  render() {
    const { data } = this.state
    return (
      <div className="candidate-page">
        <h1>Welcome</h1>
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
