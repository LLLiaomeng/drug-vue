const steps = [
  {
    element: '#Check',
    popover: {
      title: '审查',
      description: '输入患者信息、处方信息进行审查',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#Manage',
    popover: {
      title: '信息管理',
      description: '可对患者和处方信息进行删改查',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#AddPatient',
    popover: {
      title: '添加患者',
      description: '先添加患者信息，需保存',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#AddPrescription',
    popover: {
      title: '添加处方',
      description: '再选择患者，输入处方信息，可保存或审查',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#Results',
    popover: {
      title: '审查结果',
      description: '此页面显示审查结果',
      position: 'right'
    },
    padding: 0
  },

  {
    element: '#PatientManage',
    popover: {
      title: '患者信息',
      description: '可对患者信息进行删改查',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#PrescriptionManage',
    popover: {
      title: '处方信息',
      description: '可对处方信息进行删改查，可进行审查',
      position: 'right'
    },
    padding: 0
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '标签栏',
      description: '你所访问过的历史页面',
      position: 'bottom'
    },
    padding: 0
  },
]

export default steps
