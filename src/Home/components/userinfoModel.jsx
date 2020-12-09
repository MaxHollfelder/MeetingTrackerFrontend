import React, { useState } from 'react'
import { Modal, Input, Upload, Button } from 'antd'
import Axios from 'axios';


const UserInfoModel = (props) => {
  const { type, data } = props
  const [candidateName, setCandidateName] = useState(
    type ? data.candidateName : ''
  )
  const [candidateEmail, setCandidateEmail] = useState(
    type ? data.candidateEmail : ''
  )
  const [candidatePhone, setCandidatePhone] = useState(
    type ? data.candidatePhone : ''
  )
  const [CandidateID, setCandidateID] = useState(
    type ? data.CandidateID : ''
  )
  const [candidatePass, setCandidatePass] = useState(
    type ? data.candidatePass : ''
  )
  const [fileList, setFileList] = useState([])
  const [fileNameList, setFileNameList] = useState(type ? data.fileList : [])

  const fileProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      const newFileName = fileNameList.slice()
      newFileList.splice(index, 1)
      newFileName.splice(index, 1)
      setFileList(newFileList)
      setFileNameList(newFileName)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      setFileNameList([...fileNameList, { fileName: file.name }])
      return false
    },
    fileList,
  }
  return (
    <Modal
      title="Candidate Information"
      visible={props.visible}
      onOk={() => {
        const data = {
          candidateName,
          candidateEmail,
          candidatePhone,
          fileList: fileNameList,
        }
        props.onOK(data)
        console.log(candidateName)
        console.log(candidateEmail)
        console.log(candidatePhone)
        Axios.post('http://localhost:8080/addCandidate', null, {params: {
          addCandidateName: candidateName,
          addCandidateEmail: candidateEmail,
          addCandidatePhone: candidatePhone,
          addCandidateID: CandidateID,
          addCandidatePass: candidatePass
      }})
      .then(function (repsonse){
        console.log(repsonse.data);
      })
      }}
      onCancel={() => props.onCancel()}
    >
      <p>
        <Input
          addonBefore="Candidate Name"
          defaultValue={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Candidate ID"
          defaultValue={CandidateID}
          onChange={(e) => setCandidateID(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Candidate Password"
          defaultValue={candidatePass}
          onChange={(e) => setCandidatePass(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Candidate Email"
          defaultValue={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Candidate Phone"
          defaultValue={candidatePhone}
          onChange={(e) => setCandidatePhone(e.target.value)}
        />
      </p>
      <div>
        <Upload {...fileProps}>
          <Button>Select File</Button>
        </Upload>
        {/* <Input
          addonBefore="Upload Docs"
          defaultValue={fileList}
          onChange={(e) => setFileList(e.target.value)}
        /> */}
      </div>
    </Modal>
  )
}

export default UserInfoModel
