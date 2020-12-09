import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import Axios from 'axios';


const PositionModel = (props) => {
  const [positionName, setPositionName] = useState('')
  const [positionId, setPositionId] = useState('')
  const [department, setDepartment] = useState('')

  return (
    <Modal
      title="Position Information"
      visible={props.visible}
      onOk={() => {
        const data = {
          positionName,
          positionId,
          department,
        }
        props.onOK('position', data)
        console.log(positionName)
        console.log(positionId)
        console.log(department)
        Axios.post('http://localhost:8080/AddPosition', null, {params: {
          addPositionName: positionName,
          addPositionId: positionId,
          addDepartment: department,
      }})
      .then(function (repsonse){
        console.log(repsonse.data);
      })
      }}
      onCancel={() => props.onCancel('position')}
    >
      <p>
        <Input
          addonBefore="Position Name"
          defaultValue={positionName}
          onChange={(e) => setPositionName(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Position ID"
          defaultValue={positionId}
          onChange={(e) => setPositionId(e.target.value)}
        />
      </p>
      <p>
        <Input
          addonBefore="Department"
          defaultValue={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </p>
    </Modal>
  )
}

export default PositionModel
